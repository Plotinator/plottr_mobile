import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Text from './Text'
import ShellButton from './ShellButton'
import styles from './CheckboxStyles'

export default class Checkbox extends Component {
  handlePress = () => {
    const { onPress, onChange, active, data, index } = this.props
    if (onPress) onPress(active, data, index)
    if (onChange) onChange(!active, data, index)
  };
  render () {
    const {
      style,
      textStyle,
      active,
      label,
      onPress,
      children,
      disabled,
      nonInteractive
    } = this.props
    const tickStyles = [styles.checkTick]
    const checkBoxStyles = [styles.checkBox]
    const checkStyles = [style]
    const textStyles = [textStyle, styles.label]
    if (disabled) checkStyles.push({ opacity: 0.5 })
    return (
      <ShellButton
        style={checkStyles}
        onPress={this.handlePress}
        disabled={disabled || nonInteractive}>
        <View style={styles.container}>
          <View style={checkBoxStyles}>
            {active && (
              <Icon type='FontAwesome5' name='check' style={tickStyles} />
            )}
          </View>
          {children || (
            <View style={styles.textContainer}>
              <Text style={textStyles} numberOfLines={3}>
                {label}
              </Text>
            </View>
          )}
        </View>
      </ShellButton>
    )
  }
}
