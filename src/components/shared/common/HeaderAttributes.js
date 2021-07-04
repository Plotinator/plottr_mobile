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
import styles from './HeaderAttributesStyles'
import { cloneDeep } from 'lodash'
import { t } from 'plottr_locales'
import Collapsible from 'react-native-collapsible'
import * as Animatable from 'react-native-animatable'
import { Constants } from '../../../utils'

const { ATTRIBUTE_HEIGHT } = Constants

class HeaderAttributes extends Component {
  state = {
    editingIndex: null,
    addingNew: false,
    dragOffset: null,
    dragIndex: null
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

  renderAttribute = (attribute, i) => {
    const { editingIndex } = this.state
    const { attributesThatCanChange, isCategory } = this.props
    const { actions } = this.props
    const isEditing = editingIndex === i
    const canChangeType = attributesThatCanChange.includes(attribute.name)
    return (
      <AttributeItem
        isCategory={isCategory}
        isEditing={isEditing}
        canChangeType={canChangeType}
        offset={this.parseOffset(i)}
        position={i}
        key={i}
        attribute={attribute}
        setOffset={this.setTempOffset}
        setEditing={this.setEditing}
        {...actions}
      />
    )
  }

  render() {
    const { style, attributes = [], actions, type, isCategory } = this.props
    const { addingNew } = this.state
    const capitalType = `${type.substring(0, 1).toUpperCase()}${type.substring(
      1
    )}`
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {t('Custom Attributes for { type }', { type: capitalType })}
          </Text>
          <Text style={styles.subtitle}>
            {t('Choose what you want to track about your { type }', { type })}
          </Text>
          <ScrollerView
            scrollerProps={{
              disableScrollViewPanResponder: true,
              ref: this.setScrollerRef,
              bounces: false,
              style: styles.scroller
            }}>
            <View style={styles.rowItems}>
              {attributes.map(this.renderAttribute)}
              {addingNew && (
                <AttributeItem
                  isNew
                  isEditing
                  isCategory={isCategory}
                  canChangeType={true}
                  offset={0}
                  position={attributes.length}
                  key={'new'}
                  attribute={{ name: '', type: 'text' }}
                  setEditing={this.setEditing}
                  {...actions}
                />
              )}
            </View>
            <View style={styles.footer}>
              <View />
            </View>
          </ScrollerView>
          <View style={styles.footer}>
            <AddButton size={35} onPress={this.handleAddNew} />
          </View>
        </View>
      </View>
    )
  }
}

