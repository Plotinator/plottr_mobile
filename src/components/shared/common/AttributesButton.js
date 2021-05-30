import React, { Component } from 'react'
import { View } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import { t } from 'plottr_locales'
import { Icon } from 'native-base'
import styles from './AttributesButtonStyles'

export default class AttributesButton extends Component {
  render () {
    const { style, ...otherProps } = this.props
    return (
      <ShellButton {...otherProps} style={[styles.container, style]}>
        <Icon type='FontAwesome5' name='frown' style={styles.smile} />
        <View style={styles.frownBase}>
          <Icon type='FontAwesome5' name='smile' style={styles.frown} />
        </View>
        <Text style={styles.text}>{t('Attributes')}</Text>
      </ShellButton>
    )
  }
}
