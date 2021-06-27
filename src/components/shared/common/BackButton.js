import React, { Component } from 'react'
import styles from './AddButtonStyles'
import ShellButton from './ShellButton'
import IconButton from './IconButton'
import Text from './Text'
import { t } from 'plottr_locales'

export default class AddButton extends Component {
  render() {
    const {
      style,
      data,
      backText = t('Back'),
      icon = 'chevron-left',
      color = 'orange',
      iconSize = 20,
      size = 16,
      hitSize = 20,
      onPress,
      animated,
      animation
    } = this.props
    const buttonStyles = [{ flexDirection: 'row', alignItems: 'center' }, style]
    return (
      <ShellButton
        data={data}
        noninteractive={!onPress}
        style={buttonStyles}
        hitSize={hitSize}
        onPress={onPress}
        animation={animated ? animation : null}>
        <IconButton name={icon} size={iconSize} color={color} />
        <Text color={color} fontSize={size}>
          {' '}
          {backText}
        </Text>
      </ShellButton>
    )
  }
}
