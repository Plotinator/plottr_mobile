import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { t } from 'plottr_locales'
import { selectors } from 'pltr/v2'
import { View } from 'native-base'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Toolbar from '../shared/Toolbar'
import { HeaderButtonOptions, HeaderFilter } from '../../shared/common'
import SeriesPicker from '../shared/SeriesPicker'
import Timeline from './Timeline'

class TimelineWrapper extends Component {
  handleFilterTimeline = (filters) => {
    console.log('filters', filters)
  }
  render () {
    const { openDrawer } = this.props
    const { characters, places, tags } = this.props
    const filterCharacters = characters
      .filter(character => character.name)
      .map(character => ({ id: character.id, label: character.name }))
    const filterPlaces = places
      .filter(place => place.name)
      .map(place => ({ id: place.id, label: place.name }))
    const filterTags = tags
      .filter(tag => tag.title)
      .map(tag => ({ id: tag.id, label: tag.title }))
    const filterOptions = [
      {
        title: t('Characters'),
        data: filterCharacters
      },
      {
        title: t('Places'),
        data: filterPlaces
      },
      {
        title: t('Tags'),
        data: filterTags
      }
    ]
    console.log('characters', filterCharacters)
    console.log('places', filterPlaces)
    console.log('tags', filterTags)

    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          <SeriesPicker />
          <View style={styles.toolWrapper}>
            <HeaderButtonOptions
              title={t('Filter')}
              icon='filter'>
              <HeaderFilter
                options={filterOptions}
                onFilter={this.handleFilterTimeline}
              />
            </HeaderButtonOptions>
          </View>
        </Toolbar>
        <ErrorBoundary>
          <Timeline navigation={this.props.navigation} />
        </ErrorBoundary>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 20
  }
})

TimelineWrapper.propTypes = {
  lines: PropTypes.array.isRequired,
  card2Dmap: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    lines: selectors.sortedLinesByBookSelector(state),
    card2Dmap: selectors.cardMapSelector(state),
    characters: selectors.allCharactersSelector(state),
    places: selectors.placesSortedAtoZSelector(state),
    tags: selectors.sortedTagsSelector(state),

  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineWrapper)
