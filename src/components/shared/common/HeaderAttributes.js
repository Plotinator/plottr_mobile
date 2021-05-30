import React, { Component } from 'react'
import { View } from 'react-native'
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

class HeaderAttributes extends Component {
  state = {}

  renderAttribute = (attribute) => {
    const { name, type, title } = attribute
    const itemName = name || title
    console.log('ATTRIBUTE', attribute)
    return (
      <View style={styles.rowItem}>
        <ShellButton style={styles.rowDrag}>
          <IconButton name='bars' style={styles.drag} />
        </ShellButton>
        <View style={styles.rowName}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.rowType}>
          <ShellButton padded>
            <Text style={styles.typeText}>Paragraph</Text>
          </ShellButton>
        </View>
        <ShellButton style={styles.rowAction}>
          <IconButton name='trash' style={styles.trash} />
        </ShellButton>
      </View>
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
  switch (type) {
    case 'characters':
      attributesActions = {
        addAttribute: customAttributeActions.addCharacterAttr,
        removeAttribute: customAttributeActions.removeCharacterAttr,
        editAttribute: customAttributeActions.editCharacterAttr,
        reorderAttribute: customAttributeActions.reorderCharacterAttribute
      }

    case 'places':
      attributesActions = {
        addAttribute: customAttributeActions.addPlaceAttr,
        removeAttribute: customAttributeActions.removePlaceAttr,
        editAttribute: customAttributeActions.editPlaceAttr,
        reorderAttribute: customAttributeActions.reorderPlacesAttribute
      }

    case 'scenes':
      attributesActions = {
        addAttribute: customAttributeActions.addCardAttr,
        removeAttribute: customAttributeActions.removeCardAttr,
        editAttribute: customAttributeActions.editCardAttr,
        reorderAttribute: customAttributeActions.reorderCardsAttribute
      }

    case 'notes':
      attributesActions = {
        addAttribute: customAttributeActions.addNoteAttr,
        removeAttribute: customAttributeActions.removeNoteAttr,
        editAttribute: customAttributeActions.editNoteAttr,
        reorderAttribute: customAttributeActions.reorderNotesAttribute
      }

    default:
      console.warn(`${type} actions not implemented`)
      attributesActions = {
        addAttribute: () => {},
        removeAttribute: () => {},
        editAttribute: () => {},
        reorderAttribute: () => {}
      }
  }

  return {
    actions: attributesActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAttributes)
