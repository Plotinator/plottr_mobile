import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Outline from './Outline'
import Colors from '../../../utils/Colors'

export default function OutlineHome (props) {
  //gray-9
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.warmBG }}>
      <ErrorBoundary>
        <Outline navigation={props.navigation} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
