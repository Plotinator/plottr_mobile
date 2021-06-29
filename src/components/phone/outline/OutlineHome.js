import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Outline from './Outline'
// import Outline from '../../shared/outline/'
import Colors from '../../../utils/Colors'

export default function OutlineHome(props) {
  //gray-9
  const openDrawer = props.route?.params?.openDrawer
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.warmWhite }}>
      <ErrorBoundary>
        <Outline navigation={props.navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
