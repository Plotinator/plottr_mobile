import { sortBy } from 'lodash'
import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectors, actions } from 'pltr/v2'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Place from './Place'
import styles from './PlacesStyles'
import Toolbar from '../../shared/Toolbar'
import {
  Text,
  BackButton,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import { t } from 'plottr_locales'

class PlaceDetails extends Component {
  savePlace = (id, attributes) => {
    this.props.actions.editPlace(id, attributes)
  }

  render() {
    const { navigation, route, selectedPlace, openDrawer } = this.props
    const place = selectedPlace || (route && route.params.place)
    if (!place) return null
    const { images = [], customAttributes } = this.props
    const image = images[place.imageId]

    return (
      <SafeAreaView style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
            <Toolbar onPressDrawer={openDrawer}>
              <BackButton onPress={navigation.goBack} />
              <View style={styles.additionals}>
                <HeaderButtonOptions
                  title={t('Attributes')}
                  button={<AttributesButton />}>
                  <HeaderAttributes type={'places'} />
                </HeaderButtonOptions>
              </View>
            </Toolbar>
            <Place
              key={place.id}
              place={{ ...place, image }}
              onSave={this.savePlace}
              navigation={navigation}
              customAttributes={customAttributes}
            />
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    )
  }
}

PlaceDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  ui: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images,
    characters: state.characters,
    places: state.places,
    tags: state.tags,
    customAttributes: state.customAttributes.places
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.place, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails)
