import React, { Component } from 'react'
import { View, Alert, PanResponder } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, selectors } from 'pltr/v2'
import Text from './Text'
import Input from './Input'
import ShellButton from './ShellButton'
import ScrollerView from './ScrollerView'
import AddButton from './AddButton'
import IconButton from './IconButton'
import styles from './HeaderPlotlinesStyles'
import { cloneDeep } from 'lodash'
import { t } from 'plottr_locales'
import Collapsible from 'react-native-collapsible'
import * as Animatable from 'react-native-animatable'
import { Constants } from '../../../utils'
import tinycolor from 'tinycolor2'
import ColorPickerModal from '../../shared/ColorPickerModal'

const { ATTRIBUTE_HEIGHT } = Constants

class HeaderPlotlines extends Component {
  state = {
    editingIndex: null,
    addingNew: false,
    dragOffset: null,
    dragIndex: null,
    currentLine: null,
    currentLine: false
  }

  setTempOffset = (dragIndex, dragOffset) => {
    const { dragIndex: stateIndex, dragOffset: stateOffset } = this.state
    if (stateIndex != dragIndex || stateOffset != dragOffset) {
      console.log('SETTING FOCUS DRAG', dragIndex, dragOffset)
      this.setState({
        dragIndex,
        dragOffset
      })
    }
  }

  setEditing = (editingIndex) =>
    this.setState({
      editingIndex,
      addingNew: false
    })

  setScrollerRef = (ref) => (this.scroller = ref)

  handleAddNew = () => {
    this.setState(
      {
        addingNew: true
      },
      () => setTimeout(() => this.scroller && this.scroller.scrollToEnd(), 800)
    )
  }

  handleReorderLine = (line, NewPosition) => {
    const { lines, bookId, lineActions } = this.props
    const { position } = line
    console.log('bookId', bookId)
    const maxlines = lines.length - 1
    const Sortedlines = cloneDeep(lines).sort((lineA, lineB) =>
      lineA.position > lineB ? -1 : 1
    )
    const NewlinePosition =
      NewPosition < 0 ? 0 : NewPosition > maxlines ? maxlines : NewPosition
    const isNegative = position > NewPosition
    let Moves = isNegative
      ? position - NewlinePosition
      : NewlinePosition - position
    let InsertPosition = isNegative ? position - Moves : position + Moves
    const Prelines = Sortedlines.slice(0, position)
    const Postlines = Sortedlines.slice(position + 1, lines.length)
    const Newlines = [].concat(Prelines).concat(Postlines)
    Newlines.splice(InsertPosition, 0, cloneDeep(line))
    Newlines.map((line, o) => (line.position = o))
    lineActions.reorderLines(Newlines, bookId)
  }

  handleShowColorModal = (currentLine) =>
    this.setState({ showColorPicker: true, currentLine })
  handleHideColorModal = () => this.setState({ showColorPicker: false })
  handleSetLineColor = (color) => {
    const {
      currentLine: { id, title }
    } = this.state
    const { lineActions } = this.props
    lineActions.editLine(id, title, color)
    this.setState({ showColorPicker: false, currentLine: null })
  }

  parseOffset(i) {
    const { dragOffset, dragIndex } = this.state
    if (dragIndex > dragOffset) {
      console.log('is greater')
      return i < dragIndex && i >= dragOffset ? ATTRIBUTE_HEIGHT + 2 : 0
    }
    if (dragIndex < dragOffset) {
      console.log('is lesser')
      return i > dragIndex && i <= dragOffset ? -ATTRIBUTE_HEIGHT - 2 : 0
    }
    return 0
  }

  renderLine = (line, i) => {
    const { editingIndex } = this.state
    const { lineActions } = this.props
    const isEditing = editingIndex === i
    return (
      <LineItem
        isEditing={isEditing}
        offset={this.parseOffset(i)}
        position={i}
        key={i}
        line={line}
        setOffset={this.setTempOffset}
        setEditing={this.setEditing}
        reorderLine={this.handleReorderLine}
        changeLineColor={this.handleShowColorModal}
        lineActions={lineActions}
      />
    )
  }

