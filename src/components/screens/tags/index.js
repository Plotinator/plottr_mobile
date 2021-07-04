import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Tags from './Tags'
import styles from './TagsStyles'

export default function TagsHome(props) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ErrorBoundary>
        <Tags
          navigation={props.navigation}
          openDrawer={props.route?.params?.openDrawer}
        />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
