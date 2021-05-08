import React from 'react'
import { View } from 'native-base'
import DrawerButton from '../../ui/DrawerButton'
import styles from './ToolbarStyles'

export default (props) => {
  const { onPressDrawer, children } = props
  return (
    <View style={styles.container}>
      <DrawerButton openDrawer={onPressDrawer} />
      {children}
    </View>
  )
}
