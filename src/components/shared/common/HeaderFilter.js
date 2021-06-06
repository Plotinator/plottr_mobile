import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, selectors } from 'pltr/v2'
import Text from './Text'
import ShellButton from './ShellButton'
import Checkbox from './Checkbox'
import styles from './HeaderFilterStyles'
import { cloneDeep } from 'lodash'
import { t } from 'plottr_locales'
import Collapsible from 'react-native-collapsible'

class HeaderFilter extends Component {
  state = {
    filters: [],
    selected: {}
  }

  handleClearFilter = () => {
    const { onFilter } = this.props
    this.setState(
      {
        selected: {}
      },
      () => onFilter && onFilter({})
    )
  }

  handleSelect = (active, checkbox) => {
    const { label, selectIndex } = checkbox
    const { selected } = this.state
    const { onFilter } = this.props
    const newSelected = cloneDeep(selected)
    if (active) newSelected[selectIndex] = checkbox
    else delete newSelected[selectIndex]
    this.setState(
      { selected: newSelected },
      () => onFilter && onFilter(newSelected)
    )
  }

  renderGroup = ({ title, data = [] }, k) => {
    return (
      <View style={styles.filterColumn} key={k}>
        {title ? <Text style={styles.columnTitle}>{title}</Text> : null}
        {data.map((checkbox, i) => {
          const { label } = checkbox
          const { selected } = this.state
          const selectIndex = `${title}:${label}`
          const isActive = selected[selectIndex]
          return (
            <Checkbox
              key={i}
              index={i}
              active={isActive}
              data={{ ...checkbox, selectIndex }}
              onChange={this.handleSelect}
              label={label}
            />
          )
        })}
        {data.length == 0 ? <Text fontSize='micro'>{t('n/a')}</Text> : null}
      </View>
    )
  }

  render() {
    const { filterOptions = [] } = this.props
    const { selected } = this.state
    const hasFilter = Object.keys(selected).length
    return (
      <View style={styles.container}>
        <View style={styles.filterBase}>
          {filterOptions.map(this.renderGroup)}
        </View>
        <Collapsible collapsed={!hasFilter}>
          <ShellButton
            onPress={this.handleClearFilter}
            style={styles.clearButton}>
            <Text center style={styles.clearText}>
              {t('Clear All Filters')}
            </Text>
          </ShellButton>
        </Collapsible>
      </View>
    )
  }
}

function mapStateToProps(state, { type }) {
  const {
    sortedTagsSelector,
    sortedCharacterCategoriesSelector,
    sortedNoteCategoriesSelector
  } = selectors
  const { books, places, characters } = state
  const tags = sortedTagsSelector(state)
  const categories = sortedCharacterCategoriesSelector(state)
  const noteCategories = sortedNoteCategoriesSelector(state)
  const filterOptions = []
  const parseFilterOptions = (options) => {
    return options
      .filter(({ name, title }) => name || title)
      .map(({ id, name, title }) => ({ id, label: name || title }))
  }
  const parseFilterGroup = (groupName, options) => {
    return {
      title: groupName,
      data: parseFilterOptions(options)
    }
  }

  const chooseFilteredItems = (type) => {
    switch (type) {
      case 'characters':
        return state.ui.characterFilter
      case 'places':
        return state.ui.placeFilter
      case 'cards':
        return state.ui.timelineFilter
      case 'notes':
        return state.ui.noteFilter
      default:
        console.error(
          `Trying to get filter for unsuported filter type: ${type}`
        )
        return {}
    }
  }

  const chooseCustomAttributes = (type) => {
    switch (type) {
      case 'characters':
        return state.customAttributes.characters
      case 'places':
        return state.customAttributes.places
      case 'cards':
        return state.customAttributes.scenes
      case 'notes':
        return state.customAttributes.notes
      default:
        console.error(
          `Trying to get custom attributes unsuported type: ${type}`
        )
        return {}
    }
  }

  // const filteredItems = chooseFilteredItems(type)
  // const customAttributes = chooseCustomAttributes(type)

  const isNotes = type === 'notes'
  const isCharacters = type === 'characters'
  const isPlaces = type === 'places'
  const isCards = type === 'cards'

  const showCharacters = isCards || isNotes
  const showPlaces = isCards || isNotes
  const showCategory = isCharacters
  const showNoteCategory = isNotes
  const showBooks = isNotes || isCharacters || isPlaces
  const showTags = isCards || isNotes || isCharacters || isPlaces

  if (showCharacters)
    filterOptions.push(parseFilterGroup(t('Characters'), characters))
  if (showPlaces) filterOptions.push(parseFilterGroup(t('Places'), places))
  if (showCategory)
    filterOptions.push(parseFilterGroup(t('Categories'), categories))
  if (showNoteCategory)
    filterOptions.push(parseFilterGroup(t('Categories'), noteCategories))
  if (showBooks) filterOptions.push(parseFilterGroup(t('Books'), books))
  if (showTags) filterOptions.push(parseFilterGroup(t('Tags'), tags))

  return {
    // filteredItems,
    // customAttributes,
    filterOptions
  }
}

function mapDispatchToProps(dispatch, { type }) {
  const uiActions = bindActionCreators(actions.ui, dispatch)
  let updateFilter = (newFilter) => {
    console.error(
      `Trying to update filter to ${newFilter} for unsuported type: ${type}`
    )
  }
  switch (type) {
    case 'characters':
      updateFilter = uiActions.setCharacterFilter
      break
    case 'places':
      updateFilter = uiActions.setPlaceFilter
      break
    case 'cards':
      updateFilter = uiActions.setTimelineFilter
      break
    case 'notes':
      updateFilter = uiActions.setNoteFilter
      break
  }
  return {
    updateFilter
  }
}

HeaderFilter.propTypes = {
  onFilter: PropTypes.func,
  filterOptions: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilter)
