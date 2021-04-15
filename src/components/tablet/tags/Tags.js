import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import t from 'format-message'
import cx from 'classnames'
import { selectors, actions, newIds } from 'pltr/v2'
import { View, Button, Icon, Content } from 'native-base'
import Toolbar from '../shared/Toolbar'
import NewButton from '../../ui/NewButton'
import tinycolor from 'tinycolor2'
import prompt from 'react-native-prompt-android'
import DrawerButton from '../../ui/DrawerButton'
import { Text } from '../../shared/common'
import Cell from '../shared/Cell'
import { Colors, Metrics } from '../../../utils'
import TagCell from './TagCell'
import ColorPickerModal from '../shared/ColorPickerModal'

class Tags extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      editId: null,
      editTag: null,
      showColorPicker: false
    }
  }

  createTag = async (title) => {
    const { tags } = this.props

    let newId = newIds.nextId(tags);
    let newColor = Colors.tagColors[Math.floor(Math.random() * 5)]
    await this.props.actions.addCreatedTag({
      title: title,
      color: newColor
    });
    this.setState({
      editing: true,
      editId: newId,
      editTag: {
        id: newId,
        title: title,
        color: newColor
      }
    })
  }

  deleteTag = (tag) => {
    this.props.actions.deleteTag(tag.id);
    this.setState({
      editing: false,
      editId: null,
      editTag: null
    });
  }

  promptToDelete = (tag) => {
    Alert.alert(
      t("Delete tag?"),
      t("Do you want to delete tag") + " '" + tag.title + "'?",
      [
        {
          text: t('Cancel'),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: t('Confirm'), onPress: () => this.deleteTag(tag) }
      ]
    );
  }

  editTag = (tag) => {
    this.setState({
      editing: true,
      editId: tag.id,
      editTag: tag
    });
  }

  saveTag = (tag) => {
    this.setState({
      editing: false,
      editId: null,
      editTag: null,
      showColorPicker: false
    });
    this.props.actions.editTag(tag.id, tag.title, tag.color);
  }

  promptToCreate = () => {
    prompt(t('Name'), t('Give this tag a name'), [
      { text: t('Cancel'), style: 'cancel' },
      { text: t('OK'), onPress: this.createTag },
    ],
      {}
    )
  }

  handleOpenColorPicker = () => {
    this.setState({
      showColorPicker: true
    });
  }

  handleCloseColorPicker = () => {
    this.setState({
      showColorPicker: false
    });
  }

  renderColorPicker() {
    const {
      showColorPicker,
      editTag
    } = this.state
    return (
      <ColorPickerModal
        visible={showColorPicker}
        chooseColor={(color) => {
          let newTag = editTag;
          newTag.color = color;
          this.saveTag(newTag);
        }}
        currentColor={editTag ? editTag.color : 'red'}
        onClose={this.handleCloseColorPicker}
      />
    )
  }

  renderTagItem = (tag, index) => {
    const { editId, editing } = this.state;
    return (
      <Cell style={styles.cell} key={tag.id}>
        <TagCell
          key={tag.id}
          tag={tag}
          topRightIcon={() => {
            return (<Icon type='FontAwesome5' name='paint-brush' style={styles.paint} />)
          }}
          topRightOnPress={this.handleOpenColorPicker}
          bottomRightIcon={() => {
            if (editing && tag.id === editId) {
              return (<Icon type='FontAwesome5' name='check' style={styles.pen} />);
            } else {
              return (<Icon type='FontAwesome5' name='pen' style={styles.pen} />);
            }

          }}
          bottomRightOnPress={editing && tag.id === editId ? this.saveTag : this.editTag}
          bottomLeftIcon={() => {
            return (<Icon type='FontAwesome5' name='trash' style={styles.delete} />)
          }}
          bottomLeftOnPress={this.promptToDelete}
          editing={editing}
          editId={editId}
        />
      </Cell>
    )
  }

  renderTagList() {
    const { tags } = this.props
    return (
        <ScrollView>
          <TouchableWithoutFeedback>
            <View style={styles.tagList}>
              {tags.map((item, index) => { return this.renderTagItem(item, index) })}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
    )
  }

  render() {
    return <View style={{ flex: 1 }}>
      <Toolbar>
        <DrawerButton openDrawer={this.props.openDrawer} />
        <NewButton onPress={() => { this.createTag("") }} />
      </Toolbar>
      <View style={styles.content}>
        <Text fontSize='h5' fontStyle='semiBold' style={styles.title}>{t('Tags')}</Text>
        {this.renderTagList()}
      </View>
      {this.renderColorPicker()}
    </View>
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  tagListContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  tagList: {
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
  tagItem: {
    height: 60,
    width: 160,
    marginVertical: 20,
    marginHorizontal: 18,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: 'hsl(0, 0%, 87%)', //bootstrap default
    borderWidth: 1,
  },

  cell: {
    justifyContent: 'center',
    marginBottom: 25
  },

  pen: {
    fontSize: 12,
    color: 'white'
  },
  paint: {
    fontSize: 12,
    color: 'white',
    transform: [{ rotate: '270deg' }]

  },
  delete: {
    fontSize: 12,
    color: 'white'
  },
})

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    tags: selectors.sortedTagsSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.tag, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags)