  render() {
    const {
      style,
      lines = [],
      actions,
      isCategory,
      bookId,
      lineActions
    } = this.props
    const { addingNew, currentLine, showColorPicker } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('Plotlines')}</Text>
          <Text style={styles.subtitle}>
            {t('Add, Reorder, Edit or Delete plotlines.')}
          </Text>
          <ScrollerView
            scrollerProps={{
              disableScrollViewPanResponder: true,
              ref: this.setScrollerRef,
              bounces: false,
              style: styles.scroller
            }}>
            <View style={styles.rowItems}>
              {lines.map(this.renderLine)}
              {addingNew && (
                <LineItem
                  isNew
                  isEditing
                  offset={0}
                  position={lines.length}
                  key={'new'}
                  line={{ name: '', type: 'text' }}
                  setEditing={this.setEditing}
                  bookId={bookId}
                  lineActions={lineActions}
                />
              )}
            </View>
            <View style={styles.footer}>
              <View />
            </View>
          </ScrollerView>
          {!addingNew && (
            <View style={styles.footer}>
              <AddButton
                size={30}
                onPress={this.handleAddNew}
                style={styles.addButton}
              />
            </View>
          )}
        </View>
        {showColorPicker && currentLine && (
          <ColorPickerModal
            chooseColor={this.handleSetLineColor}
            currentColor={currentLine.color || 'red'}
            onClose={this.handleHideColorModal}
          />
        )}
      </View>
    )
  }
}

