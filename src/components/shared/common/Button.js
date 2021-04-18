import React, { Component } from 'react'
import { TouchableOpacity, Keyboard, View } from 'react-native'
import styles from './ButtonStyles'
import Text from './Text'
import Colors from '../../../utils/Colors'
import * as Animatable from 'react-native-animatable'

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(
  TouchableOpacity
)

export default class Button extends Component {
  handlePress = () => {
    Keyboard.dismiss()
    const { data, onPress } = this.props
    onPress && onPress(data)
  }

  render () {
    const {
      style,
      block,
      tight,
      small,
      textColor,
      textStyle,
      buttonText,
      children,
      onPress,
      faded,
      disabled,
      bordered,
      buttonColor = 'orange',
      wrapperStyle,
      fontStyle = 'bold',
      fontSize = 'regular'
    } = this.props
    const stylesArray = [styles.button]
    const textStylesArray = [styles.text]
    const wrapperStylesArray = [styles.textWrapper]
    const buttonTextRender = buttonText || children
    const colorProp = Colors[buttonColor] || buttonColor

    if (style) stylesArray.push(style)
    if (block) stylesArray.push(styles.block)
    if (textStyle) textStylesArray.push(textStyle)
    if (wrapperStyle) wrapperStylesArray.push(wrapperStyle)
    if (tight) wrapperStylesArray.push(styles.tightWrapper)
    if (small) wrapperStylesArray.push(styles.smallWrapper)
    if (disabled || faded) stylesArray.push(styles.faded)
    if (colorProp) {
      stylesArray.push({
        backgroundColor: colorProp,
        borderColor: colorProp
      })
    }
    if (textColor) {
      textStylesArray.push({ color: Colors[textColor] || textColor })
    }
    if (bordered) {
      stylesArray.push({
        backgroundColor: 'transparent'
      })
      !textColor &&
        textStylesArray.push({ color: colorProp })
    }

    return (
      <AnimatableTouchableOpacity
        {...this.props}
        style={stylesArray}
        onPress={this.handlePress}
        disabled={disabled}>
        <View style={wrapperStylesArray}>
          <Text
            fontStyle={fontStyle}
            fontSize={fontSize}
            style={textStylesArray}>
            {buttonTextRender}
          </Text>
        </View>
      </AnimatableTouchableOpacity>
    )
  }
}
