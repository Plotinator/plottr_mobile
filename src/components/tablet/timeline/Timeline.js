import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { actions, selectors, newIds, cardHelpers } from 'pltr/v2'
import ChapterTitleCell from './ChapterTitleCell'
import { BlankCell } from './BlankCell'
import { Cell } from '../../ui/Cell'
import { CardCell } from './CardCell'

const CELL_WIDTH = 150
const CELL_HEIGHT = 93

const black = '#000'
const white = '#fff'

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.headerScrollView = null
    this.scrollPosition = new Animated.Value(0)
    this.scrollEvent = Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.scrollPosition } } }],
      { useNativeDriver: false },
    )
    this.state = {lineMapKeys: {}}
  }

  static getDerivedStateFromProps (props, state) {
    const { lineMap } = props
    return {
      lineMapKeys: Object.keys(lineMap),
    }
  }

  handleScroll = e => {
    console.log('HANDLE SCROLL')
    if (this.headerScrollView) {
      let scrollX = e.nativeEvent.contentOffset.x
      this.headerScrollView.scrollTo({ x: scrollX, animated: false })
    }
  }

  renderLineTitle (id, title) {
    return <Cell key={id} style={styles.lineTitleCell}>
      <Text style={styles.lineTitle}>{title}</Text>
    </Cell>
  }

  renderNewChapter (id, title) {
    return <View key={id} style={styles.cell}>
      <Text>{title}</Text>
    </View>
  }

  renderCornerCell () {
    return <Cell key='corner-cell' />
  }

  renderChapterColumn = (section) => {
    let { item: chapter } = section
    let cells = []
    if (chapter.new) {
      cells = [<Cell key='+'></Cell>]
    } else {
      const { lineMap, cardMap } = this.props
      const { lineMapKeys } = this.state
      cells = lineMapKeys.map(linePosition => {

        const line = lineMap[linePosition]
        const cards = cardMap[`${line.id}-${chapter.id}`]
        const key = `${cards ? 'card' : 'blank'}-${chapter.position}-${linePosition}`
        if (cards) {
          return <CardCell key={key} card={cards[0]} color={line.color} navigation={this.props.navigation}/>
        } else {
          return <BlankCell key={key} color={line.color} navigation={this.props.navigation}/>
        }
      })
    }
    // TODO: dont use corner cell
    cells.push(this.renderCornerCell()) // needed to show the + line cell

    return <View style={styles.column}>{cells}</View>
  }

  renderChapterTitles() {
    const { chapters } = this.props
    let cols = chapters.map(ch => <ChapterTitleCell key={ch.id} chapterId={ch.id} />)
    cols.push(this.renderNewChapter('new-chapter', '+'))

    return (
      <View style={styles.header}>
        {this.renderCornerCell()}
        <ScrollView
          ref={ref => (this.headerScrollView = ref)}
          horizontal={true}
          scrollEnabled={false}
          scrollEventThrottle={16}
        >
          {cols}
        </ScrollView>
      </View>
    )
  }

  renderLineTitles() {
    const { lines } = this.props
    let cells = lines.map(l => this.renderLineTitle(l.id, l.title))
    cells.push(this.renderLineTitle('new-line', '+'))

    return <View style={styles.lineTitlesColumn}>{cells}</View>
  }

  renderBody() {
    const { chapters } = this.props
    const cells = [...chapters, {id: 'new'}] // 'new' is needed to show the + chapter cell

    return (
      <View>
        {this.renderLineTitles()}
        <FlatList
          style={styles.body}
          horizontal={true}
          data={cells}
          renderItem={this.renderChapterColumn}
          keyExtractor={item => item.id.toString()}
          stickyHeaderIndices={[0]}
          onScroll={this.scrollEvent}
          scrollEventThrottle={16}
          extraData={this.state}
        />
      </View>
    )
  }

  renderMainRow = (section) => {
    let { item } = section
    return item.render
  }

  componentDidMount() {
    this.listener = this.scrollPosition.addListener(position => {
      this.headerScrollView.scrollTo({ x: position.value, animated: false })
    })
  }

  render () {
    let body = this.renderBody()
    let data = [{ key: "body", render: body }]

    return (
      <View style={styles.container}>
        {this.renderChapterTitles()}
        <FlatList
          data={data}
          renderItem={this.renderMainRow}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'hsl(210, 36%, 96%)', marginVertical: 2, marginBottom: 0 }, //gray-9
  header: { flexDirection: 'row' },
  lineTitlesColumn: { position: 'absolute', width: CELL_WIDTH },
  lineTitleCell: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  lineTitle: {
    fontWeight: 'bold',
  },
  body: { marginLeft: CELL_WIDTH },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: black,
  },
  column: { flexDirection: 'column' },
})

Timeline.propTypes = {
  chapters: PropTypes.array,
  lineMap: PropTypes.object.isRequired,
  nextChapterId: PropTypes.number,
  beats: PropTypes.array,
  lines: PropTypes.array,
  seriesLines: PropTypes.array,
  cardMap: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  let nextChapterId = -1
  const bookId = selectors.currentTimelineSelector(state)
  if (bookId == 'series') {
    nextChapterId = newIds.nextId(state.beats)
  } else {
    nextChapterId = newIds.nextId(state.chapters)
  }
  return {
    chapters: selectors.sortedChaptersByBookSelector(state),
    lineMap: selectors.linePositionMappingSelector(state),
    nextChapterId: nextChapterId,
    lines: selectors.sortedLinesByBookSelector(state),
    cardMap: selectors.cardMapSelector(state),
    ui: state.ui,
    isSeries: selectors.isSeriesSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.uiActions, dispatch),
    sceneActions: bindActionCreators(actions.sceneActions, dispatch),
    lineActions: bindActionCreators(actions.lineActions, dispatch),
    cardActions: bindActionCreators(actions.cardActions, dispatch),
    beatActions: bindActionCreators(actions.beatActions, dispatch),
    seriesLineActions: bindActionCreators(actions.seriesLineActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)
