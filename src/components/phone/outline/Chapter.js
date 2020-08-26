import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sortBy } from 'lodash'
import i18n from 'format-message'
import cx from 'classnames'
import { selectors, actions, cardHelpers, listHelpers, chapterHelpers } from 'pltr/v2'
import { H3, Icon, Card, CardItem, View, Button, Text } from 'native-base'
import { SwipeRow } from 'react-native-swipe-list-view'
import SceneCard from './SceneCard'
import { StyleSheet } from 'react-native'

class Chapter extends Component {

  state = {sortedCards: []}

  static getDerivedStateFromProps (nextProps, nextState) {
    const { chapter, cards, lines, isSeries } = nextProps
    const sortedCards = cardHelpers.sortCardsInChapter(chapter.autoOutlineSort, cards, lines, isSeries)
    return {sortedCards}
  }

  navigateToNewCard = () => {
    this.props.navigation.push('SceneDetails', {isNewCard: true, chapterId: this.props.chapter.id})
  }

  autoSortChapter = () => {
    const { chapterActions, beatActions, chapter, isSeries } = this.props
    if (isSeries) {
      beatActions.autoSortBeat(chapter.id)
    } else {
      chapterActions.autoSortChapter(chapter.id)
    }
  }

  reorderCards = ({current, currentIndex, dropped}) => {
    const { sortedCards } = this.state
    const { isSeries, chapter, actions } = this.props
    const currentIds = sortedCards.map(c => c.id)
    const currentLineId = isSeries ? current.seriesLineId : current.lineId
    let newOrderInChapter = []
    let newOrderWithinLine = null

    // already in chapter
    if (currentIds.includes(dropped.cardId)) {
      // flip it to manual sort
      newOrderInChapter = listHelpers.moveToAbove(dropped.index, currentIndex, currentIds)
      if (dropped.lineId == currentLineId) {
        // if same line, also update positionWithinLine
        const cardIdsInLine = sortedCards.filter(c => isSeries ? c.seriesLineId == currentLineId : c.lineId == currentLineId).map(c => c.id)
        const currentPosition = sortedCards.find(c => c.id == dropped.cardId).positionWithinLine
        newOrderWithinLine = listHelpers.moveToAbove(currentPosition, current.positionWithinLine, cardIdsInLine)
      }
      actions.reorderCardsInChapter(chapter.id, currentLineId, isSeries, newOrderInChapter, newOrderWithinLine)
    } else {
      // dropped in from a different chapter
      if (dropped.lineId == currentLineId) {
        // if same line, can just update positionWithinLine
        let cardIdsWithinLine = sortedCards.filter(c => isSeries ? c.seriesLineId == currentLineId : c.lineId == currentLineId).map(c => c.id)
        cardIdsWithinLine.splice(current.positionWithinLine, 0, dropped.cardId)
        actions.reorderCardsWithinLine(chapter.id, currentLineId, isSeries, cardIdsWithinLine)
      } else {
        // flip to manual sort
        newOrderInChapter = currentIds
        newOrderInChapter.splice(currentIndex, 0, dropped.cardId)
        actions.reorderCardsInChapter(chapter.id, currentLineId, isSeries, newOrderInChapter, null, dropped.cardId)
      }
    }
  }

  renderManualSort () {
    if (this.props.chapter.autoOutlineSort) return null

    return <Text onClick={this.autoSortChapter}>{i18n('Manually Sorted')}{' '}<Icon name='ios-close-circle-outline'/></Text>
  }

  renderCards () {
    console.log('SORTED CARDS', this.state.sortedCards)
    return this.state.sortedCards.map((c, idx) => <SceneCard key={c.id} card={c} index={idx} reorder={this.reorderCards} navigation={this.props.navigation}/>)
  }

  render () {
    const { chapter, ui, cards, activeFilter, positionOffset, isSeries } = this.props
    if (activeFilter && !cards.length) return null

    const klasses = cx('outline__scene-title', {darkmode: ui.darkMode})
    return (
      <View>
        <SwipeRow>
          <View style={styles.sliderRow}>
            <Button><Text>Rename</Text></Button>
          </View>
          <View style={styles.chapterView}>
            <View style={styles.title}>
              <H3>{chapterHelpers.chapterTitle(chapter, positionOffset, isSeries)}</H3>
              <Button transparent light rounded onPress={this.navigateToNewCard}><Icon type='FontAwesome5' name='plus' style={styles.addScene}/></Button>
            </View>
            { this.renderManualSort() }
          </View>
        </SwipeRow>
        { this.renderCards() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chapterView: {
    backgroundColor: 'white',
    padding: 8,
  },
  sliderRow: {
    padding: 8,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addScene: {
    fontSize: 16,
  },
})

Chapter.propTypes = {
  chapter: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  activeFilter: PropTypes.bool.isRequired,
  ui: PropTypes.object.isRequired,
  lines: PropTypes.array.isRequired,
  isSeries: PropTypes.bool.isRequired,
  positionOffset: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    ui: state.ui,
    lines: selectors.lines.sortedLinesByBookSelector(state),
    isSeries: selectors.ui.isSeriesSelector(state),
    positionOffset: selectors.chapters.positionOffsetSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.cardActions, dispatch),
    chapterActions: bindActionCreators(actions.sceneActions, dispatch),
    beatActions: bindActionCreators(actions.beatActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chapter)