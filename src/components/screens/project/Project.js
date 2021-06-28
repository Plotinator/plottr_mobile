import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native'
import { View } from 'native-base'
import { newIds, actions } from 'pltr/v2'
import Toolbar from '../../shared/Toolbar'
import { t } from 'plottr_locales'
import {
  ScrollerView,
  Book,
  Text,
  Input,
  AddButton,
  Button
} from '../../shared/common'
import Collapsible from 'react-native-collapsible'
import styles from './ProjectStyles'
import { showAlert } from '../../shared/common/AlertDialog'
import BookModal from './BookModal'
import { Metrics } from '../../../utils'

const { objectId } = newIds
const { ifTablet } = Metrics

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

  handleSetNameInputRef = (ref) => (this.seriesName = ref)

  handleSetScrollerRef = (ref) => {
    this.scroller = ref
  }

  handleSetSubScrollerRef = (ref) => {
    this.subScroller = ref
  }

  handleToggleEdit = () => {
    this.setState({ editMode: true }, () => {
      setTimeout(() => this.seriesName && this.seriesName.focus())
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

    setTimeout(() => {
      // this.scroller.scrollToEnd()
      this.subScroller.scrollToEnd()
    })
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

  handleEditBook = (book) => {
    this.BookModal.editBook(book)
  }

  handleSaveBook = ({ id, imageId, title, premise, genre, theme }) => {
    const { actions } = this.props
    actions.editBook(id, { imageId, title, premise, genre, theme })
  }

  handleBookModalRef = (ref) => (this.BookModal = ref)

  navigateToTimeline = (id) => {
    this.props.uiActions.changeCurrentTimeline(id)
    this.props.navigation.navigate(ifTablet('Timeline', 'Outline'))
  }

  navigateToOutline = (id) => {
    this.props.uiActions.changeCurrentTimeline(id)
    this.props.navigation.navigate('Outline')
  }

  renderBooks() {
    const { books, images } = this.props
    if (!books.allIds) return null
    return books.allIds.map((id) => {
      const book = books[`${id}`]
      const { imageId } = book
      const bookImage = imageId &&
        images[imageId] && { uri: images[imageId].data }

      return (
        <Book
          editable
          noTimeline
          key={id}
          book={book}
          image={bookImage}
          navigateToOutline={this.navigateToOutline}
          navigateToTimeline={this.navigateToTimeline}
          navigateToDetails={this.handleEditBook}
          onDeleteBook={this.handleDeleteBook}
          style={styles.book}></Book>
      )
    })
  }

  render() {
    const { series, changes, editMode } = this.state
    const { openDrawer, images } = this.props
    const isEditing = editMode === true
    return (
      <View style={styles.container}>
        <Toolbar onPressDrawer={openDrawer} />
        <ScrollerView
          scrollerProps={{
            ref: this.handleSetSubScrollerRef
          }}>
          <View style={styles.labelContainer}>
            <View style={styles.labelProject}>
              <Text style={styles.labelText}>Series</Text>
            </View>
            <AddButton
              icon='pen'
              duration={300}
              animated
              animation={isEditing ? 'zoomOut' : 'zoomIn'}
              onPress={this.handleToggleEdit}
            />
          </View>
          <View style={styles.seriesContainer}>
            <Input
              reset
              multiline
              ref={this.handleSetNameInputRef}
              editable={isEditing}
              value={series.name}
              onChangeText={this.handleSeriesName}
              autoCapitalize='words'
              numberOfLines={1}
              inputStyle={styles.seriesName}
              placeholder={t('Name')}
            />
            {!series.premise && !isEditing ? null : (
              <Input
                reset
                multiline
                editable={isEditing}
                value={series.premise}
                onChangeText={this.handleSeriesPremise}
                autoCapitalize='sentences'
                numberOfLines={1}
                inputStyle={styles.seriesDescription}
                placeholder={t('Premise')}
              />
            )}
            {!series.genre && !isEditing ? null : (
              <Input
                reset
                multiline
                editable={isEditing}
                value={series.genre}
                onChangeText={this.handleSeriesGenre}
                autoCapitalize='words'
                numberOfLines={1}
                inputStyle={styles.seriesGenre}
                placeholder={t('Genre')}
              />
            )}
            {!series.theme && !isEditing ? null : (
              <Input
                reset
                multiline
                editable={isEditing}
                value={series.theme}
                onChangeText={this.handleSeriesTheme}
                autoCapitalize='sentences'
                numberOfLines={1}
                inputStyle={styles.seriesTheme}
                placeholder={t('Theme')}
              />
            )}
          </View>
          <Collapsible collapsed={!isEditing}>
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
            <View style={styles.booksList}>
              {/*<TouchableWithoutFeedback>
              <React.Fragment>*/}
              {this.renderBooks()}
              {/*</React.Fragment>
            </TouchableWithoutFeedback>*/}
            </View>
          </View>
        </ScrollerView>
        <BookModal
          ref={this.handleBookModalRef}
          onSaveBook={this.handleSaveBook}
          images={images}
        />
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
    images: state.images,
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
