import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Notes from './Notes'
import styles from './NotesStyles'
import NoteDetails from './NoteDetails'

export { NoteDetails }

export default function NotesHome(props) {
  const { navigation } = props
  const openDrawer = props.route?.params?.openDrawer
  return (
    <SafeAreaView style={styles.container}>
      <ErrorBoundary>
        <Notes navigation={navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
