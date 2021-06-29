import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import CharactersList from './CharactersList'
import Colors from '../../../utils/Colors'

export default function CharactersHome(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.warmWhiteBG }}>
      <ErrorBoundary>
        <CharactersList navigation={props.navigation} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
