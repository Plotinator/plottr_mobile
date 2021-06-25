import React from 'react'
import { ShellButton, IconButton } from '../shared/common'
import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../utils/Metrics'
import Colors from '../../utils/Colors'

export default function DrawerButton({ padded = true, onPress, openDrawer }) {
  return (
    <ShellButton
      onPress={onPress || openDrawer}
      style={[styles.button, padded && styles.padded]}
      hitSize={30}>
      <IconButton name='bars' style={styles.icon} />
    </ShellButton>
  )
}

const styles = ScaledSheet.create({
  button: {
    marginRight: Metrics.doubleBaseMargin
  },
  icon: {
    fontSize: Metrics.ifTablet('18@ms', '24@ms'),
    color: Colors.textGray
  },
  padded: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    padding: Metrics.baseMargin
  }
})
