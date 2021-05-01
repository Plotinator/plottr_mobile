import { sortBy } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { t } from 'plottr_locales'
import cx from 'classnames'
import { selectors, actions, newIds } from 'pltr/v2'
import { View, H3, Button, H1, Icon, Content } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Toolbar from '../shared/Toolbar'
import Place from './Place'
import NewButton from '../../ui/NewButton'
import { askToDelete } from '../../../utils/delete'
import DrawerButton from '../../ui/DrawerButton'
import SideButton from '../shared/SideButton'
import { Text, MainList, AttributesButton } from '../../shared/common'
import styles from './PlacesStyles'

class Places extends Component {
  state = {
    activePlaceId: null
  }

  static getDerivedStateFromProps (props, state) {
    const activePlaceId = Places.findActivePlace(
      props.visiblePlaces,
      state.activePlaceId
    )
    return { activePlaceId }
  }

  static findActivePlace (places, activePlaceId) {
    if (places.length == 0) return null

    let newId = places[0].id

    // check for the currently active one
    if (activePlaceId != null) {
      let existingPlace = places.find((pl) => pl.id === activePlaceId)
      if (existingPlace) newId = existingPlace.id
    }

    return newId
  }

  createNewPlace = () => {
    const id = newIds.nextId(this.props.places)
    this.props.actions.addPlace()
    this.setState({ activePlaceId: id })
  }

  savePlace = (id, attributes) => {
    this.props.actions.editPlace(id, attributes)
  }

  navigateToCustomAttributes = () => {
    this.props.navigation.navigate('CustomAttributesModal', {
      type: 'places'
    })
  }

  handleSelectPlace = ({ id }) => {
    this.setState({ activePlaceId: id })
  }

  handleAddPlace = () => {
    const id = newIds.nextId(this.props.places)
    this.props.actions.addPlace()
    this.setState({ activePlaceId: id })
  }

  handleDeletePlace = (place) => {
    askToDelete(place.name || t('New Place'), () =>
      this.props.actions.deletePlace(place.id)
    )
  }

  renderPlaceDetail () {
    const { visiblePlaces, customAttributes, navigation } = this.props
    let place = visiblePlaces.find((pl) => pl.id == this.state.activePlaceId)
    if (!place) return null
    const { images = [] } = this.props
    const image = images[place.imageId]

    return (
      <ErrorBoundary>
        <Place
          key={place.id}
          place={{ ...place, image }}
          customAttributes={customAttributes}
          onSave={this.savePlace}
          navigation={navigation}
        />
      </ErrorBoundary>
    )
  }

  render () {
    const { visiblePlaces, openDrawer } = this.props
    const { activePlaceId } = this.state

    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          <NewButton onPress={this.createNewPlace} />
          <View style={styles.additionals}>
            <AttributesButton onPress={this.navigateToCustomAttributes} />
          </View>
        </Toolbar>
        <Grid style={styles.grid}>
          <Col size={5}>
            <MainList
              list={visiblePlaces}
              title={t('Places')}
              type={t('Place')}
              activeKey='id'
              activeValue={activePlaceId}
              onPressItem={this.handleSelectPlace}
              onPressAdd={this.handleAddPlace}
              onPressDelete={this.handleDeletePlace}
            />
          </Col>
          <Col size={10}>{this.renderPlaceDetail()}</Col>
        </Grid>
      </View>
    )
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  visiblePlaces: PropTypes.array.isRequired,
  filterIsEmpty: PropTypes.bool.isRequired,
  customAttributes: PropTypes.array.isRequired,
  customAttributesThatCanChange: PropTypes.array,
  restrictedValues: PropTypes.array,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  customAttributeActions: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    images: state.images,
    places: state.places,
    visiblePlaces: selectors.visibleSortedPlacesSelector(state),
    filterIsEmpty: selectors.placeFilterIsEmptySelector(state),
    customAttributes: state.customAttributes.places,
    customAttributesThatCanChange: selectors.placeCustomAttributesThatCanChangeSelector(
      state
    ),
    restrictedValues: selectors.placeCustomAttributesRestrictedValues(state),
    ui: state.ui
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.place, dispatch),
    customAttributeActions: bindActionCreators(
      actions.customAttribute,
      dispatch
    ),
    uiActions: bindActionCreators(actions.ui, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Places)
