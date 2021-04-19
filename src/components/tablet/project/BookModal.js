import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Icon } from 'native-base'
import { selectors, actions, helpers, initialState } from 'pltr/v2'
import { Modal, ScrollView, KeyboardAvoidingView } from 'react-native'
import { t } from 'plottr_locales'
import {
  Input,
  Text,
  Button,
  RichEditor,
  ShellButton,
  Attachments
} from '../../shared/common'
import styles from './BookModalStyles'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import Collapsible from 'react-native-collapsible'

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
      this.functs[stateName] = textValue => {
        const state = { changes: true }
        state[stateName] = textValue
        this.setState(state)
        callback && callback(textValue)
      }
    }
    return this.functs[stateName]
  }

  editBook = ({ id, title, premise, genre, theme }) => {
    this.setState({
      id,
      title,
      premise,
      genre,
      theme,
      visible: true
    })
  }

  handleClose = () => {
    const { onCloseBook } = this.props
    onCloseBook && onCloseBook()
    this.setState({ visible: false, changes: false })
  }

  handleSaveChanges = () => {
    const { onSaveBook } = this.props
    const { id, title, premise, genre, theme } = this.state
    onSaveBook && onSaveBook({ id, title, premise, genre, theme })
    this.setState({ visible: false, changes: false })
  }

  render () {
    const {
      changes,
      visible,
      title,
      premise,
      genre,
      theme
    } = this.state
    const { book } = this.props
    return (
      <Modal
        visible={visible}
        animationType='fade'
        transparent={true}
        onDismiss={this.handleClose}
        onRequestClose={this.handleClose}>
        <KeyboardAvoidingView behavior='padding' style={styles.avoidingView}>
          <View style={styles.window}>
            <ShellButton style={styles.closeButton} onPress={this.handleClose}>
              <Icon style={styles.closeIcon} type='FontAwesome5' name='times' />
            </ShellButton>
            <ScrollView>
              <View style={styles.form}>
                <View style={styles.centerTitle}>
                  <Text fontStyle='bold'>
                    {t('Edit Book')}
                  </Text>
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
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}

BookModal.propTypes = {
  onSaveBook: PropTypes.func.isRequired
}
