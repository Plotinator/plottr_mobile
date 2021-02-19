import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import t from 'format-message'
import { Container, Content, Form, Label, View } from 'native-base'
import { actions, selectors, initialState } from 'pltr/v2'
import { StyleSheet, Platform } from 'react-native'
import SaveButton from '../../ui/SaveButton'
import AttachmentList from '../../shared/attachments/AttachmentList'
import RichTextEditor from '../../shared/RichTextEditor'
import DetailsScrollView from '../shared/DetailsScrollView'
import {
  checkForChanges,
  addLeaveListener,
  removeLeaveListener
} from '../../../utils/Changes'
import { Input } from '../../shared/common'
import Metrics from '../../../utils/Metrics'

class PlaceDetails extends Component {
  state = {}
  static getDerivedStateFromProps (props, state) {
    const { route, customAttributes, places } = props
    const { isNewPlace, place } = route.params
    let placeObj =
      state.place ||
      (isNewPlace
        ? cloneDeep(initialState.place)
        : places.find((pl) => pl.id == place.id))
    let customAttrs =
      state.customAttrs ||
      customAttributes.reduce((acc, attr) => {
        acc[attr.name] = placeObj[attr.name]
        return acc
      }, {})
    return {
      isNewPlace: state.isNewPlace || isNewPlace,
      place: placeObj,
      customAttrs: customAttrs,
      changes: state.changes || isNewPlace
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    addLeaveListener(navigation, this.checkChanges)
    this.setSaveButton()
  }

  componentDidUpdate () {
    this.setSaveButton()
  }

  componentWillUnmount () {
    const { navigation } = this.props
    removeLeaveListener(navigation, this.checkChanges)
  }

  checkChanges = (event) => {
    const { changes } = this.state
    const { navigation } = this.props
    checkForChanges(event, changes, this.saveChanges, navigation)
  }

  setSaveButton = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <SaveButton changes={this.state.changes} onPress={this.saveChanges} />
      )
    })
  }

  saveChanges = () => {
    const { changes, isNewPlace, place, customAttrs } = this.state
    if (!changes) return
    const values = {
      name: place.name,
      description: place.description,
      notes: place.notes,
      ...customAttrs
    }
    if (isNewPlace) {
      this.props.actions.addPlaceWithValues(values)
      this.props.navigation.setParams({ isNewPlace: false })
    } else {
      this.props.actions.editPlace(place.id, values)
    }
    this.setState({ isNewPlace: false, changes: false })
  }

  handleNotesText = notes =>
    this.setState({ place: { ...this.state.place, notes }, changes: true })

  renderAttachments () {
    const { place, isNewPlace } = this.state
    if (isNewPlace) return null

    return (
      <AttachmentList
        itemType='place'
        item={place}
        navigate={this.props.navigation.navigate}
        only={['bookIds', 'tags']}
      />
    )
  }

  renderCustomAttributes () {
    const { customAttributes } = this.props
    const { customAttrs } = this.state
    return customAttributes.map((attr, idx) => {
      const { name, type } = attr
      if (type == 'paragraph') {
        return (
          <View key={idx} style={[styles.afterList, styles.rceView]}>
            <Label>{name}</Label>
            <RichTextEditor
              initialValue={customAttrs[name]}
              onChange={(val) =>
                this.setState({
                  customAttrs: { ...customAttrs, [name]: val },
                  changes: true
                })
              }
            />
          </View>
        )
      } else {
        return (
          <View key={idx} style={styles.label}>
            <Input
              inset
              label={name}
              value={customAttrs[name]}
              onChangeText={(text) =>
                this.setState({
                  customAttrs: { ...customAttrs, [name]: text },
                  changes: true
                })
              }
              autoCapitalize='sentences'
            />
        </View>
        )
      }
    })
  }

  render () {
    const { place } = this.state
    return (
      <DetailsScrollView>
        <View style={styles.label}>
          <Input
            inset
            label={t('Name') + ':'}
            value={place.name}
            onChangeText={(text) =>
              this.setState({ place: { ...place, name: text }, changes: true })
            }
            autoCapitalize='words'
          />
        </View>
        <View inlineLabel last regular style={styles.label}>
          <Input
            inset
            label={t('Description') + ':'}
            value={place.description}
            onChangeText={(text) =>
              this.setState({
                place: { ...place, description: text },
                changes: true
              })
            }
            autoCapitalize='sentences'
          />
        </View>
        {this.renderAttachments()}
        <View style={[styles.afterList, styles.rceView]}>
          <Label>{t('Notes')}</Label>
          <RichTextEditor
            initialValue={place.notes}
            onChange={this.handleNotesText}
          />
        </View>
        {this.renderCustomAttributes()}
      </DetailsScrollView>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 16
  },
  afterList: {
    marginTop: 16
  },
  badge: {
    marginRight: Metrics.baseMargin
  },
  rceView: {
    marginBottom: 16
  }
})

PlaceDetails.propTypes = {
  note: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  startEditing: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
  characters: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  customAttributes: PropTypes.array.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    tags: selectors.sortedTagsSelector(state),
    characters: selectors.charactersSortedAtoZSelector(state),
    places: selectors.placesSortedAtoZSelector(state),
    customAttributes: state.customAttributes.places,
    ui: state.ui
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.place, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails)
