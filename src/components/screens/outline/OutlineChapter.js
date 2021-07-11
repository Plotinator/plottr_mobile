import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { View, TouchableWithoutFeedback } from 'react-native'
import { t } from 'plottr_locales'
import { selectors, actions, helpers } from 'pltr/v2'
import ErrorBoundary from '../../shared/ErrorBoundary'
import styles from './OutlineStyles'
import {
  Text,
  AddButton,
  IconButton,
  RichEditor,
  ShellButton
} from '../../shared/common'
import Fonts from '../../../fonts'
import OutlineCard from './OutlineCard'
import BeatItemTitle from '../../shared/BeatItemTitle'

class OutlineChapter extends Component {
  handleAutoSortChapter = () => {
    const { beatActions, chapter } = this.props
    beatActions.autoSortBeat(chapter.id)
  }

  handleReorderCard = (card, currentIndex, move) => {
    const { cardActions, chapter, lines, cardMap } = this.props
    const { id: chapterId, autoOutlineSort } = chapter
    const { id: cardId, beatId, lineId } = card
    const cards = cardMap[chapterId] || []

    const sortedCards = helpers.card.sortCardsInBeat(
      autoOutlineSort,
      cards,
      lines
    )
    const cardsLength = cards.length - 1
    const currentIds = sortedCards.map((c) => c.id)
    const newIndex = currentIndex + move
    const toIndex =
      newIndex < 0 ? 0 : newIndex > cardsLength ? cardsLength : newIndex
    const newOrderInBeat = helpers.lists.moveToAbove(
      toIndex,
      currentIndex,
      currentIds
    )
    const cardIdsInLine = sortedCards
      .filter((c) => c.lineId == lineId)
      .map((c) => c.id)
    const currentPosition = sortedCards.find((c) => c.id == cardId)
      .positionWithinLine
    const newOrderWithinLine = helpers.lists.moveToAbove(
      currentPosition,
      card.positionWithinLine,
      cardIdsInLine
    )

    cardActions.reorderCardsInBeat(
      chapterId,
      lineId,
      newOrderInBeat,
      newOrderWithinLine
    )
  }

  renderManuallySorted (isManuallSorted) {
    return (
      isManuallSorted && (
        <ShellButton
          onPress={this.handleAutoSortChapter}
          style={styles.manualSorted}>
          <Text style={styles.manualText}>{t('Manually Sorted')}</Text>
          <IconButton name='times' style={styles.manualClose} />
        </ShellButton>
      )
    )
  }

  renderCard = (card, key) => (
    <OutlineCard
      key={key}
      index={key}
      card={card}
      cardMap={this.props.cardMap}
      navigation={this.props.navigation}
      onReorder={this.handleReorderCard}
    />
  )

  renderSortedCards = (sortedCards) => sortedCards.map(this.renderCard)

  render () {
    const { chapter, cardMap } = this.props
    const { id, autoOutlineSort } = chapter
    const { positionOffset, lines } = this.props
    const chapterTitle = <BeatItemTitle beat={chapter} />
    const cards = cardMap[id] || []
    const sortedCards = helpers.card.sortCardsInBeat(
      autoOutlineSort,
      cards,
      lines
    )
    const isManuallSorted = !autoOutlineSort && cards.length

    return (
      <TouchableWithoutFeedback>
        <ErrorBoundary>
          <View style={styles.chapter}>
            <View style={styles.chapterTitle}>
              <Text style={styles.chapterText}>{chapterTitle}</Text>
              {this.renderManuallySorted(isManuallSorted)}
            </View>
            <View style={styles.cards}>
              {this.renderSortedCards(sortedCards)}
            </View>
          </View>
        </ErrorBoundary>
      </TouchableWithoutFeedback>
    )
  }
}

OutlineChapter.propTypes = {
  lines: PropTypes.array.isRequired,
  positionOffset: PropTypes.number.isRequired
}

function mapStateToProps (state) {
  return {
    lines: selectors.sortedLinesByBookSelector(state),
    positionOffset: selectors.positionOffsetSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    cardActions: bindActionCreators(actions.card, dispatch),
    beatActions: bindActionCreators(actions.beat, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlineChapter)
