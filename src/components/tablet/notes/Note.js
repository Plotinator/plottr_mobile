import React, { useState } from 'react'
import { t } from 'plottr_locales'
import { Input, Label, Item, Text, Button } from 'native-base'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import AttachmentList from '../../shared/attachments/AttachmentList'
import { DetailsWrapper, DetailsLeft, DetailsRight } from '../shared/Details'
import { RichEditor } from '../../shared/common'
import DetailImage from '../shared/DetailImage'
import DetailPreview from '../shared/DetailView/Preview'
// import { ScrollView } from 'react-native-gesture-handler'

export default function Note(props) {
  const { note } = props
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [changes, makeChanges] = useState(false)

  const saveChanges = () => {
    props.onSave(note.id, title, content)
    makeChanges(false)
  }

  const renderAttachments = () => {
    return (
      <AttachmentList
        itemType='note'
        item={note}
        navigate={props.navigation.navigate}
        books
      />
    )
  }

  let objectMeta = {
    source: 'note',
    title: {
      content: title
    },
    description: {
      content: content,
      type: 'paragraph'
    },
    image: {
      displayStyle: 'fullWidth'
    },
    attributes: [
      {
        title: 'Books',
        key: 'bookIds',
        type: 'attachment',
        attachmentType: 'bookId'
      },
      {
        title: 'Characters',
        key: 'characters',
        type: 'attachment',
        attachmentType: 'character'
      },
      {
        title: 'Places',
        key: 'places',
        type: 'attachment',
        attachmentType: 'place'
      },
      {
        title: 'Tags',
        key: 'tags',
        type: 'attachment',
        attachmentType: 'tag'
      }
    ]
  }

  // console.log("Working copy Notes - ------- ", note);
  return (
    <DetailPreview object={note} objectMeta={objectMeta} />
    // <DetailsWrapper>
    //   <DetailsLeft contentContainerStyle={{ flex: 1 }}>
    //     <DetailImage image={note.image && note.image.data} />
    //     <Item inlineLabel style={styles.label}>
    //       <Label>{t('Title')}</Label>
    //       <Input
    //         value={title}
    //         onChangeText={text => {
    //           setTitle(text)
    //           makeChanges(true)
    //         }}
    //         autoCapitalize='sentences'
    //       />
    //     </Item>
    //     <View style={[styles.afterList, styles.rceView]}>
    //       <Label>{t('Content')}</Label>
    //       <RichEditor
    //         initialValue={note.content}
    //         onChange={val => {
    //           setContent(val)
    //           makeChanges(true)
    //         }}
    //         maxHeight={5000}
    //       />
    //     </View>
    //   </DetailsLeft>
    //   <DetailsRight>
    //     <View>
    //       <View style={styles.detailsRightItems}>{renderAttachments()}</View>
    //     </View>
    //     <View style={styles.buttonFooter}>
    //       <Button block success disabled={!changes} onPress={saveChanges}>
    //         <Text>{t('Save')}</Text>
    //       </Button>
    //     </View>
    //   </DetailsRight>
    // </DetailsWrapper>
  )
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
