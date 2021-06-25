import React from 'react'
import { View } from 'react-native'
import DrawerButton from '../../ui/DrawerButton'
import styles from './ToolbarStyles'
import { ShellButton, IconButton } from '../common'

export default (props) => {
  const { onPressDrawer, children, style } = props
  return (
    <View style={[styles.container, style]}>
      {onPressDrawer && (
        <ShellButton onPress={onPressDrawer} style={styles.button} hitSize={30}>
          <IconButton name='bars' style={styles.icon} />
        </ShellButton>
      )}
      {children}
    </View>
  )
}
