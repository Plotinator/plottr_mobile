import React, { Component } from 'react'
import styles from './AddButtonStyles'
import Colors from '../../../utils/Colors'
import { Icon } from 'native-base'
import ShellButton from './ShellButton'

export default class AddButton extends Component {
  render () {
    const {
      style,
      data,
      color = 'orange',
      size = 26,
      hitSize = 5,
      outlined,
      onPress,
      animated,
      animation
    } = this.props
    const buttonStyles = [styles.plusButton]
    const iconStyles = [styles.plusIcon]
    const actualColor = Colors[color] || color
    const hitArea = {
      top: hitSize,
      bottom: hitSize,
      left: hitSize,
      right: hitSize
    }

    if (color) {
      buttonStyles.push({ backgroundColor: actualColor })
      buttonStyles.push({ borderColor: actualColor })
    }

    if (size) {
      buttonStyles.push({ width: size, height: size })
      iconStyles.push({ fontSize: size * 0.45 })
    }

    if (outlined) {
      buttonStyles.push(styles.outlined)
      color && iconStyles.push({ color: actualColor })
      size && iconStyles.push({ fontSize: size * 0.35 })
    }

    buttonStyles.push(style)

    return (
      <ShellButton
        data={data}
        onPress={onPress}
        style={buttonStyles}
        hitSlop={hitArea}
        animation={animated ? animation : null}>
        <Icon type='FontAwesome5' name='plus' style={iconStyles} />
      </ShellButton>
    )
  }
}