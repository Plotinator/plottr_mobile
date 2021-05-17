import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import TagsList from './TagsList'
import Colors from '../../../utils/Colors'

export default function TagsHome (props) {
  //gray-9
  return <SafeAreaView style={{flex: 1, backgroundColor: Colors.warmWhiteBG }}>
    <ErrorBoundary>
      <TagsList navigation={props.navigation}/>
    </ErrorBoundary>
  </SafeAreaView>
}
