import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import t from 'format-message'
import { Container, Content, Form, View } from 'native-base'
import { actions, selectors, initialState } from 'pltr/v2'
import { StyleSheet, Platform } from 'react-native'
import SaveButton from '../../ui/SaveButton'
import AttachmentList from '../../shared/attachments/AttachmentList'
import RichTextEditor from '../../shared/RichTextEditor'
import DetailsScrollView from '../shared/DetailsScrollView'
import {
  checkForChanges,
  addLeaveListener,
  removeLeaveListener
} from '../../../utils/Changes'
import { Text, Input } from '../../shared/common'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'

class NoteDetails extends Component {
  state = {}
  static getDerivedStateFromProps (props, state) {
    const { route, notes } = props
    const { isNewNote, note } = route.params
    return {
      isNewNote: state.isNewNote || isNewNote,
      note: state.note || (isNewNote ? cloneDeep(initialState.note) : notes.find(n => n.id == note.id)),
      changes: state.changes || isNewNote,
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    this.setSaveButton()
    addLeaveListener(navigation, this.checkChanges)
  }

  componentWillUnmount () {
    const { navigation } = this.props
    removeLeaveListener(navigation, this.checkChanges)
  }

  componentDidUpdate () {
    this.setSaveButton()
  }

  setSaveButton = () => {
    this.props.navigation.setOptions({
      headerRight: () => <SaveButton changes={this.state.changes} onPress={this.saveChanges} />
    })
  }

  checkChanges = (event) => {
    const { changes } = this.state
    const { navigation } = this.props
    checkForChanges(event, changes, this.saveChanges, navigation)
  }

  saveChanges = () => {
    const { changes, isNewNote, note } = this.state
    if (!changes) return
    if (isNewNote) {
      this.props.actions.addNoteWithValues(note.title, note.content)
      this.props.navigation.setParams({isNewNote: false})
    } else {
      this.props.actions.editNote(note.id, note)
    }
    this.setState({isNewNote: false, changes: false})
  }

  renderAttachments () {
    const { note, isNewNote } = this.state
    if (isNewNote) return null

    return <AttachmentList
      itemType='note'
      item={note}
      navigate={this.props.navigation.navigate}
      books
    />
  }

  render () {
    const { note } = this.state
    return <DetailsScrollView>
      <View inlineLabel last regular style={styles.label}>
        <Input
          inset
          label={`${t('Title')}:`}
          value={note.title}
          onChangeText={text => this.setState({note: {...note, title: text}, changes: true})}
          autoCapitalize='sentences'
        />
    </View>
      { this.renderAttachments() }
      <View style={[styles.afterList, styles.rceView]}>
        <Text fontStyle='semiBold'>{t('Content')}</Text>
        <RichTextEditor
          initialValue={note.content}
          onChange={val => this.setState({note: {...note, content: val}, changes: true}) }
          maxHeight={5000}
        />
      </View>
    </DetailsScrollView>
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 16,
  },
  afterList: {
    marginTop: 16,
  },
  badge: {
    marginRight: 8,
  },
  rceView: {
    flex: 1,
  },
})

NoteDetails.propTypes = {
  characters: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    tags: selectors.sortedTagsSelector(state),
    characters: selectors.charactersSortedAtoZSelector(state),
    places: selectors.placesSortedAtoZSelector(state),
    notes: state.notes,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.noteActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails)
