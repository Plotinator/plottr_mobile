import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Places from './Places'
import styles from './PlacesStyles'
import PlaceDetails from './PlaceDetails'

export { PlaceDetails }

export default function PlacesHome(props) {
  const { navigation } = props
  const openDrawer = props.route?.params?.openDrawer
  return (
    <SafeAreaView style={styles.container}>
      <ErrorBoundary>
        <Places navigation={navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
