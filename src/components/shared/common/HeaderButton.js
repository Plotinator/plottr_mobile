import React, { Component } from 'react'
import { View } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import { t } from 'plottr_locales'
import { Icon } from 'native-base'
import styles from './HeaderButtonStyles'

export default class HeaderButton extends Component {
  render() {
    const {
      style,
      title = t('Categories'),
      icon = 'list',
      count,
      ...otherProps
    } = this.props
    return (
      <ShellButton {...otherProps} style={[styles.container, style]}>
        <Icon type='FontAwesome5' name={icon} style={styles.icon} />
        <Text style={styles.text}>{title}</Text>
        {count && (
          <View style={styles.count}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
      </ShellButton>
    )
  }
}
