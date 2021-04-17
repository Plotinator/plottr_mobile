import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import { t } from 'plottr_locales'
import { cloneDeep } from 'lodash'
import { selectors, actions, newIds } from 'pltr/v2'
import Toolbar from '../shared/Toolbar'
import NewButton from '../../ui/NewButton'
import DrawerButton from '../../ui/DrawerButton'
import { Text } from '../../shared/common'
import { Colors, Metrics } from '../../../utils'
import TagCell from './TagCell'
import ColorPickerModal from '../shared/ColorPickerModal'
import styles from './TagsStyles'
import { showAlert } from '../../shared/common/AlertDialog'

const { ifIOS } = Metrics

class Tags extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editingTag: null,
      showColorPicker: false
    }
  }

  deleteTag = ({ tag }) => {
    this.props.actions.deleteTag(tag.id)
    this.setState({ editingTag: null })
  }

  handleDeleteTag = (tag) => {
    showAlert({
      title: t('Delete tag?'),
      message: t('Do you want to delete tag {name}?', { name: tag.title }),
      actions: [
        {
          tag,
          positive: true,
          name: t('Confirm'),
          callback: this.deleteTag
        },
        {
          name: t('Cancel')
        }
      ]
    })
  }

  handleEditTag = (tag, tagRef) => {
    this.setState({ editingTag: cloneDeep(tag) })
    this.tagRef = tagRef
  }

  handleCancelTag = () => {
    this.setState({ editingTag: null })
    this.tagRef = null
  }

  handleSaveTag = (tag) => {
    this.setState({ editingTag: null, showColorPicker: false })
    this.props.actions.editTag(tag.id, tag.title, tag.color)
    this.tagRef = null
  }

  handleOpenColorPicker = () => {
    this.setState({
      showColorPicker: true
    })
  }

  handleCloseColorPicker = () => {
    this.setState({
      showColorPicker: false
    })
    this.tagRef && this.tagRef.handleFocusInput()
  }

  handleCreateNewTag = async () => {
    const { tags } = this.props
    const id = newIds.nextId(tags)
    const color = Colors.tagColors[Math.floor(Math.random() * 5)]
    const title = t('New Tag')
    await this.props.actions.addCreatedTag({ title, color })
    this.setState({
      editingTag: { id, title, color }
    })
  }

  handleSelectColor = (color) => {
    const { editingTag } = this.state
    this.setState({
      editingTag: { ...editingTag, color },
      showColorPicker: false
    })
    setTimeout(() => this.tagRef && this.tagRef.handleFocusInput(), 600)
  }

  renderColorPicker () {
    const { showColorPicker, editingTag } = this.state
    return (
      <ColorPickerModal
        visible={showColorPicker}
        chooseColor={this.handleSelectColor}
        currentColor={(editingTag && editingTag.color) || 'red'}
        onClose={this.handleCloseColorPicker}
      />
    )
  }

  renderTagItem = (tag, index) => {
    const { editingTag } = this.state
    const isEditing = editingTag && editingTag.id == tag.id ? true : false
    return (
      <TagCell
        key={tag.id}
        tag={isEditing ? editingTag : tag}
        onColor={this.handleOpenColorPicker}
        onEdit={this.handleEditTag}
        onCancel={this.handleCancelTag}
        onSave={this.handleSaveTag}
        onDelete={this.handleDeleteTag}
        isEditing={isEditing}
      />
    )
  }

  renderTagList () {
    const { tags } = this.props
    return tags.map(this.renderTagItem)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Toolbar>
            <DrawerButton openDrawer={this.props.openDrawer} />
            <NewButton onPress={this.handleCreateNewTag} />
          </Toolbar>
          <View style={styles.titleContainer}>
            <Text fontSize='h5' fontStyle='semiBold' style={styles.title}>
              {t('Tags')}
            </Text>
          </View>
            <ScrollView
              style={styles.scroller}
              keyboardShouldPersistTaps='always'>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.tags}>{this.renderTagList()}</View>
              </TouchableWithoutFeedback>
            </ScrollView>
          {this.renderColorPicker()}
        </View>
      </View>
    )
  }
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    tags: selectors.sortedTagsSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.tag, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
