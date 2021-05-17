import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import NotesList from './NotesList'
import Colors from '../../../utils/Colors'

export default function NotesHome (props) {
  //gray-9
  return <SafeAreaView style={{flex: 1, backgroundColor: Colors.warmBG }}>
    <ErrorBoundary>
      <NotesList navigation={props.navigation}/>
    </ErrorBoundary>
  </SafeAreaView>
}
