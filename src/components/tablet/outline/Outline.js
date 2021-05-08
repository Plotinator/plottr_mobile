import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { FlatList, View } from 'react-native'
import { keyBy } from 'lodash'
import { t } from 'plottr_locales'
import { selectors, actions, helpers } from 'pltr/v2'
import { Col, Grid } from 'react-native-easy-grid'
import Toolbar from '../shared/Toolbar'
import SeriesPicker from '../shared/SeriesPicker'
import styles from './OutlineStyles'
import { Text, MainList } from '../../shared/common'
import OutlineChapter from './OutlineChapter'

class Outline extends Component {
  state = { linesById: {}, currentLine: null, selectedLine: null }
  outlineListRef = null

  static getDerivedStateFromProps(props, state) {
    return {
      linesById: keyBy(props.lines, 'id'),
      currentLine: state.currentLine
    }
  }

  extractOutlineKey = (item) => item.id.toString()

  handleSelectOutline = ({ listIndex, id }) => {
    this.setState({
      selectedLineId: id
    })
    this.outlineListRef.scrollToIndex({ index: listIndex })
  }

  handleScrollFail = () => {
    // handle scrollTo fail
  }

  handleListRef = (ref) => {
    this.outlineListRef = ref
  }

  renderOutlineChapter(chapter, cardMap, i) {
    return <OutlineChapter key={i} chapter={chapter} cardMap={cardMap} />
  }

  returnChapterRenderer = (cardMap) => ({ item }, i) =>
    this.renderOutlineChapter(item, cardMap, i)

  render() {
    const {
      lines,
      chapters,
      card2Dmap,
      openDrawer,
      positionOffset
    } = this.props
    const { linesById, currentLine, selectedLineId } = this.state
    const cardMap = helpers.card.cardMapping(
      chapters,
      lines,
      card2Dmap,
      this.state.currentLine
    )
    const outlines = chapters.map((chapter, i) => ({
      ...chapter,
      title: helpers.beats.beatTitle(chapter, positionOffset),
      colors: cardMap[chapter.id].map(({ lineId }) => linesById[lineId].color)
    }))
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          <SeriesPicker />
        </Toolbar>
        <Grid>
          <Col size={5}>
            <MainList
              numbered
              list={outlines}
              title={t('Outline')}
              type={t('Outline')}
              activeKey='id'
              activeValue={selectedLineId || chapters[0]?.id}
              onPressItem={this.handleSelectOutline}
            />
          </Col>
          <Col size={10}>
            <FlatList
              data={outlines}
              renderItem={this.returnChapterRenderer(cardMap)}
              keyExtractor={this.extractOutlineKey}
              contentContainerStyle={styles.outline}
              ref={this.handleListRef}
              initialNumToRender={2}
              onScrollToIndexFailed={this.handleScrollFail}
            />
          </Col>
        </Grid>
      </View>
    )
  }
}

Outline.propTypes = {
  chapters: PropTypes.array.isRequired,
  lines: PropTypes.array.isRequired,
  card2Dmap: PropTypes.object.isRequired,
  positionOffset: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  beatTree: PropTypes.object.isRequired,
  hierarchyLevels: PropTypes.array.isRequired,
  isSeries: PropTypes.bool.isRequired,
  hierarchyEnabled: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    chapters: selectors.sortedBeatsByBookSelector(state),
    lines: selectors.sortedLinesByBookSelector(state),
    card2Dmap: selectors.cardMapSelector(state),
    positionOffset: selectors.positionOffsetSelector(state)
  }
}

export default connect(mapStateToProps, null)(Outline)
