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
  render() {
    const { openDrawer, filters = {} } = this.props
    const filterCount = Object.values(filters || {}).map(
      (filter) => filter.length
    )
    const count = filterCount.length ? filterCount.reduce((a, b) => a + b) : 0
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          <SeriesPicker />
          <View style={styles.toolWrapper}>
            <HeaderButtonOptions
              title={t('Filter')}
              icon='filter'
              count={count}>
              <HeaderFilter filters={filters} type='cards' />
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
  navigation: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    lines: selectors.sortedLinesByBookSelector(state),
    card2Dmap: selectors.cardMapSelector(state),
    filters: state.ui.timelineFilter
  }
}

export default connect(mapStateToProps, null)(TimelineWrapper)
