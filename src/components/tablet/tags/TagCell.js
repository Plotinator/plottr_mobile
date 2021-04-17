import React, { Component } from 'react'
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Icon } from 'native-base'
import { ShellButton, Input, Text } from '../../shared/common'
import tinycolor from 'tinycolor2'
import styles from './TagsCellStyles'
import PropTypes from 'react-proptypes'

class TagCell extends Component {
  constructor(props) {
    super(props)
    const { tag } = props
    this.state = {
      tag
    }
  }

  static getDerivedStateFromProps (nextProps, nextState) {

    // update the color if changed
    if (nextProps.tag.color !== nextState.tag.color)
      nextState.tag.color = nextProps.tag.color

    return nextState
  }

  componentDidMount() {
    const { tag, editId, editing } = this.props
    if (editing && tag.id === editId) {
      this.handleFocusInput()
    }
  }

  handleTitleChange = (title) => {
    const { tag } = this.state
    this.setState({
      tag: { ...tag, title }
    })
  }

  handleFocusInput = () => {
    this.input && this.input.focus()
  }

  handleEdit = () => {
    const { onEdit, tag } = this.props
    setTimeout(this.handleFocusInput, 100)
    onEdit && onEdit(tag, this)
  }

  handleCancel = () => {
    const { onCancel, tag } = this.props
    this.setState({ tag })
    onCancel && onCancel(tag)
  }

  handleColor = () => {
    const { onColor, tag } = this.props
    Keyboard.dismiss()
    onColor && onColor(tag)
  }

  handleInputRef = (ref) => (this.input = ref)

  render() {
    const {
      onDelete,
      onSave,
      isEditing
    } = this.props
    const { tag, tag: { color, title } } = this.state
    const hexColor = tinycolor(color).toHexString()
    const borderColor = { borderColor: hexColor }
    const colorStyle = [{
      borderTopColor: hexColor,
      borderBottomColor: hexColor
    }]
    const hitArea = { top: 5, bottom: 5, left: 5, right: 5 }
    return (
      <TouchableWithoutFeedback onPress={this.handleFocusInput}>
        <View style={[styles.tag, borderColor, isEditing && styles.focused]}>
          {!isEditing && <View style={styles.blocker} />}
          <View style={styles.tagInner}>
            <TextInput
              autoFocus={isEditing}
              // selectTextOnFocus
              editable={isEditing}
              placeholder='New Tag'
              ref={this.handleInputRef}
              style={[ styles.tagTextInput, {/* color: hexColor */} ]}
              onChangeText={this.handleTitleChange}
              value={title}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          {/* Top right button */}
          {isEditing && (
            <React.Fragment>
              <ShellButton
                data={tag}
                onPress={this.handleColor}
                style={styles.topLeftButton}
                hitSlop={hitArea}
                disabled={!isEditing}>
                <View
                  style={[
                    styles.topLeftShape,
                    ...colorStyle
                  ]}
                />
                <Icon
                  type='FontAwesome5'
                  name='paint-brush'
                  style={styles.topLeftIcon}
                />
              </ShellButton>
              <ShellButton
                data={tag}
                onPress={this.handleCancel}
                style={styles.topRightButton}
                hitSlop={hitArea}
                disabled={!isEditing}>
                <View
                  style={[
                    styles.topRightShape,
                    ...colorStyle
                  ]}
                />
                <Icon
                  type='FontAwesome5'
                  name='times'
                  style={styles.topRightIcon}
                />
              </ShellButton>
            </React.Fragment>
          )}
          <ShellButton
            data={tag}
            onPress={onDelete}
            hitSlop={hitArea}
            style={styles.bottomLeftButton}>
            <View
              style={[
                styles.bottomLeftShape,
                ...colorStyle
              ]}
            />
            <Icon
              type='FontAwesome5'
              name='trash'
              style={styles.bottomLeftIcon}
            />
          </ShellButton>
          <ShellButton
            data={tag}
            hitSlop={hitArea}
            onPress={isEditing ? onSave : this.handleEdit}
            style={styles.bottomRightButton}>
            <View
              style={[
                styles.bottomRightShape,
                ...colorStyle
              ]}
            />
            <Icon
              type='FontAwesome5'
              name={isEditing ? 'check' : 'pen'}
              style={styles.bottomRightIcon}
            />
          </ShellButton>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

TagCell.propTypes = {
  tag: PropTypes.object.isRequired,
  onColor: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
}

export default TagCell
