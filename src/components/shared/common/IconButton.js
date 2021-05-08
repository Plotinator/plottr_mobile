import React from 'react'
import Colors from '../../../utils/Colors'
import Icon from './Icon'
import ShellButton from './ShellButton'

export default (props) => {
  const {
    style,
    buttonStyle,
    name = 'user',
    color = 'orange',
    hitSize = 10,
    size = 12,
    onPress,
    data
  } = props
  const actualColor = Colors[color] || color
  const hitArea = {
    top: hitSize,
    bottom: hitSize,
    left: hitSize,
    right: hitSize
  }
  return (
    <ShellButton
      data={data}
      onPress={onPress}
      style={buttonStyle}
      hitSlop={hitArea}
      noninteractive={!onPress}>
      <Icon name={name} color={actualColor} size={size} style={style} />
    </ShellButton>
  )
}
