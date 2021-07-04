import { sortBy } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { t } from 'plottr_locales'
import cx from 'classnames'
import { selectors, actions, newIds } from 'pltr/v2'
import { Icon } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Toolbar from '../../shared/Toolbar'
import Place from './Place'
import NewButton from '../../ui/NewButton'
import { askToDelete } from '../../../utils/delete'
import DrawerButton from '../../ui/DrawerButton'
import {
  Text,
  MainList,
  AttributesButton,
  HeaderButtonOptions,
  HeaderAttributes,
  HeaderFilter
} from '../../shared/common'
import styles from './PlacesStyles'
import { Metrics } from '../../../utils'

const { IS_TABLET } = Metrics

class Places extends Component {
  state = {
    activePlaceId: null
  }

  static getDerivedStateFromProps(props, state) {
    const activePlaceId = IS_TABLET
      ? Places.findActivePlace(props.visiblePlaces, state.activePlaceId)
      : null
    return { activePlaceId }
  }

  static findActivePlace(places, activePlaceId) {
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

  handleSelectPlace = (place) => {
    if (IS_TABLET) this.setState({ activePlaceId: place.id })
    else this.props.navigation.navigate('PlaceDetails', { place })
  }

  handleAddPlace = () => {
    const { navigation, actions } = this.props

    const id = newIds.nextId(this.props.places)
    actions.addPlace()
    if (IS_TABLET) this.setState({ activePlaceId: id })
    else {
      setTimeout(() => {
        const place = this.props.places.find((place) => place.id == id)
        navigation.navigate('PlaceDetails', { place })
      }, 100)
    }
  }

  handleDeletePlace = (place) => {
    askToDelete(place.name || t('New Place'), () =>
      this.props.actions.deletePlace(place.id)
    )
  }

  renderPlaceDetail() {
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

  render() {
    const { visiblePlaces, openDrawer, filters } = this.props
    const { activePlaceId } = this.state
    const filterCount = Object.values(filters || {}).map(
      (filter) => filter.length
    )
    const count = filterCount.length ? filterCount.reduce((a, b) => a + b) : 0
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          {IS_TABLET && <NewButton onPress={this.createNewPlace} />}
          <View style={styles.additionals}>
            <View style={styles.additionals}>
              <HeaderButtonOptions
                title={t('Filter')}
                icon='filter'
                count={count}>
                <HeaderFilter filters={filters} type='places' />
              </HeaderButtonOptions>
              <HeaderButtonOptions
                title={t('Attributes')}
                button={<AttributesButton />}>
                <HeaderAttributes type={'places'} />
              </HeaderButtonOptions>
            </View>
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
              rightIcon={'trash'}
              onPressRight={!IS_TABLET && this.handleDeletePlace}
            />
          </Col>
          {IS_TABLET && <Col size={10}>{this.renderPlaceDetail()}</Col>}
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
  uiActions: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
}

function mapStateToProps(state) {
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
    ui: state.ui,
    filters: state.ui.placeFilter
  }
}

function mapDispatchToProps(dispatch) {
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
