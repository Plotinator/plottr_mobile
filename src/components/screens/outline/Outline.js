import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FlatList, View } from 'react-native'
import { keyBy } from 'lodash'
import { t } from 'plottr_locales'
import { selectors, actions, helpers } from 'pltr/v2'
import { Col, Grid } from 'react-native-easy-grid'
import Toolbar from '../../shared/Toolbar'
import SeriesPicker from '../../shared/SeriesPicker'
import styles from './OutlineStyles'
import {
  Text,
  Button,
  MainList,
  AddButton,
  IconButton,
  ShellButton,
  HeaderFilter,
  ScrollerView,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import OutlineChapter from './OutlineChapter'
import BeatItemTitle from '../../shared/BeatItemTitle'
import { Metrics } from '../../../utils'
import Popover, {
  PopoverMode,
  PopoverPlacement
} from 'react-native-popover-view'

const { IS_TABLET, ifTablet } = Metrics

class Outline extends Component {
  state = {
    linesById: {},
    currentLine: null,
    selectedLine: null,
    viewables: [{ index: 0, isViewable: true }],
    autoType: 'list' // list
  }
  outlineListRef = null

  static getDerivedStateFromProps(props, state) {
    return {
      linesById: keyBy(props.lines, 'id'),
      currentLine: state.currentLine
    }
  }

  extractOutlineKey = (item) => item.id.toString()

  handleSelectOutline = ({ listIndex, index, id }) => {
    this.setState({
      autoType: 'list',
      selectedLineId: id,
      viewables: [{ index, isViewable: true }]
    })
    this.outlineListRef.scrollToIndex({
      index: listIndex || index
    })
  }

  handleScrollFail = () => {
    // handle scrollTo fail
  }

  handleListRef = (ref) => {
    this.outlineListRef = ref
  }

  handleDotsRef = (ref) => {
    this.outlineDotsRef = ref
  }

  handleViewableItemsChanged = ({ viewableItems, changed }) => {
    const { selectedLineId, autoType } = this.state
    const last = viewableItems.length - 1
    const lastViewing = viewableItems[last]
    const isFound = viewableItems.find(
      (o) => o.isViewable && o.item.id == selectedLineId
    )
    if (
      autoType == 'scroll' &&
      lastViewing &&
      lastViewing.isViewable &&
      lastViewing.item.id !== selectedLineId &&
      !isFound
    ) {
      if (IS_TABLET) {
        this.setState({
          selectedLineId: lastViewing.item.id
        })
      } else {
        setTimeout(
          () =>
            this.outlineDotsRef.scrollToIndex({
              index: lastViewing.index
            }),
          100
        )
      }
      this.setState({ viewables: viewableItems })
    }
  }

  handleScrollDrag = () => {
    this.setState({
      autoType: 'scroll'
    })
  }

  handleNew = (type) => {
    const { bookId, lineActions, beatActions } = this.props
    switch (type) {
      case 'plotline':
        lineActions.addLineWithTitle(t('New Plotline'), this.props.bookId)
        break
      case 'chapter':
        beatActions.addBeat(bookId)
        break
    }
  }

  renderOutlineChapter(chapter, cardMap, i) {
    return (
      <OutlineChapter
        key={i}
        chapter={chapter}
        cardMap={cardMap}
        navigation={this.props.navigation}
      />
    )
  }

  returnChapterRenderer = (cardMap) => ({ item }, i) =>
    this.renderOutlineChapter(item, cardMap, i)

  renderBeatDot = ({ item: outline }) => {
    const { viewables } = this.state
    const last = viewables.length - 1
    const lastViewing = viewables[last]

    const isActive = lastViewing && lastViewing.index === outline.index
    // viewables.find(
    //   (o) => o.index == outline.index && o.isViewable == true
    // )

    return (
      <ShellButton
        data={outline}
        key={outline.id}
        hitSize={10}
        style={[styles.beatDot, isActive && styles.activeDot]}
        onPress={this.handleSelectOutline}>
        <Text style={[styles.dotText, isActive && styles.activeDotText]}>
          {/*outline.index + 1}
          {'. '*/}
          {outline.title}
        </Text>
      </ShellButton>
    )
  }

  render() {
    const {
      lines,
      chapters,
      card2Dmap,
      openDrawer,
      positionOffset,
      filters
    } = this.props
    const { linesById, currentLine, selectedLineId } = this.state
    const cardMap = helpers.card.cardMapping(
      chapters,
      lines,
      card2Dmap,
      this.state.currentLine
    )
    const outlines =
      chapters.map((chapter, i) => ({
        ...chapter,
        index: i,
        title: <BeatItemTitle beat={chapter} />,
        colors: cardMap[chapter.id].map(({ lineId }) => linesById[lineId].color)
      })) || []
    const filterCount = Object.values(filters || {}).map(
      (filter) => filter.length
    )
    const count = filterCount.length ? filterCount.reduce((a, b) => a + b) : 0

    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          <SeriesPicker />
          <View style={[styles.additionals, styles.leanRight]}>
            <HeaderButtonOptions
              title={t('Filter')}
              icon='filter'
              count={count}>
              <HeaderFilter filters={filters} type='outlines' />
            </HeaderButtonOptions>
          </View>
        </Toolbar>
        <View style={styles.wrapper}>
          {!IS_TABLET && (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{t('Outline')}</Text>
              <ShellButton
                data={'chapter'}
                style={styles.addButton}
                onPress={this.handleNew}>
                <AddButton size={26} style={styles.addIconButton} />
                <Text style={styles.addButtonText}>{t('Chapter')}</Text>
              </ShellButton>
              <ShellButton
                data={'plotline'}
                style={styles.addButton}
                onPress={this.handleNew}>
                <AddButton size={26} style={styles.addIconButton} />
                <Text style={styles.addButtonText}>{t('Plotline')}</Text>
              </ShellButton>
            </View>
          )}
          {!IS_TABLET && (
            <View style={styles.beatDots}>
              <FlatList
                horizontal
                data={outlines}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderBeatDot}
                keyExtractor={this.extractOutlineKey}
                contentContainerStyle={styles.dotslist}
                onScrollToIndexFailed={this.handleScrollFail}
                ref={this.handleDotsRef}
              />
            </View>
          )}
          <Grid>
            {IS_TABLET && (
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
            )}
            <Col size={10}>
              <FlatList
                data={outlines}
                renderItem={this.returnChapterRenderer(cardMap)}
                keyExtractor={this.extractOutlineKey}
                contentContainerStyle={styles.outline}
                ref={this.handleListRef}
                initialNumToRender={3}
                onScrollToIndexFailed={this.handleScrollFail}
                onViewableItemsChanged={this.handleViewableItemsChanged}
                onScrollBeginDrag={this.handleScrollDrag}
              />
            </Col>
          </Grid>
        </View>
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
  hierarchyEnabled: PropTypes.bool,
  filters: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const bookId = selectors.currentTimelineSelector(state)
  return {
    chapters: selectors.sortedBeatsByBookSelector(state),
    lines: selectors.sortedLinesByBookSelector(state),
    card2Dmap: selectors.cardMapSelector(state),
    positionOffset: selectors.positionOffsetSelector(state),
    filters: state.ui.outlineFilter,
    bookId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.ui, dispatch),
    lineActions: bindActionCreators(actions.line, dispatch),
    cardActions: bindActionCreators(actions.card, dispatch),
    beatActions: bindActionCreators(actions.beat, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Outline)
