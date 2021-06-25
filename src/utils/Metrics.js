import { Dimensions, Platform } from 'react-native'
import {
  verticalScale,
  moderateVerticalScale,
  moderateScale
} from 'react-native-size-matters'
import { isTablet } from 'react-native-device-info'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const { width, height } = Dimensions.get('window')
const IS_IOS = Platform.OS === 'ios'
const IS_TABLET = isTablet()
const ifIOS = (is, isnt) => (IS_IOS ? is : isnt)
const ifTablet = (is, isnt) => (IS_TABLET ? is : isnt)

const Metrics = {
  IS_IOS,
  IS_ANDROID: !IS_IOS,
  IS_TABLET,
  ifIOS,
  ifTablet,
  ifIphoneX,
  section: moderateVerticalScale(25),
  baseMargin: moderateVerticalScale(10),
  doubleSection: moderateVerticalScale(50),
  doubleBaseMargin: moderateVerticalScale(20),
  screenWidth: width < height ? width : height - ifIOS(0, 23),
  screenHeight: width < height ? height - ifIOS(0, 23) : width,
  headerHeight: moderateVerticalScale(70),
  footerHeight: moderateVerticalScale(70),
  buttonRadius: moderateScale(12),
  cornerRadius: moderateScale(8)
}

export default Metrics
