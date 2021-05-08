import React from 'react'
import {
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import Metrics from '../../../utils/Metrics'

const { ifIOS } = Metrics

export default ({
  scrollerProps = {},
  touchableProps = {},
  viewProps = {},
  avoidKeyboard,
  behavior,
  children
}) => {
  const scroller = (
    <ScrollView keyboardShouldPersistTaps='always' {...scrollerProps}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} {...touchableProps}>
        <View {...viewProps}>{children}</View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
  return avoidKeyboard ? (
    <KeyboardAvoidingView behavior={behavior || ifIOS('padding', 'height')}>
      {scroller}
    </KeyboardAvoidingView>
  ) : (
    scroller
  )
}