class AttributeItem extends Component {
  state = {
    offsetY: 0,
    stateName: ''
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
    const { position, attribute } = this.props
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
        attribute,
        reorderAttribute,
        isEditing,
        setEditing,
        setOffset
      } = this.props
      const { willChange, NewPosition } = this.calculateMove(dy)
      if (willChange && !isEditing) {
        reorderAttribute(attribute, NewPosition)
        setEditing(null)
      }
      this.setState({ offsetY: 0 })
      setOffset(null, null)
      if (dy === 0) {
        // click
        // this.handleEdit()
      }
    },
    onPanResponderMove: (event, { dy }) => {
      const { position, setOffset, attribute, isEditing } = this.props
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
      attribute,
      attribute: { name },
      removeAttribute,
      isCategory
    } = this.props
    Alert.alert(
      t('Delete Attribute', { name }),
      t('Delete Attribute "{name}"?', { name }),
      [
        {
          text: t('Yes, Delete'),
          onPress: () => {
            this.view.transitionTo({ height: 0, marginBottom: 0, padding: 0 })
            setTimeout(
              () => removeAttribute(isCategory ? attribute : name),
              300
            )
          }
        },
        { text: t('No'), onPress: () => {}, style: 'cancel' }
      ]
    )
  }

  handleNameChange = (stateName) => this.setState({ stateName })

  handleToggleType = () => {
    const { position, attribute, editAttribute } = this.props
    const { name, type, title } = attribute
    const isText = type === 'text'
    const newType = isText ? 'paragraph' : 'text'
    editAttribute(position, attribute, { ...attribute, type: newType })
  }

  handleEdit = () => {
    const { position, attribute, setEditing } = this.props
    setEditing(position)
    this.setState({ stateName: attribute.name })
    setTimeout(this.handleFocus)
  }

  handleFocus = () => this.input && this.input.focus()

  handleSave = () => {
    const { stateName } = this.state
    const {
      position,
      attribute,
      editAttribute,
      setEditing,
      isNew,
      isCategory,
      addAttribute
    } = this.props
    console.log('isCategory', isCategory)
    if (isNew)
      addAttribute(isCategory ? stateName : { ...attribute, name: stateName })
    else editAttribute(position, attribute, { ...attribute, name: stateName })
    this.setState({
      stateName: ''
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
      attribute,
      offset = 0,
      isEditing,
      canChangeType,
      isNew,
      isCategory
    } = this.props
    const { name, type, title } = attribute
    const itemName = name || title
    const moveStyles = {
      top: offsetY + offset,
      zIndex: offsetY != 0 ? 9 : 0
    }
    return (
      <Animatable.View
        transition={['top']}
        duration={300}
        style={[styles.rowItem, moveStyles]}
        ref={this.setViewRef}>
        <View style={styles.rowDrag} {...this._panResponder.panHandlers}>
          <IconButton
            name='bars'
            style={[styles.drag, { opacity: isEditing || isNew ? 0.4 : 1 }]}
          />
        </View>
        <View style={styles.rowName}>
          <Input
            ref={this.setInputRef}
            reset
            editable={isEditing}
            value={stateName || name}
            onChangeText={this.handleNameChange}
            autoCapitalize='words'
            numberOfLines={1}
            inputStyle={styles.nameText}
            style={styles.nameInput}
            placeholder={t('New Attribute')}
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
        {!isCategory && (
          <View style={styles.rowType}>
            <ShellButton
              padded
              onPress={this.handleToggleType}
              disabled={!canChangeType || isEditing}>
              <Text style={styles.typeText}>{this.renderTypeText(type)}</Text>
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

function mapStateToProps(state, { type }) {
  let canChange = []
  let restrictedValues = []
  let attributes = []
  let isCategory = false
  switch (type) {
    case 'characters':
      canChange = selectors.characterCustomAttributesThatCanChangeSelector(
        state
      )
      // restrictedValues = selectors.characterCustomAttributesRestrictedValues(
      //   state
      // )
      break
    case 'places':
      canChange = selectors.placeCustomAttributesThatCanChangeSelector(state)
      // restrictedValues = selectors.placeCustomAttributesRestrictedValues(state)
      break
    case 'notes':
      canChange = selectors.notesCustomAttributesThatCanChangeSelector(state)
      // restrictedValues = selectors.notesCustomAttributesRestrictedValues(state)
      break
    case 'cards':
      canChange = selectors.cardsCustomAttributesThatCanChangeSelector(state)
      // restrictedValues = selectors.cardsCustomAttributesRestrictedValues(state)
      break
    case 'characterCategories':
      attributes = selectors.characterCategoriesSelector(state)
      isCategory = true
      break
    case 'noteCategories':
      attributes = selectors.noteCategoriesSelector(state)
      isCategory = true
      break
    case 'tagCategories':
      attributes = selectors.tagCategoriesSelector(state)
      isCategory = true
      break
    default:
      canChange = () => {
        console.warn(
          `${type}CustomAttributesThatCanChangeSelector not implemented`
        )
        return customAttributes.map(({ name }) => name)
      }
      break
  }
  return {
    attributes: attributes.length
      ? attributes
      : state.customAttributes[type] || [],
    attributesThatCanChange: canChange,
    // restrictedValues: restrictedValues
    isCategory
  }
}

function mapDispatchToProps(dispatch, { type }) {
  const customAttributeActions = {
    ...bindActionCreators(
      {
        ...actions.customAttribute,
        ...actions.category
      },
      dispatch
    )
  }
  let attributesActions = {}

  switch (type) {
    case 'characters':
      attributesActions = {
        addAttribute: customAttributeActions.addCharacterAttr,
        removeAttribute: customAttributeActions.removeCharacterAttr,
        editAttribute: customAttributeActions.editCharacterAttr,
        reorderAttribute: customAttributeActions.reorderCharacterAttribute
      }
      break
    case 'places':
      attributesActions = {
        addAttribute: customAttributeActions.addPlaceAttr,
        removeAttribute: customAttributeActions.removePlaceAttr,
        editAttribute: customAttributeActions.editPlaceAttr,
        reorderAttribute: customAttributeActions.reorderPlacesAttribute
      }
      break
    case 'cards':
      attributesActions = {
        addAttribute: customAttributeActions.addCardAttr,
        removeAttribute: customAttributeActions.removeCardAttr,
        editAttribute: customAttributeActions.editCardAttr,
        reorderAttribute: customAttributeActions.reorderCardsAttribute
      }
      break
    case 'notes':
      attributesActions = {
        addAttribute: customAttributeActions.addNoteAttr,
        removeAttribute: customAttributeActions.removeNoteAttr,
        editAttribute: customAttributeActions.editNoteAttr,
        reorderAttribute: customAttributeActions.reorderNotesAttribute
      }
      break
    case 'characterCategories':
      attributesActions = {
        addAttribute: customAttributeActions.addCharacterCategory,
        removeAttribute: customAttributeActions.deleteCharacterCategory,
        editAttribute: customAttributeActions.updateCharacterCategory,
        reorderAttribute: customAttributeActions.reorderCharacterCategory
      }
      break
    case 'noteCategories':
      attributesActions = {
        addAttribute: customAttributeActions.addNoteCategory,
        removeAttribute: customAttributeActions.deleteNoteCategory,
        editAttribute: customAttributeActions.updateNoteCategory,
        reorderAttribute: customAttributeActions.reorderNoteCategory
      }
      break
    case 'tagCategories':
      attributesActions = {
        addAttribute: customAttributeActions.addTagCategory,
        removeAttribute: customAttributeActions.deleteTagCategory,
        editAttribute: customAttributeActions.updateTagCategory,
        reorderAttribute: customAttributeActions.reorderTagCategory
      }
      break
    default:
      console.warn(`${type} actions not implemented`)
      attributesActions = {
        addAttribute: () => {},
        removeAttribute: () => {},
        editAttribute: () => {},
        reorderAttribute: () => {}
      }
      break
  }

  return {
    actions: attributesActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAttributes)