class LineItem extends Component {
  state = {
    offsetY: 0,
    stateName: '',
    stateColor: ''
  }
  componentDidMount() {
    const { isNew } = this.props
    isNew && setTimeout(this.handleFocus)
  }
  componentWillUnmount() {
    this.input = null
  }
  setInputRef = (ref) => (this.input = ref)
  setViewRef = (ref) => (this.view = ref)
  calculateMove = (dy) => {
    const { position, line } = this.props
    const HALF_HEIGHT = ATTRIBUTE_HEIGHT / 2
    const willChange = dy < -HALF_HEIGHT || dy > HALF_HEIGHT
    const multiplier = dy < -1 ? -1 : 1
    let NewPosition = 0
    if (willChange) {
      const Position = Number(String(dy).replace('-', ''))
      const MovePosition =
        Math.ceil((Position - HALF_HEIGHT) / ATTRIBUTE_HEIGHT) * multiplier
      NewPosition = position + MovePosition
    }
    return { willChange, NewPosition }
  }
  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderRelease: (event, { dy }) => {
      const {
        position,
        line,
        reorderLine,
        isEditing,
        setEditing,
        setOffset
      } = this.props
      const { willChange, NewPosition } = this.calculateMove(dy)
      if (willChange && !isEditing) {
        reorderLine(line, NewPosition)
        setEditing(null)
      }
      this.setState({ offsetY: 0 })
      setOffset && setOffset(null, null)
      if (dy === 0) {
        // click
        // this.handleEdit()
      }
    },
    onPanResponderMove: (event, { dy }) => {
      const { position, setOffset, line, isEditing } = this.props
      const { willChange, NewPosition } = this.calculateMove(dy)
      if (!isEditing) {
        if (willChange) setOffset(position, NewPosition)
        else setOffset(null, null)
        this.setState({
          offsetY: dy
        })
      }
    }
  })

  handleDelete = () => {
    const {
      line,
      line: { title, id, bookId }
    } = this.props
    Alert.alert(
      t('Delete Plotline'),
      t('Delete Plotline {name}?', { name: title }),
      [
        {
          text: t('Yes, Delete'),
          onPress: () => {
            this.view.transitionTo({ height: 0, marginBottom: 0, padding: 0 })
            setTimeout(() => {
              const {
                line: { id, bookId }
              } = this.props
              const { lineActions } = this.props
              lineActions.deleteLine(id, bookId)
            }, 300)
          }
        },
        { text: t('No'), onPress: () => {}, style: 'cancel' }
      ]
    )
  }

  handleNameChange = (stateName) => this.setState({ stateName })
  handleColorChange = (stateColor) => this.setState({ stateColor })

  handleEdit = () => {
    const { position, line, setEditing } = this.props
    setEditing(position)
    this.setState({ stateName: line.title, stateColor: line.color })
    setTimeout(this.handleFocus)
  }

  handleFocus = () => this.input && this.input.focus()

  handleSave = () => {
    const { stateName, stateColor } = this.state
    const {
      bookId,
      position,
      line,
      setEditing,
      lineActions,
      isNew
    } = this.props
    if (isNew) lineActions.addLineWithTitle(stateName, bookId)
    else lineActions.editLine(line.id, stateName, stateColor)
    this.setState({
      stateName: '',
      stateColor: ''
    })
    setEditing(null)
  }

  handleCancel = () => {
    const { stateName } = this.state
    const { setEditing } = this.props
    this.setState({
      stateName: ''
    })
    setEditing(null)
  }

  handleChangeColor = () => {
    const { changeLineColor, line } = this.props
    changeLineColor(line)
  }

  renderTypeText(type) {
    let typeText = 'Text'
    switch ((type || '').substring(0, 1).toLowerCase()) {
      case 't':
        typeText = t('Text')
        break
      case 'p':
        typeText = t('Paragraph')
        break
    }
    return typeText
  }

  render = () => {
    const { offsetY, stateName } = this.state
    const {
      line,
      lines,
      offset = 0,
      isEditing,
      canChangeType,
      isNew,
      isCategory
    } = this.props
    const { type, title, color } = line
    const moveStyles = {
      top: offsetY + offset,
      zIndex: offsetY != 0 ? 9 : 0
    }
    const hexColor = isNew ? 'transparent' : tinycolor(color).toHexString()
    return (
      <Animatable.View
        transition={['top']}
        duration={300}
        style={[styles.rowItem, moveStyles, { borderColor: hexColor }]}
        ref={this.setViewRef}>
        <View style={styles.rowDrag} {...this._panResponder.panHandlers}>
          <IconButton
            name='bars'
            style={[
              styles.drag,
              { opacity: isEditing || isNew ? 0.4 : 1 },
              { color: isNew ? 'gray' : hexColor }
            ]}
          />
        </View>
        <View style={styles.rowName}>
          <Input
            ref={this.setInputRef}
            reset
            editable={isEditing}
            value={stateName || title}
            onChangeText={this.handleNameChange}
            autoCapitalize='words'
            numberOfLines={1}
            inputStyle={styles.nameText}
            style={styles.nameInput}
            placeholder={t('New Line')}
            onSubmitEditing={this.handleSave}
            onBlur={this.handleCancel}
            returnKeyType='done'
          />
        </View>
        <ShellButton
          style={styles.editButton}
          onPress={isEditing ? this.handleSave : this.handleEdit}>
          <IconButton
            name={isEditing ? 'check' : 'pen'}
            color={isEditing ? 'orange' : 'lightenGray'}
            style={[styles.icon, styles.check]}
          />
        </ShellButton>
        {!isEditing && (
          <View style={styles.rowType}>
            <ShellButton
              hitSize={6}
              style={styles.colorButton}
              onPress={this.handleChangeColor}
              disabled={isEditing}>
              <IconButton padded color={hexColor} name='paint-brush' />
            </ShellButton>
          </View>
        )}
        <ShellButton
          style={styles.rowAction}
          onPress={isNew ? this.handleCancel : this.handleDelete}>
          <IconButton
            name={isNew ? 'times' : 'trash'}
            style={isNew ? styles.iconLarger : styles.icon}
            color='lightenGray'
          />
        </ShellButton>
      </Animatable.View>
    )
  }
}

function mapStateToProps(state) {
  return {
    lines: selectors.sortedLinesByBookSelector(state),
    bookId: selectors.currentTimelineSelector(state)
  }
}

function mapDispatchToProps(dispatch, { type }) {
  return {
    lineActions: bindActionCreators(actions.line, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPlotlines)
