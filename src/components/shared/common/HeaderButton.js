import React from 'react'
import { View } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import { t } from 'plottr_locales'
import { Icon } from 'native-base'
import styles from './HeaderButtonStyles'

export default (props) => {
  const { style, title = t('Categories'), icon = 'list', ...otherProps } = props
  return (
    <ShellButton {...otherProps} style={[styles.container, style]}>
      <Icon type='FontAwesome5' name={icon} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </ShellButton>
  )
}
