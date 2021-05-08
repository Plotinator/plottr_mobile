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
  render () {
    const {
      style,
      faded,
      padded,
      children,
      disabled,
      noFeedback,
      noninteractive,
      ...otherProps
    } = this.props
    const stylesArray = [style]
    const TouchableComponent = noFeedback
      ? AnimeTouchableNoFeedback
      : AnimeTouchableOpacity

    if (disabled || faded) stylesArray.push({ opacity: 0.5 })
    if (padded) stylesArray.push({ padding: baseMargin })

    return (
      <TouchableComponent
        {...otherProps}
        style={stylesArray}
        disabled={disabled || noninteractive}
        onPress={this.handlePress}>
        {children}
      </TouchableComponent>
    )
  }
}
