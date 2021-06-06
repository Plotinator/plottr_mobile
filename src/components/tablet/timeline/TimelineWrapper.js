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
  state = {
    hasFilter: false
  }

  handleFilterTimeline = (filters) => {
    console.log('filters', filters)
    this.setState({
      hasFilter: Objects.keys(filters).length
    })
  }

  render() {
    const { hasFilter } = this.state
    const { openDrawer } = this.props
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          <SeriesPicker />
          <View style={styles.toolWrapper}>
            <HeaderButtonOptions
              title={t('Filter')}
              icon='filter'
              count={hasFilter}>
              <HeaderFilter type='cards' onFilter={this.handleFilterTimeline} />
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

function mapStateToProps(state) {
  return {
    lines: selectors.sortedLinesByBookSelector(state),
    card2Dmap: selectors.cardMapSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper)
