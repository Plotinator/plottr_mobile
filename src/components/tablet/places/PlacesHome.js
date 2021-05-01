import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Places from './Places'

export default function PlacesHome (props) {
  //gray-9
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ErrorBoundary>
        <Places
          navigation={props.navigation}
          openDrawer={props.route?.params?.openDrawer}
        />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
