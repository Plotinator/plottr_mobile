import React from 'react'
import { View, ImageBackground } from 'react-native'
import { t } from 'plottr_locales'
import { Text, IconButton, AddButton, ShellButton } from '../../shared/common'
import styles from './BookStyles'
import Images from '../../../images'
import { isTablet } from 'react-native-device-info'

const { BOOK } = Images

export default function Book(props) {
  const {
    style,
    editable,
    noTimeline,
    book,
    book: { id, title },
    navigateToOutline,
    navigateToDetails,
    navigateToTimeline,
    onDeleteBook
  } = props
  const goToOutline = () => {
    navigateToOutline(id)
  }
  const goToTimeline = () => {
    navigateToTimeline && navigateToTimeline(id)
    !navigateToTimeline && navigateToDetails && navigateToDetails(id)
  }
  const goToEditBook = () => {
    navigateToDetails(book)
  }
  const deleteBook = () => {
    onDeleteBook(id, bookTitle)
  }
  const bookStyles = [styles.book, style]
  const fontSize = isTablet() ? 'tiny' : 'regular'
  const bookTitle = title || t('Untitled')
  console.log('BOOK', id, title)
  return (
    <ShellButton onPress={goToTimeline} style={bookStyles}>
      <ImageBackground
        source={BOOK}
        style={styles.bookImage}
        resizeMode='contain'>
        <View style={styles.titleWrapper}>
          <Text
            style={styles.bookTitle}
            center>
            {bookTitle}
          </Text>
        </View>
        <View style={[styles.actions, !editable && styles.centerButtons]}>
          {onDeleteBook && (
            <IconButton
              name='trash'
              color='lightenGray'
              size={11}
              onPress={deleteBook}
              buttonStyle={styles.trashButton}
            />
          )}
          <AddButton
            icon='stream'
            onPress={goToOutline}
            size={28}
            hitSize={20}
          />
          {!noTimeline && (
            <AddButton
              icon='grip-horizontal'
              onPress={goToTimeline}
              size={28}
              hitSize={20}
            />
          )}
          {editable && (
            <AddButton
              icon='pen'
              onPress={goToEditBook}
              size={28}
              hitSize={20}
            />
          )}
        </View>
      </ImageBackground>
    </ShellButton>
  )
}
