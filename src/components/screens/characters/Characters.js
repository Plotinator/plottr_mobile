import { sortBy } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Image,
  StyleSheet,
  SectionList,
  TouchableOpacity
} from 'react-native'
import { t } from 'plottr_locales'
import cx from 'classnames'
import { selectors, actions, newIds } from 'pltr/v2'
import { Col, Grid } from 'react-native-easy-grid'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Toolbar from '../../shared/Toolbar'
import Character from './Character'
import NewButton from '../../ui/NewButton'
import { askToDelete } from '../../../utils/delete'
import DrawerButton from '../../ui/DrawerButton'
import {
  Text,
  MainList,
  HeaderFilter,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import styles from './CharactersStyles'
import { Metrics } from '../../../utils'

const { IS_TABLET } = Metrics

class Characters extends Component {
  state = {
    activeCharacterId: null,
    data: []
  }

  static getDerivedStateFromProps(props, state) {
    let returnVal = { ...state }
    const { visibleCharactersByCategory, characters, categories } = props

    if (IS_TABLET) {
      returnVal.activeCharacterId = Characters.findActiveCharacter(
        visibleCharactersByCategory,
        characters,
        categories,
        state.activeCharacterId
      )
    }

    let allCategories = [...categories]
    allCategories.push({ id: null, name: t('Uncategorized') })
    returnVal.data = allCategories.map((cat) => {
      let characters = []
      if (props.visibleCharactersByCategory[`${cat.id}`]) {
        characters = props.visibleCharactersByCategory[`${cat.id}`]
      }
      return {
        id: cat.id,
        title: cat.name,
        data: sortBy(characters, 'id')
      }
    })
    return returnVal
  }

  static findActiveCharacter(
    charactersByCategory,
    characters,
    categories,
    activeCharacterId
  ) {
    if (!characters.length) return null
    if (!Object.keys(charactersByCategory).length) return null
    const allCategories = [...categories, { id: null }] // uncategorized

    // check for the currently active one
    if (activeCharacterId != null) {
      const isVisible = allCategories.some((cat) => {
        if (
          !charactersByCategory[cat.id] ||
          !charactersByCategory[cat.id].length
        )
          return false
        return charactersByCategory[cat.id].some(
          (ch) => ch.id == activeCharacterId
        )
      })
      if (isVisible) return activeCharacterId
    }

    // default to first one in the first category
    const firstCategoryWithChar = allCategories.find(
      (cat) =>
        charactersByCategory[cat.id] && charactersByCategory[cat.id].length
    )
    if (firstCategoryWithChar)
      return (
        charactersByCategory[firstCategoryWithChar.id][0] &&
        charactersByCategory[firstCategoryWithChar.id][0].id
      )

    return null
  }

  createNewCharacter = () => {
    const id = newIds.nextId(this.props.characters)
    this.props.actions.addCharacter()
    this.setState({ activeCharacterId: id })
  }

  saveCharacter = (id, attributes) => {
    this.props.actions.editCharacter(id, attributes)
  }

  handleAddCharacter = ({ id: categoryId }) => {
    const { navigation, actions, characters } = this.props
    const id = newIds.nextId(characters)
    if (categoryId) {
      actions.addCharacterWithValues({
        categoryId
      })
    } else {
      actions.addCharacter()
    }
    if (IS_TABLET) this.setState({ activeCharacterId: id })
    else {
      setTimeout(() => {
        const character = this.props.characters.find(
          (character) => character.id == id
        )
        navigation.navigate('CharacterDetails', { character })
      }, 100)
    }
  }

  handleDeleteCharacter = (character) => {
    askToDelete(character.name || t('New Character'), () => {
      const { data } = this.state
      this.setState({ activeCharacterId: data[0] })
      this.props.actions.deleteCharacter(character.id)
    })
  }

  handleSelectCharacter = (character) => {
    const { navigation } = this.props
    if (IS_TABLET) this.setState({ activeCharacterId: character.id })
    else navigation.navigate('CharacterDetails', { character })
  }

  renderCharacterDetail() {
    const {
      characters,
      customAttributes,
      categories,
      navigation,
      images = []
    } = this.props
    let character = characters.find(
      (char) => char.id == this.state.activeCharacterId
    )
    if (!character) return null
    const image = images[character.imageId]
    return (
      <ErrorBoundary>
        <Character
          key={character.id}
          character={{ ...character, image }}
          customAttributes={customAttributes}
          categories={categories}
          onSave={this.saveCharacter}
          navigation={navigation}
        />
      </ErrorBoundary>
    )
  }

  render() {
    const { openDrawer, filters } = this.props
    const filterCount = Object.values(filters || {}).map(
      (filter) => filter.length
    )
    const count = filterCount.length ? filterCount.reduce((a, b) => a + b) : 0
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          {IS_TABLET && <NewButton onPress={this.createNewCharacter} />}
          <View style={styles.additionals}>
            {IS_TABLET && (
              <HeaderButtonOptions title={t('Categories')} icon={'list'}>
                <HeaderAttributes type={'characterCategories'} />
              </HeaderButtonOptions>
            )}
            <HeaderButtonOptions
              title={t('Filter')}
              icon='filter'
              count={count}>
              <HeaderFilter filters={filters} type='characters' />
            </HeaderButtonOptions>
            <HeaderButtonOptions
              title={t('Attributes')}
              button={<AttributesButton />}>
              <HeaderAttributes type={'characters'} />
            </HeaderButtonOptions>
          </View>
        </Toolbar>
        <Grid style={styles.grid}>
          <Col size={5}>
            {!IS_TABLET && (
              <View style={styles.floatingCategories}>
                <HeaderButtonOptions title={t('Categories')} icon={'list'}>
                  <HeaderAttributes type={'characterCategories'} />
                </HeaderButtonOptions>
              </View>
            )}
            <MainList
              isGroup
              list={this.state.data}
              title={t('Characters')}
              type={t('Character')}
              activeKey='id'
              activeValue={this.state.activeCharacterId}
              onPressItem={this.handleSelectCharacter}
              onPressAdd={this.handleAddCharacter}
              onPressDelete={this.handleDeleteCharacter}
              rightIcon={'trash'}
              onPressRight={!IS_TABLET && this.handleDeleteCharacter}
            />
          </Col>
          {IS_TABLET && <Col size={10}>{this.renderCharacterDetail()}</Col>}
        </Grid>
      </View>
    )
  }
}

Characters.propTypes = {
  visibleCharactersByCategory: PropTypes.object.isRequired,
  filterIsEmpty: PropTypes.bool.isRequired,
  characters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  customAttributes: PropTypes.array.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  customAttributeActions: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images || [],
    visibleCharactersByCategory: selectors.visibleSortedCharactersByCategorySelector(
      state
    ),
    filterIsEmpty: selectors.characterFilterIsEmptySelector(state),
    characters: state.characters,
    categories: selectors.characterCategoriesSelector(state), //selectors.sortedCharacterCategoriesSelector(state),
    customAttributes: state.customAttributes.characters,
    ui: state.ui,
    filters: state.ui.characterFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.character, dispatch),
    customAttributeActions: bindActionCreators(
      actions.customAttribute,
      dispatch
    ),
    uiActions: bindActionCreators(actions.ui, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
