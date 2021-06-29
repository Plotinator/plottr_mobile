import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../ErrorBoundary'
import Outline from './Outline'
import styles from './OutlineStyles'

export default (props) => {
  const { navigation } = props
  const openDrawer = props.route?.params?.openDrawer
  return (
    <SafeAreaView style={styles.background}>
      <ErrorBoundary>
        <Outline navigation={navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
