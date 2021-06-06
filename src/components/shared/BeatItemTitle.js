import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { helpers, selectors } from 'pltr/v2'

const BeatItemTitle = ({
  beatIndex,
  beatTree,
  beat,
  hierarchyLevels,
  positionOffset,
  hierarchyEnabled,
  isSeries,
}) =>
  helpers.beats.beatTitle(
    beatIndex,
    beatTree,
    beat,
    hierarchyLevels,
    positionOffset,
    hierarchyEnabled,
    isSeries
  )

BeatItemTitle.propTypes = {
  isSeries: PropTypes.bool.isRequired,
  positionOffset: PropTypes.number.isRequired,
  beatIndex: PropTypes.number.isRequired,
  beatTree: PropTypes.object.isRequired,
  beat: PropTypes.object.isRequired,
  hierarchyLevels: PropTypes.array.isRequired,
  hierarchyEnabled: PropTypes.bool,
}

export default connect((state, ownProps) => ({
  isSeries: selectors.isSeriesSelector(state),
  positionOffset: selectors.positionOffsetSelector(state),
  beatIndex: selectors.beatIndexSelector(state, ownProps.beat.id),
  beatTree: selectors.beatsByBookSelector(state),
  hierarchyLevels: selectors.sortedHierarchyLevels(state),
  hierarchyEnabled: selectors.beatHierarchyIsOn(state),
}))(BeatItemTitle)
