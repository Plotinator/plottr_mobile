import React, { useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Project from './Project'
import Colors from '../../../utils/Colors'

export default function ProjectHome (props) {
  //gray-9
  return <SafeAreaView style={{flex: 1, backgroundColor: Colors.warmBG }}>
    <ErrorBoundary>
      <Project navigation={props.navigation} />
    </ErrorBoundary>
  </SafeAreaView>
}
