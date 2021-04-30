import React, { Component } from 'react'
import { t } from 'plottr_locales'
import {
  StyleSheet,
} from 'react-native'
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
    const { note } = this.props;
    let objectMeta = this.getObjectMeta();
    this.setState({
      object: note,
      objectMeta: objectMeta
    })
  }

  getObjectMeta = () => {
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
        displayStyle: 'fullWidth'
      },
      attributes: []
    };
    objectMeta = this.addAttachments(objectMeta);
    return objectMeta;
  }

  addAttachments = (objectMeta) => {
    let newMeta = cloneDeep(objectMeta);
    newMeta.attributes.push({
      title: 'Books',
      key: 'bookIds',
      type: 'attachment',
      attachmentType: 'bookId'
    });
    newMeta.attributes.push({
      title: 'Characters',
      key: 'characters',
      type: 'attachment',
      attachmentType: 'character'
    });
    newMeta.attributes.push({
      title: 'Places',
      key: 'places',
      type: 'attachment',
      attachmentType: 'place'
    });
    newMeta.attributes.push({
      title: 'Tags',
      key: 'tags',
      type: 'attachment',
      attachmentType: 'tag'
    });
    return newMeta;
  }

  render() {
    const { object, objectMeta } = this.state
    return (
      <>
        {object ?
          <DetailPreview object={object} objectMeta={objectMeta} onSave={this.props.onSave} /> :
          null}
      </>
    )
  }
}

// export default function Note(props) {
//   const { note } = props

//   let objectMeta = {
//     source: 'note',
//     name: {
//       title: t('Name'),
//       key: 'title',
//       type: 'line'
//     },
//     description: {
//       title: t('Description'),
//       key: 'content',
//       type: 'paragraph'
//     },
//     image: {
//       displayStyle: 'fullWidth'
//     },
//     attributes: [
//       {
//         title: 'Books',
//         key: 'bookIds',
//         type: 'attachment',
//         attachmentType: 'bookId'
//       },
//       {
//         title: 'Characters',
//         key: 'characters',
//         type: 'attachment',
//         attachmentType: 'character'
//       },
//       {
//         title: 'Places',
//         key: 'places',
//         type: 'attachment',
//         attachmentType: 'place'
//       },
//       {
//         title: 'Tags',
//         key: 'tags',
//         type: 'attachment',
//         attachmentType: 'tag'
//       }
//     ]
//   }
//   return (
//     <DetailPreview object={note} objectMeta={objectMeta} onSave={props.onSave} />
//   )
// }

const styles = StyleSheet.create({
  buttonFooter: {
    marginTop: 16,
    marginRight: 16,
    marginBottom: 8
  },
  label: {
    marginBottom: 16
  },
  detailsRightItems: {
    paddingRight: 8
  },
  rceView: {
    // flex: 1
  },
  tagStyle: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 20
  }
})
