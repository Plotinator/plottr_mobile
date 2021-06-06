import { sortBy } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { t } from 'plottr_locales'
import cx from 'classnames'
import { selectors, actions, newIds } from 'pltr/v2'
import { View, H3, Button, H1, Icon, Content } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Toolbar from '../shared/Toolbar'
import Note from './Note'
import NewButton from '../../ui/NewButton'
import { askToDelete } from '../../../utils/delete'
import DrawerButton from '../../ui/DrawerButton'
import SideButton from '../shared/SideButton'
import {
  Text,
  MainList,
  HeaderFilter,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import styles from './NotesStyles'

class Notes extends Component {
  state = {
    activeNoteId: null,
    filter: null,
    viewableNotes: []
  }

  static getDerivedStateFromProps(props, state) {
    let returnVal = { ...state }
    const { notes } = props
    const viewableNotes = Notes.viewableNotes(notes, state.filter)
    returnVal.viewableNotes = viewableNotes
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
  static staticFilterIsEmpty(filter) {
    return (
      filter == null ||
      (filter['tag'].length === 0 &&
        filter['character'].length === 0 &&
        filter['place'].length === 0 &&
        filter['book'].length === 0)
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

  handleSelectNote = ({ id }) => {
    this.setState({ activeNoteId: id })
  }

  handleAddNote = () => {
    const id = newIds.nextId(this.props.notes)
    this.props.actions.addNote()
    this.setState({ activeNoteId: id })
  }

  handleDeleteNote = (note) => {
    askToDelete(note.title || t('New Note'), () =>
      this.props.actions.deleteNote(note.id)
    )
  }

  renderNoteItem = ({ item }) => {
    const isActive = item.id == this.state.activeNoteId
    const { images = [] } = this.props
    const foundImage = images[item.imageId]
    return (
      <SideButton
        onPress={() => this.setState({ activeNoteId: item.id })}
        onDelete={() => this.deleteNote(item)}
        image={foundImage && foundImage.data}
        title={item.title || t('New Note')}
        isActive={isActive}
      />
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
          note={{ ...note, image }}
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
          <NewButton onPress={this.createNewNote} />
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
            />
          </Col>
          <Col size={10}>{this.renderNoteDetail()}</Col>
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
  ui: PropTypes.object.isRequired,
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
