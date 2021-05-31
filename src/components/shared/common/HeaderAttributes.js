import React, { Component } from 'react'
import { View, Alert, PanResponder } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, selectors } from 'pltr/v2'
import Text from './Text'
import ShellButton from './ShellButton'
import AddButton from './AddButton'
import IconButton from './IconButton'
import styles from './HeaderAttributesStyles'
import { cloneDeep } from 'lodash'
import { t } from 'plottr_locales'
import Collapsible from 'react-native-collapsible'

const ATTRIBUTE_HEIGHT = 51

class HeaderAttributes extends Component {
  state = {
    tempOffsetY: 0,
    tempFocusIndex: 0
  }

  setTempOffset = (tempFocusIndex, tempOffsetY) => {
    this.setState({
      tempOffsetY,
      tempFocusIndex
    })
  }

  renderAttribute = (attribute, i) => {
    const { tempOffsetY, tempFocusIndex } = this.state
    const { actions } = this.props
    return (
      <AttributeItem
        offset={tempFocusIndex == i ? tempOffsetY : 0}
        position={i}
        key={i}
        attribute={attribute}
        // setOffset={this.setTempOffset}
        {...actions}
      />
    )
  }

  render() {
    const { style, attributes = [] } = this.props
    console.log('attributes', attributes)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Custom Attributes for Characters</Text>
        <Text style={styles.subtitle}>
          Choose what you want to track about your characters
        </Text>
        <View style={styles.rowItems}>
          {attributes.map(this.renderAttribute)}
        </View>
        <View style={styles.footer}>
          <AddButton size={35} />
        </View>
      </View>
    )
  }
}

class AttributeItem extends Component {
  state = {
    offsetY: 0
  }
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
      const { position, attribute, reorderAttribute } = this.props
      const { willChange, NewPosition } = this.calculateMove(dy)
      if (willChange) {
        console.log('TO MOVE ', position, NewPosition, attribute)
        reorderAttribute(attribute, NewPosition)
      }
      this.setState({ offsetY: 0 })
      if (dy === 0) {
        // click
        // this.handleEdit()
      }
    },
    onPanResponderMove: (event, { dy }) => {
      const { position, attribute } = this.props
      const { willChange, NewPosition } = this.calculateMove(dy)
      if (willChange) {
        console.log('MOVING ', NewPosition, NewPosition > position)
      }
      this.setState({
        offsetY: dy
      })
    }
  })

  handleDelete = () => {
    const {
      attribute: { name },
      removeAttribute
    } = this.props
    Alert.alert(
      t('Delete Attribute', { name }),
      t('Delete Attribute "{name}"?', { name }),
      [
        {
          text: t('Yes, Delete'),
          onPress: () => {
            removeAttribute(name)
          }
        },
        { text: t('No'), onPress: () => {}, style: 'cancel' }
      ]
    )
  }

  render = () => {
    const { offsetY } = this.state
    const { attribute, offset } = this.props
    const { name, type, title } = attribute
    const itemName = name || title
    console.log('ATTRIBUTE', attribute)
    const moveStyles = {
      top: offsetY,
      zIndex: offsetY != 0 ? 9 : 0
    }

    return (
      <View style={[styles.rowItem, moveStyles]}>
        <View style={styles.rowDrag} {...this._panResponder.panHandlers}>
          <IconButton name='bars' style={styles.drag} />
        </View>
        <View style={styles.rowName}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <ShellButton style={styles.rowAction} onPress={this.handleEdit}>
          <IconButton name='pen' style={styles.icon} />
        </ShellButton>
        <View style={styles.rowType}>
          <ShellButton padded>
            <Text style={styles.typeText}>Paragraph</Text>
          </ShellButton>
        </View>
        <ShellButton style={styles.rowAction} onPress={this.handleDelete}>
          <IconButton name='trash' style={styles.icon} />
        </ShellButton>
      </View>
    )
  }
}

function mapStateToProps(state, { type }) {
  let canChange = []
  let restrictedValues = []
  switch (type) {
    case 'character':
    case 'characters':
      canChange = selectors.characterCustomAttributesThatCanChangeSelector(
        state
      )
      // restrictedValues = selectors.characterCustomAttributesRestrictedValues(
      //   state
      // )
      break
    case 'place':
    case 'places':
      canChange = selectors.placeCustomAttributesThatCanChangeSelector(state)
      // restrictedValues = selectors.placeCustomAttributesRestrictedValues(state)
      break
    case 'note':
    case 'notes':
      canChange = selectors.notesCustomAttributesThatCanChangeSelector(state)
      // restrictedValues = selectors.notesCustomAttributesRestrictedValues(state)
      break
    case 'card':
    case 'cards':
    case 'scene':
    case 'scenes':
      canChange = selectors.cardsCustomAttributesThatCanChangeSelector(state)
      // restrictedValues = selectors.cardsCustomAttributesRestrictedValues(state)
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
    attributes: state.customAttributes[type] || [],
    attributesThatCanChange: canChange
    // restrictedValues: restrictedValues
  }
}

function mapDispatchToProps(dispatch, { type }) {
  const customAttributeActions = bindActionCreators(
    actions.customAttribute,
    dispatch
  )
  let attributesActions = {}
  console.log(`GETTING ATTRIBUTE ACTIONS FOR ${type}`)

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
    case 'scenes':
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
