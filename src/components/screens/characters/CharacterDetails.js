import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortBy } from 'lodash'
import { selectors, actions } from 'pltr/v2'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Character from './Character'
import styles from './CharactersStyles'
import Toolbar from '../../shared/Toolbar'
import PropTypes from 'react-proptypes'
import {
  Text,
  BackButton,
  IconButton,
  ShellButton,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import { t } from 'plottr_locales'

class CharacterDetails extends Component {
  saveCharacter = (id, attributes) => {
    this.props.actions.editCharacter(id, attributes)
  }

  render() {
    const { navigation, route, selectedCharacter, openDrawer } = this.props
    console.log('route', route)
    const character = selectedCharacter || (route && route.params.character)
    if (!character) return null
    const { images = [], customAttributes, categories } = this.props
    const image = images[character.imageId]

    return (
      <SafeAreaView style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
            <Toolbar onPressDrawer={openDrawer}>
              <BackButton onPress={navigation.goBack} />
              <View style={styles.additionals}>
                <HeaderButtonOptions title={t('Categories')} icon={'list'}>
                  <HeaderAttributes type={'characterCategories'} />
                </HeaderButtonOptions>
                <HeaderButtonOptions
                  title={t('Attributes')}
                  button={<AttributesButton />}>
                  <HeaderAttributes type={'characters'} />
                </HeaderButtonOptions>
              </View>
            </Toolbar>
            <Character
              key={character.id}
              character={{ ...character, image }}
              onSave={this.saveCharacter}
              categories={categories}
              navigation={navigation}
              customAttributes={customAttributes}
            />
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    )
  }
}

CharacterDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  customAttributes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images || [],
    characters: state.characters,
    categories: selectors.characterCategoriesSelector(state), //selectors.sortedCharacterCategoriesSelector(state),
    customAttributes: state.customAttributes.characters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.character, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails)
