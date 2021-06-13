import React, { Component } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Metrics from '../../../utils/Metrics'

const AnimeTouchableOpacity = Animatable.createAnimatableComponent(
  TouchableOpacity
)
const AnimeTouchableNoFeedback = Animatable.createAnimatableComponent(
  TouchableWithoutFeedback
)
const { baseMargin } = Metrics

export default class ShellButton extends Component {
  handlePress = () => {
    const { data, onPress } = this.props
    onPress && onPress(data)
  }

  render() {
    const {
      style,
      faded,
      padded,
      children,
      disabled,
      noFeedback,
      noninteractive,
      hitSize = 5,
      ...otherProps
    } = this.props
    const stylesArray = [style]
    const TouchableComponent = noFeedback
      ? AnimeTouchableNoFeedback
      : AnimeTouchableOpacity
    const hitArea = {
      top: hitSize,
      bottom: hitSize,
      left: hitSize,
      right: hitSize
    }
    if (disabled || faded) stylesArray.push({ opacity: 0.5 })
    if (padded) stylesArray.push({ padding: baseMargin })

    return (
      <TouchableComponent
        {...otherProps}
        hitSlop={hitArea}
        style={stylesArray}
        disabled={disabled || noninteractive}
        onPress={this.handlePress}>
        {children}
      </TouchableComponent>
    )
  }
}
