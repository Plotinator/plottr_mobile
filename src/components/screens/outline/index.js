import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Outline from './Outline'
import styles from './OutlineStyles'
import SceneDetails from './SceneDetails'

export { SceneDetails }

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
