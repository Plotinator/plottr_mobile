import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { View } from 'native-base'
import { newIds, actions } from 'pltr/v2'
import Toolbar from '../shared/Toolbar'
import { t } from 'plottr_locales'
import { Text, Input, AddButton, Button } from '../../shared/common'
import Book from '../../shared/project/Book'
import Collapsible from 'react-native-collapsible'
import styles from './ProjectStyles'
import { showAlert } from '../../shared/common/AlertDialog'

const { objectId } = newIds

class Project extends Component {
  state = {
    editMode: false
  }

  static getDerivedStateFromProps(props, state) {
    if (state.changes) {
      return { series: state.series, changes: true }
    } else {
      return { series: props.series, changes: false }
    }
  }

  handleSetNameInputRef = ref => this.seriesName = ref
  handleSetScrollerRef = ref => this.scroller = ref

  handleToggleEdit = () => {
    this.setState({ editMode: true }, () => {
      setTimeout(
        () => this.seriesName && this.seriesName.focus()
      )
    })
  }

  handleSeriesName = (name) => {
    const { series } = this.state
    this.setState({
      series: { ...series, name },
      changes: true
    })
  }

  handleSeriesPremise = (text) => {
    const { series } = this.state
    this.setState({
      series: { ...series, premise: text },
      changes: true
    })
  }

  handleSeriesGenre = (text) => {
    const { series } = this.state
    this.setState({
      series: { ...series, genre: text },
      changes: true
    })
  }

  handleSeriesTheme = (text) => {
    const { series } = this.state
    this.setState({
      series: { ...series, theme: text },
      changes: true
    })
  }

  handleSaveChanges = () => {
    const { series } = this.state
    this.props.seriesActions.editSeries({ ...series })
    this.setState({ changes: false, editMode: false })
  }

  handleCancelChanges = () => {
    const { series } = this.props
    this.setState({ changes: false, editMode: false, series })
  }

  handleAddNewBook = () => {
    const { actions, books, lineActions, beatActions } = this.props
    const newBookId = objectId(books.allIds)
    actions.addBook()
    // add a plotline
    lineActions.addLineWithTitle(t('Main Plot'), newBookId)
    // add a beat
    beatActions.addBeat(newBookId)

    this.scroller.scrollToEnd()
  }

  handleDeleteBook = (id, title) => {
    const { actions } = this.props
    showAlert({
      title: t('Delete Book'),
      message: t('Delete Book {name}?', { name: title }),
      actions: [
        {
          positive: true,
          name: t('Delete Book'),
          callback: () => {
            actions.deleteBook(id)
          }
        },
        {
          name: t('Cancel')
        }
      ]
    })
  }

  openEditModal = (id) => {
    this.props.navigation.push('SeriesDetails', { id })
  }

  navigateToTimeline = (id) => {
    this.props.uiActions.changeCurrentTimeline(id)
    this.props.navigation.navigate('Timeline')
  }

  navigateToOutline = (id) => {
    this.props.uiActions.changeCurrentTimeline(id)
    this.props.navigation.navigate('Outline')
  }

  renderBooks() {
    const { books } = this.props
    if (!books.allIds) return null

    return books.allIds.map((id) => {
      return (
        <Book
          editable
          noTimeline
          key={id}
          book={books[`${id}`]}
          navigateToOutline={this.navigateToOutline}
          navigateToTimeline={this.navigateToTimeline}
          navigateToDetails={this.openEditModal}
          onDeleteBook={this.handleDeleteBook}
          style={styles.book}
        />
      )
    })
  }

  render() {
    const { series, changes, editMode } = this.state
    const { openDrawer } = this.props
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer} />
        <View style={styles.labelContainer}>
          <View style={styles.labelProject}>
            <Text style={styles.labelText}>Series</Text>
          </View>
          <AddButton
            icon='pen'
            duration={300}
            animated
            animation={editMode ? 'zoomOut' : 'zoomIn'}
            onPress={this.handleToggleEdit} />
        </View>
        <View style={styles.seriesContainer}>
          <Input
            reset
            multiline
            ref={this.handleSetNameInputRef}
            editable={editMode === true}
            value={series.name}
            onChangeText={this.handleSeriesName}
            autoCapitalize='words'
            numberOfLines={4}
            inputStyle={styles.seriesName}
          />
          {!series.premise ? null : (
            <Input
              reset
              multiline
              editable={editMode === true}
              value={series.premise}
              onChangeText={this.handleSeriesPremise}
              autoCapitalize='words'
              numberOfLines={4}
              inputStyle={styles.seriesDescription}
            />
          )}
          {!series.theme ? null : (
            <Input
              reset
              multiline
              editable={editMode === true}
              value={series.theme}
              onChangeText={this.handleSeriesTheme}
              autoCapitalize='words'
              numberOfLines={4}
              inputStyle={styles.seriesTheme}
            />
          )}
          {!series.genre ? null : (
            <Input
              reset
              multiline
              editable={editMode === true}
              value={series.genre}
              onChangeText={this.handleSeriesGenre}
              autoCapitalize='words'
              numberOfLines={4}
              inputStyle={styles.seriesGenre}
            />
          )}
        </View>
        <Collapsible collapsed={!editMode}>
          <View style={styles.buttonContainer}>
            <Button
              small
              disabled={!changes}
              onPress={this.handleSaveChanges}
              style={styles.saveButton}>
              {t('Save')}
            </Button>
            <Button
              small
              bordered
              onPress={this.handleCancelChanges}
              style={styles.saveButton}>
              {t('Cancel')}
            </Button>
          </View>
        </Collapsible>
        <View style={styles.labelContainer}>
          <View style={styles.labelProject}>
            <Text style={styles.labelText}>{t('Books')}</Text>
          </View>
          <AddButton onPress={this.handleAddNewBook} />
        </View>
        <View style={styles.booksContainer}>
          <ScrollView
            ref={this.handleSetScrollerRef}
            contentContainerStyle={styles.booksList}>
            <TouchableWithoutFeedback>
              <React.Fragment>{this.renderBooks()}</React.Fragment>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    )
  }
}

Project.propTypes = {
  series: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  seriesActions: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired,
  closeFile: PropTypes.func
}

function mapStateToProps(state) {
  return {
    series: state.series,
    books: state.books
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.book, dispatch),
    lineActions: bindActionCreators(actions.line, dispatch),
    beatActions: bindActionCreators(actions.beat, dispatch),
    seriesActions: bindActionCreators(actions.series, dispatch),
    uiActions: bindActionCreators(actions.ui, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
