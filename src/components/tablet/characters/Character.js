import React, { Component } from 'react'
import { t } from 'plottr_locales'
import { StyleSheet } from 'react-native'
import DetailPreview from '../shared/DetailView/Preview'
import { cloneDeep } from 'lodash'

export default class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      object: null,
      objectMeta: null
    }
  }
  componentDidMount() {
    const { character } = this.props
    let objectMeta = this.getObjectMeta()
    this.setState({
      object: character,
      objectMeta: objectMeta
    })
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

  getObjectMeta = () => {
    const { customAttributes } = this.props

    let objectMeta = {
      source: 'character',
      name: {
        title: t('Name'),
        key: 'name',
        type: 'line',
        center: true
      },
      description: {
        title: t('Description'),
        key: 'description',
        type: 'line',
        center: true
      },
      image: {
        displayStyle: 'circular',
        key: 'imageId'
      },
      attributes: [
        {
          title: 'Notes',
          titleStyle: 'boldItalic',
          key: 'notes',
          type: 'paragraph'
        }
      ]
    }
    objectMeta = this.addCustomAttributes(objectMeta, customAttributes)
    objectMeta = this.addAttachments(objectMeta)
    return objectMeta
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
      title: 'Tags',
      key: 'tags',
      type: 'attachment',
      attachmentType: 'tag'
    })
    return newMeta
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

const styles = StyleSheet.create({
  buttonFooter: {
    marginTop: 16,
    marginRight: 16,
    marginBottom: 8
  },
  label: {
    marginBottom: 16
  },
  afterList: {
    marginTop: 16
  },
  detailsRightItems: {
    paddingRight: 8
  },
  rceView: {
    marginBottom: 16
  },
  tagStyle: {}
})
