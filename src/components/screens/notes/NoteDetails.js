import { sortBy } from 'lodash'
import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectors, actions } from 'pltr/v2'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Note from './Note'
import styles from './NotesStyles'
import Toolbar from '../../shared/Toolbar'
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

class NoteDetails extends Component {
  saveNote = (id, attributes) => {
    this.props.actions.editNote(id, attributes)
  }

  render() {
    const { navigation, route, selectedNote, openDrawer } = this.props
    console.log('route', route)
    const note = selectedNote || (route && route.params.note)
    if (!note) return null
    const { images = [], customAttributes } = this.props
    const image = images[note.imageId]

    return (
      <SafeAreaView style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
            <Toolbar onPressDrawer={openDrawer}>
              <BackButton onPress={navigation.goBack} />
              <View style={styles.additionals}>
                <HeaderButtonOptions
                  title={t('Attributes')}
                  button={<AttributesButton />}>
                  <HeaderAttributes type={'notes'} />
                </HeaderButtonOptions>
              </View>
            </Toolbar>
            <Note
              key={note.id}
              note={{ ...note, image }}
              onSave={this.saveNote}
              navigation={navigation}
              customAttributes={customAttributes}
            />
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    )
  }
}

NoteDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  ui: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images,
    characters: state.characters,
    places: state.places,
    tags: state.tags,
    customAttributes: state.customAttributes.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.note, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)
