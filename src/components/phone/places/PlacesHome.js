import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import PlacesList from './PlacesList'
import Colors from '../../../utils/Colors'

export default function PlacesHome (props) {
  //gray-9
  return <SafeAreaView style={{flex: 1, backgroundColor: Colors.warmWhiteBG }}>
    <ErrorBoundary>
      <PlacesList navigation={props.navigation}/>
    </ErrorBoundary>
  </SafeAreaView>
}
