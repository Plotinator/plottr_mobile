import React from 'react'
import { View, ImageBackground } from 'react-native'
import { t } from 'plottr_locales'
import { Text, IconButton, AddButton, ShellButton } from '../../shared/common'
import styles from './BookStyles'
import Images from '../../../images'
import Metrics from '../../../utils/Metrics'

const { BOOK } = Images
const { ifTablet } = Metrics

export default function Book(props) {
  const {
    style,
    editable,
    noTimeline,
    noOutline,
    book,
    onPress,
    size = '33%',
    image = null,
    book: { id, title },
    navigateToOutline,
    navigateToDetails,
    navigateToTimeline,
    onDeleteBook,
    children
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
  const bookStyles = [styles.book, { width: size }, style]
  const fontSize = ifTablet('tiny', 'regular')
  const bookTitle = title || t('Untitled')
  const actions = (
    <View
      key='actions'
      style={[styles.actions, !editable && styles.centerButtons]}>
      {onDeleteBook && (
        <IconButton
          name='trash'
          color='lightenGray'
          size={11}
          onPress={deleteBook}
          style={styles.trashIcon}
          buttonStyle={styles.trashButton}
        />
      )}
      {!noOutline && (
        <AddButton
          icon='stream'
          onPress={goToOutline}
          size={ifTablet(28, 25)}
          hitSize={20}
        />
      )}
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
          size={ifTablet(28, 25)}
          hitSize={20}
        />
      )}
    </View>
  )

  // imageWrapper
  return (
    <ShellButton
      onPress={onPress || goToTimeline}
      style={bookStyles}
      noninteractive={!goToTimeline}>
      <ImageBackground
        source={BOOK}
        style={styles.bookImage}
        resizeMode='contain'>
        <ImageBackground source={image} style={styles.imageWrapper}>
          {children || [
            !image && (
              <View key='title' style={styles.titleWrapper}>
                <Text style={styles.bookTitle} center>
                  {bookTitle}
                </Text>
              </View>
            ),
            actions
          ]}
        </ImageBackground>
      </ImageBackground>
    </ShellButton>
  )
}
