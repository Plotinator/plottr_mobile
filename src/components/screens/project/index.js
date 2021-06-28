import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Project from './Project'
import styles from './ProjectStyles'

export default (props) => {
  const { navigation } = props
  const openDrawer = props.route?.params?.openDrawer
  return (
    <SafeAreaView style={styles.background}>
      <ErrorBoundary>
        <Project navigation={navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
