import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'native-base'
import { selectors, actions, helpers, initialState } from 'pltr/v2'
import {
  View,
  ImageBackground,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import { t } from 'plottr_locales'
import {
  Input,
  Text,
  Button,
  AddButton,
  IconButton,
  RichEditor,
  ShellButton,
  Attachments,
  ImagesModal
} from '../../shared/common'
import styles from './BookModalStyles'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import Collapsible from 'react-native-collapsible'
import Book from '../../shared/project/Book'
import * as Animatable from 'react-native-animatable'

const AnimeTouchableNoFeedback = Animatable.createAnimatableComponent(
  TouchableWithoutFeedback
)

export default class BookModal extends Component {
  state = {
    changes: false,
    visible: false,
    id: null,
    title: '',
    premise: '',
    genre: '',
    theme: ''
  }

  setChangeValue (stateName, callback) {
    if (!this.functs) this.functs = {}
    if (!this.functs[stateName]) {
      this.functs[stateName] = (textValue) => {
        const state = { changes: true }
        state[stateName] = textValue
        this.setState(state)
        callback && callback(textValue)
      }
    }
    return this.functs[stateName]
  }

  editBook = ({ id, imageId, title, premise, genre, theme }) => {
    this.setState({
      id,
      imageId,
      title,
      premise,
      genre,
      theme,
      visible: true,
      showImageModal: false
    })
  }

  handleToggleImageModal = () =>
    this.setState({ showImageModal: !this.state.showImageModal })

  handleChangeImage = () => {
    this.handleToggleImageModal()
  }

  handleChooseImage = (imageId) => {
    this.setState({
      imageId,
      changes: true,
      showImageModal: false
    })
  }

  handleClose = () => {
    const { onCloseBook } = this.props
    onCloseBook && onCloseBook()
    this.setState({ visible: false, changes: false })
  }

  handleSaveChanges = () => {
    const { onSaveBook } = this.props
    const { id, imageId, title, premise, genre, theme } = this.state
    onSaveBook && onSaveBook({ id, imageId, title, premise, genre, theme })
    this.setState({ visible: false, changes: false })
  }

  render () {
    const {
      showImageModal,
      changes,
      visible,
      id,
      imageId,
      title,
      premise,
      genre,
      theme
    } = this.state
    const { book, images } = this.props
    const bookImage = imageId &&
      images[imageId] && { uri: images[imageId].data }
    return (
      <Modal
        visible={visible}
        animationType='fade'
        transparent={true}
        onDismiss={this.handleClose}
        onRequestClose={this.handleClose}>
        <AnimeTouchableNoFeedback onPress={this.handleClose}>
          <KeyboardAvoidingView behavior='padding' style={styles.avoidingView}>
          <View style={styles.window}>
            <ShellButton style={styles.closeButton} onPress={this.handleClose}>
              <Icon style={styles.closeIcon} type='FontAwesome5' name='times' />
            </ShellButton>
            <ScrollView>
              <View style={styles.form}>
                <View style={styles.centerTitle}>
                  <Text fontStyle='bold'>
                    {t('Edit Book')}: {title}
                  </Text>
                </View>
                <View style={styles.bookContainer}>
                  <Book
                    book={{ id, title }}
                    image={bookImage}
                    noTimeline
                    noOutline
                    onPress={this.handleChangeImage}>
                    <View style={styles.cameraContainer}>
                      <AddButton
                        icon='camera'
                        size={40}
                        onPress={this.handleChangeImage}
                        style={styles.cameraButton}
                      />
                    </View>
                  </Book>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>{t('Title')}</Text>
                  <Input
                    inset
                    value={title}
                    style={styles.input}
                    inputStyle={styles.inputText}
                    onChangeText={this.setChangeValue('title')}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>{t('Premise')}</Text>
                  <Input
                    inset
                    value={premise}
                    style={styles.input}
                    inputStyle={styles.inputText}
                    onChangeText={this.setChangeValue('premise')}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>{t('Genre')}</Text>
                  <Input
                    inset
                    value={genre}
                    style={styles.input}
                    inputStyle={styles.inputText}
                    onChangeText={this.setChangeValue('genre')}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>{t('Theme')}</Text>
                  <Input
                    inset
                    value={theme}
                    style={styles.input}
                    inputStyle={styles.inputText}
                    onChangeText={this.setChangeValue('theme')}
                  />
                </View>
              </View>
            </ScrollView>
            <Collapsible style={styles.actions} collapsed={!changes}>
              <Button
                tight
                style={styles.action}
                onPress={this.handleSaveChanges}>
                {t('Save Book')}
              </Button>
            </Collapsible>
            <ImagesModal
              visible={showImageModal}
              onChooseImage={this.handleChooseImage}
              onClose={this.handleToggleImageModal}
            />
          </View>
        </KeyboardAvoidingView>
        </AnimeTouchableNoFeedback>
      </Modal>
    )
  }
}

BookModal.propTypes = {
  onSaveBook: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired
}
