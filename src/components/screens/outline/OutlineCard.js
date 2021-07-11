import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { View, TouchableWithoutFeedback } from 'react-native'
import { t } from 'plottr_locales'
import { selectors, actions, helpers } from 'pltr/v2'
import styles from './OutlineStyles'
import {
  Text,
  Button,
  Input,
  AddButton,
  IconButton,
  RichEditor,
  ShellButton
} from '../../shared/common'
import Fonts from '../../../fonts'
import { Metrics } from '../../../utils'

const { ifTablet, IS_TABLET } = Metrics
const { size } = Fonts

class OutlineCard extends Component {
  constructor(props) {
    super(props)
    const {
      card: { title, description }
    } = this.props
    this.state = { editMode: false, title, description }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.editMode && nextProps.card) {
      prevState.title = nextProps.card.title
      prevState.description = nextProps.card.description
    }
    return prevState
  }

  handleTitle = (title) => this.setState({ title })

  handleDescription = (description) => this.setState({ description })

  handleEditCard = () => {
    const {
      navigation,
      card: scene,
      card: { title, description }
    } = this.props
    if (IS_TABLET) this.setState({ editMode: true, title, description })
    else navigation.navigate('SceneDetails', { scene })
  }

  handleSaveOutline = () => {
    const {
      index,
      cardMap,
      card: { id, beatId }
    } = this.props
    const length = cardMap[beatId].length
    const { title, description } = this.state

    for (let i = 0; i < length; i++) {
      if (cardMap[beatId][i].id === id) {
        cardMap[beatId][i] = { ...card, title, description }
      }
    }

    this.props.actions.editCard(id, title, description, [], {})

    this.setState({ editMode: false })
  }

  handleCancel = () => {
    const {
      card: { title, description }
    } = this.props
    this.setState({ editMode: false, title, description })
  }

  handleReorderCard = (move) => {
    const { onReorder, card, index } = this.props
    onReorder && onReorder(card, index, move)
  }

  render() {
    const { lines, card } = this.props
    const { title, description, editMode } = this.state
    const line = lines.find((line) => line.id == card.lineId)
    const { title: lineTitle, color: lineColor } = line
    const color = (lineColor || 'black').toLowerCase()
    const borderStyle = { borderColor: color }
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.card, borderStyle]}>
          {/*
            <View style={styles.reorderButtons}>
              <ShellButton
                data={-1}
                style={styles.reorderUp}
                onPress={this.handleReorderCard}>
                <IconButton
                  noninteractive
                  name='caret-up'
                  hitSize={1}
                  style={styles.reorderUpIcon}
                />
              </ShellButton>
              <ShellButton
                data={1}
                style={styles.reorderDown}
                onPress={this.handleReorderCard}>
                <IconButton
                  noninteractive
                  name='caret-down'
                  hitSize={1}
                  style={styles.reorderDownIcon}
                />
              </ShellButton>
            </View>
          */}
          <View style={styles.cardHead}>
            <View style={[styles.cardHeader, borderStyle]}>
              <Text color={color} style={styles.cardHeaderText}>
                {lineTitle}
              </Text>
            </View>
            <View style={styles.cardTitle}>
              {editMode ? (
                <Input
                  rounded
                  placeholder={`${t('Title')}:`}
                  value={title}
                  style={styles.input}
                  inputStyle={styles.inputText}
                  labelTextStyle={styles.labelText}
                  onChangeText={this.handleTitle}
                />
              ) : (
                <Text style={styles.cardTitleText}>{title}</Text>
              )}
            </View>
          </View>
          <View style={styles.cardBody}>
            <RichEditor
              key={editMode ? 'editor' : 'display'}
              disabled={!editMode}
              fontSize={ifTablet(size.tiny, size.h5)}
              initialValue={description}
              onChange={this.handleDescription}
            />
            <View style={styles.cardFoot}>
              {editMode ? (
                <View style={[styles.actions, styles.editActions]}>
                  <Button
                    small
                    style={styles.action}
                    onPress={this.handleSaveOutline}>
                    Save
                  </Button>
                  <Button
                    bordered
                    small
                    style={styles.action}
                    onPress={this.handleCancel}>
                    Cancel
                  </Button>
                </View>
              ) : (
                <AddButton icon='pen' onPress={this.handleEditCard} />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

OutlineCard.propTypes = {
  lines: PropTypes.array.isRequired,
  card: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    lines: selectors.sortedLinesByBookSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.card, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlineCard)
