import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import t from 'format-message'
import cx from 'classnames'
import { selectors, actions, newIds } from 'pltr/v2'
import { View, Icon } from 'native-base'
import Toolbar from '../shared/Toolbar'
import NewButton from '../../ui/NewButton'
import tinycolor from 'tinycolor2'
import prompt from 'react-native-prompt-android'
import DrawerButton from '../../ui/DrawerButton'
import { Text, ModalBox, Input, Button, ShellButton } from '../../shared/common'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'

class Tags extends Component {
  state = {
    currentTag: {}
  }

  createTag = (title) => {
    this.props.actions.addCreatedTag({ title })
  }

  setTagModal = ref => this._TagModal = ref
  handleClearTag = () => this.setState({ currentTag: {} })

  handleTag = (tag) => {
    this.setState(
      {
        currentTag: { ...tag }
      },
      () => {
        this._TagModal.show()
      }
    )
  }

  renderTagItem = (tag) => {
    let tagColor = 'hsl(0, 0%, 87%)'
    let borderColor = {}
    if (tag.color) {
      const color = tinycolor(tag.color)
      tagColor = color.toHexString()
      borderColor = { borderColor: tagColor }
    }

    return (
      <ShellButton
        data={tag}
        key={tag.id}
        style={styles.tagContainer}
        onPress={this.handleTag}>
        <View style={[styles.tagItem, borderColor]}>
          <Text
            center
            style={styles.tagText}
            numberOfLines={2}>{tag.title || t('New Tag')}</Text>
          <TouchableOpacity
            onPress={this.handleEditTag}
            style={styles.editButton}
            hitSlop={{ top: 20, bottom: 25, left: 25, right: 25 }}>
            <View style={styles.editButtonColor}>
              <View
                style={[styles.editButtonShape, { borderTopColor: tagColor }]}
              />
            </View>
            <Icon type='FontAwesome5' name='pen' style={styles.editPen} />
          </TouchableOpacity>
        </View>
      </ShellButton>
    )
  }

  renderTagList () {
    const { tags } = this.props
    return (
      <ScrollView contentContainerStyle={styles.tagList}>
        {tags.map(this.renderTagItem)}
      </ScrollView>
    )
  }

  renderTagModal () {
    const {
      currentTag: { title = t('New Tag'), color }
    } = this.state
    return (
      <ModalBox
        title={t('Edit Tag')}
        ref={this.setTagModal}
        onHide={this.handleClearTag}>
        <View style={styles.row}>
          <Input
            inset
            small
            label={t('Title')}
            value={title}
            autoCapitalize='words'
            onChangeText={this.handleSetPlotTitle}
          />
        </View>
        <View style={styles.row}>
          <Input
            inset
            small
            label={t('Color')}
            style={styles.input}
            value={color}
            onChangeText={this.handleSetPlotColor}
          />
          <ShellButton
            style={[
              styles.colorSwatch,
              { backgroundColor: tinycolor(color).toHexString() }
            ]}
            onPress={this.handleShowColorPicker}>
            <Icon name='pen' type='FontAwesome5' style={styles.pen} />
          </ShellButton>
        </View>
        <View style={[styles.row, styles.last]}>
          <View style={styles.ctaButtons}>
            <Button
              center
              style={styles.button}
              onPress={this.handleSavePlotline}>
              {t('Save Tag')}
            </Button>
            <Button
              center
              buttonColor='transparent'
              style={styles.trashButton}
              onPress={this.handleDeletePlotline}>
              <Icon name='trash' type='FontAwesome5' style={styles.trash} />
            </Button>
          </View>
        </View>
      </ModalBox>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Toolbar>
          <DrawerButton openDrawer={this.props.openDrawer} />
          <NewButton onPress={this.promptToCreate}/>
        </Toolbar>
        <View style={styles.content}>
          <Text fontSize='h5' fontStyle='semiBold' style={styles.title}>{t('Tags')}</Text>
          { this.renderTagList() }
          { this.renderTagModal() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tagList: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  tagContainer: {

  },
  tagItem: {
    overflow: 'hidden',
    height: 80,
    width: 160,
    marginVertical: 20,
    marginHorizontal: 18,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 10,
    borderWidth: 3,
    borderRadius: Metrics.cornerRadius,
    borderColor: 'hsl(0, 0%, 87%)', //bootstrap default
  },
  tagText: {
    ...Fonts.style.bold,
    ...Fonts.style.tinyText,
  },
  editButton: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 1,
    right: 1
  },
  editPen: {
    fontSize: 12,
    marginRight: 0,
    marginBottom: 1,
    color: 'white'
  },
  editButtonColor: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    transform: [{ rotate: '180deg' }]
  },
  editButtonShape: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 30,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
    borderTopColor: 'red'
  },
  row: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.doubleBaseMargin
  },
})

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    tags: selectors.sortedTagsSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.tag, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags)
