import React from 'react'
import { SafeAreaView } from 'react-native'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Characters from './Characters'
import styles from './CharactersStyles'
import CharacterDetails from './CharacterDetails'

export { CharacterDetails }

export default function CharactersHome(props) {
  const { navigation } = props
  const openDrawer = props.route?.params?.openDrawer
  return (
    <SafeAreaView style={styles.container}>
      <ErrorBoundary>
        <Characters navigation={navigation} openDrawer={openDrawer} />
      </ErrorBoundary>
    </SafeAreaView>
  )
}
