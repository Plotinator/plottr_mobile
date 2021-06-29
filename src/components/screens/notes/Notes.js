import { sortBy } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { t } from 'plottr_locales'
import { selectors, actions, newIds } from 'pltr/v2'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Toolbar from '../../shared/Toolbar'
import NewButton from '../../ui/NewButton'
import { askToDelete } from '../../../utils/delete'
import {
  Text,
  MainList,
  HeaderFilter,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import styles from './NotesStyles'
import { Metrics } from '../../../utils'
import { Col, Grid } from 'react-native-easy-grid'
import Note from './Note'

const { IS_TABLET, ifTablet } = Metrics

class Notes extends Component {
  state = {
    activeNoteId: null,
    viewableNotes: []
  }

  static getDerivedStateFromProps(props, state) {
    let returnVal = { ...state }
    const { notes, filters } = props
    const { tag = [], character = [], place = [], book = [] } = filters || {}
    const viewableNotes = Notes.viewableNotes(notes, {
      tag,
      character,
      place,
      book
    })
    returnVal.viewableNotes = viewableNotes
    if (IS_TABLET)
      returnVal.activeNoteId = Notes.findActiveNote(
        viewableNotes,
        state.activeNoteId
      )

    return returnVal
  }

  static viewableNotes(notes, filter) {
    const filterIsEmpty = Notes.staticFilterIsEmpty(filter)
    let viewableNotes = notes
    if (!filterIsEmpty) {
      viewableNotes = notes.filter((n) => Notes.isViewable(filter, n))
    }
    let sortedNotes = sortBy(viewableNotes, ['lastEdited'])
    sortedNotes.reverse()
    return sortedNotes
  }

  static findActiveNote(notes, activeNoteId) {
    if (notes.length == 0) return null

    let newId = notes[0].id

    // check for the currently active one
    if (activeNoteId != null) {
      let existingNote = notes.find((n) => n.id === activeNoteId)
      if (existingNote) newId = existingNote.id
    }

    return newId
  }

  // this is a hack for now
  static staticFilterIsEmpty(filters) {
    const { tag, character, place, book } = filters
    return (
      tag.length === 0 &&
      character.length === 0 &&
      place.length === 0 &&
      book.length === 0
    )
  }

  static isViewable(filter, note) {
    if (!note) return false
    let visible = false
    if (note.tags) {
      if (filter['tag'].some((tId) => note.tags.includes(tId))) visible = true
    }
    if (note.characters) {
      if (filter['character'].some((cId) => note.characters.includes(cId)))
        visible = true
    }
    if (note.places) {
      if (filter['place'].some((pId) => note.places.includes(pId)))
        visible = true
    }
    if (note.bookIds) {
      if (filter['book'].some((bookId) => note.bookIds.includes(bookId)))
        visible = true
      // if the filter includes books, and this note has no bookIds,
      // it's considered in all books, so it should be visible
      if (filter['book'].length && !note.bookIds.length) visible = true
    }
    return visible
  }

  createNewNote = () => {
    const id = newIds.nextId(this.props.notes)
    this.props.actions.addNote()
    this.setState({ activeNoteId: id })
  }

  saveNote = (id, attributes) => {
    this.props.actions.editNote(id, attributes)
  }

  handleSelectNote = (note) => {
    const { id } = note
    if (IS_TABLET) this.setState({ activeNoteId: id })
    else this.props.navigation.navigate('NoteDetails', { note })
  }

  handleAddNote = () => {
    const { notes, actions, navigation } = this.props
    const id = newIds.nextId(notes)
    actions.addNote()
    if (IS_TABLET) this.setState({ activeNoteId: id })
    else {
      setTimeout(() => {
        const note = this.props.notes.find((note) => note.id == id)
        navigation.navigate('NoteDetails', { note })
      }, 100)
    }
  }

  handleDeleteNote = (note) => {
    askToDelete(note.title || t('New Note'), () =>
      this.props.actions.deleteNote(note.id)
    )
  }

  renderNoteDetail() {
    let note = this.props.notes.find(
      (note) => note.id == this.state.activeNoteId
    )
    if (!note) return null
    const { images = [], customAttributes } = this.props
    const image = images[note.imageId]

    return (
      <ErrorBoundary>
        <Note
          key={note.id}
          note={note}
          onSave={this.saveNote}
          navigation={this.props.navigation}
          customAttributes={customAttributes}
        />
      </ErrorBoundary>
    )
  }

  render() {
    const { activeNoteId, viewableNotes } = this.state
    const { openDrawer, filters } = this.props
    const filterCount = Object.values(filters || {}).map(
      (filter) => filter.length
    )
    const count = filterCount.length ? filterCount.reduce((a, b) => a + b) : 0
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer}>
          {IS_TABLET && <NewButton onPress={this.createNewNote} />}
          <View style={styles.additionals}>
            <HeaderButtonOptions
              title={t('Filter')}
              icon='filter'
              count={count}>
              <HeaderFilter filters={filters} type='notes' />
            </HeaderButtonOptions>
            <HeaderButtonOptions
              title={t('Attributes')}
              button={<AttributesButton />}>
              <HeaderAttributes type={'notes'} />
            </HeaderButtonOptions>
          </View>
        </Toolbar>
        <Grid style={styles.grid}>
          <Col size={5}>
            <MainList
              list={viewableNotes}
              title={t('Notes')}
              type={t('Note')}
              activeKey='id'
              activeValue={activeNoteId}
              onPressItem={this.handleSelectNote}
              onPressAdd={this.handleAddNote}
              onPressDelete={this.handleDeleteNote}
              rightIcon={'trash'}
              onPressRight={!IS_TABLET && this.handleDeleteNote}
            />
          </Col>
          {IS_TABLET && <Col size={10}>{this.renderNoteDetail()}</Col>}
        </Grid>
      </View>
    )
  }
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images,
    notes: selectors.allNotesSelector(state),
    characters: state.characters,
    places: state.places,
    tags: state.tags,
    filters: state.ui.noteFilter || {},
    customAttributes: state.customAttributes.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.note, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
