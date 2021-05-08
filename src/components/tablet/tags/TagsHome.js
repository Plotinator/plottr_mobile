import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Tags from './Tags'

export default function TagsHome (props) {
  //gray-9
  return <SafeAreaView style={{flex: 1/*, backgroundColor: 'hsl(210, 36%, 96%)'*/}}>
    <ErrorBoundary>
      <Tags navigation={props.navigation} openDrawer={props.route?.params?.openDrawer} />
    </ErrorBoundary>
  </SafeAreaView>
}