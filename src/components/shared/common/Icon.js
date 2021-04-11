import React from 'react'
import Colors from '../../../utils/Colors'
import { Icon } from 'native-base'
import { moderateScale } from 'react-native-size-matters'

export default props => {
  const {
    style,
    type = 'FontAwesome5',
    name = 'user',
    color = 'orange',
    size = 12
  } = props
  const actualColor = Colors[color] || color
  const iconStyles = []

  iconStyles.push({ color: actualColor })
  iconStyles.push({ fontSize: moderateScale(size) })
  iconStyles.push(style)

  return <Icon type={type} name={name} style={iconStyles} />
}
