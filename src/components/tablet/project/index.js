import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Project from './Project'
import styles from './ProjectStyles'

export default (props) => {
  return (
    <SafeAreaView style={styles.background}>
      <ErrorBoundary>
        <Project
          navigation={props.navigation}
          openDrawer={props.route?.params?.openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
