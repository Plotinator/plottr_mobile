import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'react-proptypes'
import { Icon } from 'native-base'
import { selectors, actions, helpers, initialState } from 'pltr/v2'
import {
  Alert,
  Image,
  View,
  Modal,
  ScrollView,
  KeyboardAvoidingView
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
  Attachments
} from '../../shared/common'
import styles from './ImagesModalStyles'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import Collapsible from 'react-native-collapsible'
import Book from '../../shared/project/Book'
import Colors from '../../../utils/Colors'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { showAlert, showInputAlert } from './AlertDialog'

class ImagesModal extends Component {
  state = {
    forceHide: false,
    selected: null
  }

  handleChoose = () => {
    const { selected } = this.state
    const { onChooseImage } = this.props
    onChooseImage && onChooseImage(selected)
  }

  handleToggleSelected = (id) => {
    const { selected } = this.state
    this.setState({
      selected: selected === id ? null : id
    })
  }

  handleSelectImage = () => {
    launchImageLibrary(
      {
        title: 'Select Image',
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        cameraType: 'front',
        includeBase64: true,
        quality: 0.85
      },
      (response) => {
        console.log('Response = ', response)
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else {
          const { base64, fileName, type, uri } = response
          this.props.actions.addImage({
            data: `${
              base64.match(/^data.*base64,/i) ? '' : `data:${type};base64,`
            }${base64}`,
            name: fileName,
            path: uri
          })
        }
      }
    )
  }

  handleInsertLink = () => {
    showInputAlert({
      title: t('Paste Image Url'),
      message: t('Enter the url of the image.'),
      actions: [
        {
          name: t('Insert Image'),
          callback: this.handleImageLink,
          positive: true
        },
        {
          name: t('Cancel')
        }
      ]
    })
  }

  handleImageLink = (url) => {}

  handleDeleteImage = (id) => {
    Alert.alert(t('Delete'), t('Are you sure you wish to delete this image?'), [
      {
        text: t('Delete'),
        onPress: () => {
          this.props.actions.deleteImage(id)
          this.handleClearSelection()
        }
      },
      { text: t('Cancel'), style: 'cancel' }
    ])
    // showAlert({
    //   title: t('Delete Image?'),
    //   message: t('Are you sure you wish to delete this image?'),
    //   actions: [
    //     {
    //       name: t('Delete Image'),
    //       positive: true,
    //       callback: () => {
    //         this.props.actions.deleteImage(id)
    //       }
    //     },
    //     {
    //       name: t('Cancel')
    //     }
    //   ]
    // })
  }

  handleClearSelection = () => this.setState({ selected: null })

  handleRenameImage = (id) => {
    // showInputAlert
    // const { selected } = this.state
    // this.props.actions.renameImage(selected, name)
  }

  handleClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  renderImage = (imageId, index) => {
    const { images } = this.props
    const { selected } = this.state
    const { data } = images[imageId]
    const isSelected = selected === imageId
    const hitArea = { top: 5, bottom: 5, left: 5, right: 5 }
    const colorStyle = {
      borderTopColor: isSelected ? Colors.orange : Colors.warmWhite,
      borderBottomColor: isSelected ? Colors.orange : Colors.warmWhite
    }
    return (
      <ShellButton
        key={index}
        data={imageId}
        style={styles.imageContainer}
        onPress={this.handleToggleSelected}>
        <Image
          source={{ uri: data }}
          style={[styles.image, isSelected && styles.selected]}
        />
        {isSelected && [
          <ShellButton
            data={imageId}
            key='trash'
            hitSlop={hitArea}
            style={styles.bottomLeftButton}
            onPress={this.handleDeleteImage}>
            <View style={[styles.bottomLeftShape, colorStyle]} />
            <Icon
              type='FontAwesome5'
              name='trash'
              style={styles.bottomLeftIcon}
            />
          </ShellButton>,
          <ShellButton
            data={imageId}
            key='pen'
            hitSlop={hitArea}
            style={styles.bottomRightButton}
            onPress={this.handleRenameImage}>
            <View style={[styles.bottomRightShape, colorStyle]} />
            <Icon
              type='FontAwesome5'
              name={'pen'}
              style={styles.bottomRightIcon}
            />
          </ShellButton>
        ]}
      </ShellButton>
    )
  }

  render () {
    const { selected, forceHide } = this.state
    const { book, visible } = this.props
    const { images } = this.props
    console.log('images', images)
    return (
      <Modal
        visible={forceHide ? false : visible}
        animationType='fade'
        transparent={true}
        onDismiss={this.handleClose}
        onRequestClose={this.handleClose}>
        <KeyboardAvoidingView behavior='padding' style={styles.avoidingView}>
          <View style={styles.window}>
            <ShellButton style={styles.closeButton} onPress={this.handleClose}>
              <Icon style={styles.closeIcon} type='FontAwesome5' name='times' />
            </ShellButton>
            <View style={styles.titleHead}>
              <Text style={styles.titleText}>{t('Images')} </Text>
              <AddButton
                onPress={this.handleSelectImage}
                style={styles.addButton}
                size={28}
              />
              {/*
              <AddButton
                onPress={this.handleInsertLink}
                style={styles.addButton}
                size={28}
                icon='link'
              />
            */}
            </View>
            <ScrollView style={styles.scroller}>
              <View style={styles.images}>
                {Object.keys(images).map(this.renderImage)}
              </View>
            </ScrollView>
            <Collapsible style={styles.actions} collapsed={!selected}>
              <Button tiny style={styles.action} onPress={this.handleChoose}>
                {t('Choose')}
              </Button>
            </Collapsible>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}

ImagesModal.propTypes = {
  onChooseImage: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    images: state.images
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions.image, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesModal)
