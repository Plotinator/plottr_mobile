import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import NotesList from './NotesList'
import Colors from '../../../utils/Colors'

export default function NotesHome(props) {
  //gray-9
  const openDrawer = props.route?.params?.openDrawer
  console.log('openDrawer', openDrawer)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.warmWhite }}>
      <ErrorBoundary>
        <NotesList navigation={props.navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
