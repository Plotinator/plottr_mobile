import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { View } from 'react-native'
import { t } from 'plottr_locales'
import {
  Text,
  Button,
  PickerInput,
  ScrollerView,
  DetailBlock,
  AddButton,
  ImagesModal,
  AttachmentsPreview
} from '../common'
import styles from './DetailPreviewStyles'
import Collapsible from 'react-native-collapsible'
import DetailImage from './DetailImage'
import images from '../../../images'
import Metrics from '../../../utils/Metrics'

const { ifTablet, IS_TABLET } = Metrics

export default class DetailPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      object: null,
      objectMeta: null,
      editMode: false,
      showImageModal: false
    }
  }

  componentDidMount() {
    const { object, objectMeta } = this.props
    const { name } = objectMeta

    const editMode = object[name.key] ? false : true
    this.setState({
      object: cloneDeep(object),
      objectMeta: cloneDeep(objectMeta),
      editMode: editMode,
      showImageModal: false
    })
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) != JSON.stringify(this.props)) {
      const { object, objectMeta } = this.props
      this.setState({
        object: cloneDeep(object),
        objectMeta: cloneDeep(objectMeta)
      })
    }
  }

  componentWillUnmount() {
    const { editMode } = this.state
    if (editMode) this.handleSave()
  }

  setScrollerRef = (ref) => (this.scroller = ref)

  handleHideImageModal = () => this.setState({ showImageModal: false })

  handleShowImageModal = () => this.setState({ showImageModal: true })

  handleChooseImage = (imageId, image) => {
    const { object: oldObject, objectMeta = {} } = this.state
    const {
      image: { key }
    } = objectMeta
    const object = cloneDeep(oldObject)
    object[key] = imageId
    object.image = image
    this.setState({
      object,
      showImageModal: false
    })
  }

  handleChange = (key, value) => {
    let objectCopy = cloneDeep(this.state.object)
    objectCopy[key] = value
    this.setState({
      object: objectCopy
    })
  }

  handleEdit = () => {
    const { onEdit, object } = this.props
    onEdit && onEdit(object, objectMeta)
    this.setState({ editMode: true }) // test example
  }

  handleSave = () => {
    const { onSave } = this.props
    const { object } = this.state
    onSave && onSave(object.id, object)
    this.setState({ editMode: false })
  }

  handleCancel = () => {
    this.setState({ editMode: false }, () => {
      setTimeout(() => this.scroller.scrollTo({ x: 0, y: 0, animated: true }))
    })
  }

  renderHeader = () => {
    const { object, objectMeta = {}, editMode, showImageModal } = this.state
    const { name, description, source, attributes = [] } = objectMeta
    const isCharacter = source === 'character'
    return editMode ? (
      <React.Fragment>
        <View style={styles.detailsBlock}>
          {object.image ? (
            <DetailImage
              displayStyle={objectMeta.image.displayStyle}
              image={object.image && object.image.data}
              editMode={editMode}
              onPress={this.handleShowImageModal}
            />
          ) : (
            <DetailImage
              displayStyle={objectMeta.image.displayStyle}
              imageSourceType='default'
              image={isCharacter ? images.PROFILE : null}
              editMode={editMode}
              onPress={this.handleShowImageModal}
            />
          )}
        </View>
        <DetailBlock
          editMode={editMode}
          heading={name.title}
          headingStyle={name.titleStyle || 'bold'}
          details={object[name.key]}
          type={name.type}
          objectKey={name.key}
          onChange={this.handleChange}
        />
        <DetailBlock
          editMode={editMode}
          heading={description.title}
          headingStyle={description.titleStyle || 'bold'}
          details={object[description.key]}
          type={description.type}
          objectKey={description.key}
          onChange={this.handleChange}
        />
        <ImagesModal
          visible={editMode && showImageModal}
          onChooseImage={this.handleChooseImage}
          onClose={this.handleHideImageModal}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        {object.image && (
          <View style={styles.detailsBlock}>
            <DetailImage
              displayStyle={objectMeta.image.displayStyle}
              image={object.image && object.image.data}
            />
          </View>
        )}
        <DetailBlock
          editMode={editMode}
          heading={object[name.key] ? object[name.key] : 'New Character'}
          details={object[description.key]}
          type={description.type}
          objectKey={description.key}
          onChange={this.handleChange}
          centerText={isCharacter}
        />
      </React.Fragment>
    )
  }

  renderSaveButtons = () => {
    const { editMode } = this.state
    return (
      <Collapsible collapsed={!editMode}>
        <View style={styles.actions}>
          <Button
            small={IS_TABLET}
            tight={!IS_TABLET}
            style={styles.action}
            onPress={this.handleSave}>
            {t('Save')}
          </Button>
          <Button
            small={IS_TABLET}
            tight={!IS_TABLET}
            bordered
            style={styles.action}
            onPress={this.handleCancel}>
            {t('Cancel')}
          </Button>
        </View>
      </Collapsible>
    )
  }

  renderAttribute = (attribute, i) => {
    const { object, editMode } = this.state
    const {
      objectMeta: { source }
    } = this.props
    const {
      title,
      key,
      type,
      titleStyle,
      attachmentType,
      options,
      alwaysRender
    } = attribute
    const isAttachment = type === 'attachment'
    const isSelectable = type === 'selectable'
    const shouldRender = object[key] && object[key].length > 0
    const renderComponent =
      editMode || shouldRender || alwaysRender ? (
        isAttachment ? (
          <AttachmentsPreview
            editMode={editMode}
            title={title}
            cardId={object.id}
            attachments={object[key]}
            type={attachmentType}
            source={source}
            objectKey={key}
            onChange={this.handleChange}
          />
        ) : isSelectable ? (
          <PickerInput
            key={i}
            editMode={editMode}
            title={title}
            value={object[key]}
            valueKey='id'
            displayKey='name'
            paramKey={key}
            options={options}
            onChange={this.handleChange}
          />
        ) : (
          <DetailBlock
            key={i}
            editMode={editMode}
            heading={title}
            headingStyle={titleStyle || 'bold'}
            details={object[key]}
            type={type}
            objectKey={key}
            onChange={this.handleChange}
          />
        )
      ) : null
    return (
      <View key={i} style={styles.attributeContainer}>
        {renderComponent}
      </View>
    )
  }

  render() {
    const { object, objectMeta = {}, editMode } = this.state
    if (object) {
      const { name, description, attributes = [] } = objectMeta

      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <ScrollerView
              scrollerProps={{
                ref: this.setScrollerRef,
                showsVerticalScrollIndicator: false
              }}
              style={styles.scroller}>
              <View
                style={[styles.detailsWrapper, editMode && styles.editWrapper]}>
                {this.renderHeader()}
                {attributes.map(this.renderAttribute)}
                {this.renderSaveButtons()}
              </View>
            </ScrollerView>
            {!editMode && (
              <View style={styles.editButtonContainer}>
                <AddButton
                  size={ifTablet(40, 35)}
                  icon='pen'
                  onPress={this.handleEdit}
                />
              </View>
            )}
          </View>
        </View>
      )
    } else {
      return null
    }
  }
}

DetailPreview.propTypes = {
  object: PropTypes.object.isRequired,
  objectMeta: PropTypes.object.isRequired
}
