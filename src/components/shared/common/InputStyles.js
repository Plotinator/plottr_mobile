import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import Colors from '../../../utils/Colors'
import { isTablet } from 'react-native-device-info'

const onTablet = isTablet()
const {
  white,
  textGray,
  textBlack,
  blackGray,
  inputWhite,
  inputBorderWhite,
  inputBorder,
  warmWhiteBG
} = Colors
const { baseMargin, doubleBaseMargin, cornerRadius, IS_IOS } = Metrics
const { size, style } = Fonts

export default ScaledSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: inputBorder,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  input: {
    ...style.inputText,
    color: textGray,
    paddingVertical: IS_IOS ? 5 : null,
    minHeight: '35@ms',
    fontSize: size.h4,
    width: '100%'
  },
  multiline: {
    height: 'auto',
    paddingTop: baseMargin,
    maxHeight: '120@ms'
  },
  inputSmall: {
    fontSize: size.small,
    lineHeight: size.small * 1.6
  },
  bordered: {
    borderColor: inputBorder,
    borderRadius: cornerRadius,
    borderWidth: 0.5,
    paddingVertical: baseMargin / 2,
    paddingHorizontal: doubleBaseMargin,
    backgroundColor: blackGray
  },
  friendly: {
    backgroundColor: inputWhite,
    borderColor: inputBorderWhite,
    borderRadius: cornerRadius * 1.75,
    borderWidth: 1
  },
  friendlyText: {
    textAlign: 'center',
    paddingVertical: baseMargin * 1.25,
    paddingHorizontal: doubleBaseMargin
  },
  center: {
    textAlign: 'center'
  },
  icon: {},
  darkMode: {
    color: 'white'
  },
  label: {
    paddingRight: baseMargin / 1.75,
    paddingTop: baseMargin / 2,
    marginBottom: -baseMargin * (onTablet ? 1.5 : 1.25),
    // paddingVertical: baseMargin * 1.125,
    width: '100%'
  },
  labelText: {
    ...style.semiBold,
    marginTop: onTablet ? 0 : -3,
    fontSize: size.small,
    paddingBottom: 2
  },
  reset: {
    borderBottomWidth: 0,
    paddingTop: 0
  },
  resetInput: {
    paddingVertical: 0,
    paddingTop: 0,
    minHeight: 0
  },
  inset: {
    backgroundColor: warmWhiteBG,
    borderColor: inputBorderWhite,
    borderRadius: cornerRadius,
    borderWidth: 1,
    paddingHorizontal: baseMargin
  },
  insetText: {
    paddingVertical: baseMargin,
    paddingBottom: baseMargin * 1.2,
    color: textBlack,
    minHeight: onTablet ? '35@ms' : '44@ms',
    marginTop: onTablet ? baseMargin / 4 : 0,
    marginBottom: -baseMargin / 2.25
  },
  rounded: {
    backgroundColor: warmWhiteBG,
    borderColor: inputBorderWhite,
    borderRadius: cornerRadius,
    borderWidth: 1,
    paddingHorizontal: baseMargin,
    minHeight: '35@ms',
  },
  roundedText: {
    paddingBottom: baseMargin * 1.2,
    color: textBlack,
  },
  labelUp: {
    marginTop: 0,
    marginBottom: 0
  },
  labelDown: {
    marginTop: '26@vs',
    marginBottom: '-26@vs'
  }
})
