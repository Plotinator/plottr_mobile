import React, { Component } from 'react'
import { t } from 'plottr_locales'
import DetailPreview from '../../shared/detailview'
import { cloneDeep } from 'lodash'

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      object: null,
      objectMeta: null
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.customAttributes) !=
      JSON.stringify(this.props.customAttributes)
    ) {
      let objectMeta = this.getObjectMeta()
      this.setState({
        objectMeta: objectMeta
      })
    }
  }

  componentDidMount() {
    const { note } = this.props
    let objectMeta = this.getObjectMeta()
    this.setState({
      object: note,
      objectMeta: objectMeta
    })
  }

  getObjectMeta = () => {
    const { customAttributes } = this.props

    let objectMeta = {
      source: 'note',
      name: {
        title: t('Name'),
        key: 'title',
        type: 'line'
      },
      description: {
        title: t('Description'),
        key: 'content',
        type: 'paragraph'
      },
      image: {
        displayStyle: 'fullWidth',
        key: 'imageId'
      },
      attributes: []
    }
    objectMeta = this.addCustomAttributes(objectMeta, customAttributes)
    objectMeta = this.addAttachments(objectMeta)
    return objectMeta
  }

  addCustomAttributes = (objectMeta, customAttributes) => {
    let newMeta = cloneDeep(objectMeta)
    customAttributes.map((attr, idx) => {
      const { name, type } = attr
      let newAttr = {
        title: name,
        key: name,
        type: type == 'paragraph' ? 'paragraph' : 'line'
      }
      newMeta.attributes.push(newAttr)
    })
    return newMeta
  }

  addAttachments = (objectMeta) => {
    let newMeta = cloneDeep(objectMeta)
    newMeta.attributes.push({
      title: 'Books',
      key: 'bookIds',
      type: 'attachment',
      attachmentType: 'bookId'
    })
    newMeta.attributes.push({
      title: 'Characters',
      key: 'characters',
      type: 'attachment',
      attachmentType: 'character'
    })
    newMeta.attributes.push({
      title: 'Places',
      key: 'places',
      type: 'attachment',
      attachmentType: 'place'
    })
    newMeta.attributes.push({
      title: 'Tags',
      key: 'tags',
      type: 'attachment',
      attachmentType: 'tag'
    })
    return newMeta
  }

  render() {
    const { object, objectMeta } = this.state
    return object ? (
      <DetailPreview
        object={object}
        objectMeta={objectMeta}
        onSave={this.props.onSave}
      />
    ) : null
  }
}
