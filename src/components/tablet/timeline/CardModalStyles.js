import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import Fonts from '../../../fonts'
import FormStyles from '../../shared/form/Styles'

const {
  baseMargin,
  doubleBaseMargin,
  section,
  cornerRadius,
  screenHeight,
  buttonRadius
} = Metrics
const { style, size } = Fonts
const {
  gray,
  white,
  orange,
  textGray,
  lightGray,
  textLightGray,
  lightenGray,
  cloudWhite,
  borderGray,
  textBlack,
  cloudGray
} = Colors

export default ScaledSheet.create({
  ...FormStyles,
  breadCrumbs: {
    backgroundColor: cloudWhite,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: borderGray,
    borderRadius: cornerRadius
  },
  crumb: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: baseMargin,
    paddingVertical: baseMargin,
    paddingRight: doubleBaseMargin,
    maxWidth: '50%'
  },
  chapterText: {
    ...style.bold,
    fontSize: size.small,
    color: textLightGray
  },
  crumbIcon: {
    fontSize: size.tiny,
    color: textLightGray,
    marginTop: 4,
    marginLeft: baseMargin / 2
  },
  divider: {
    width: 1.5,
    backgroundColor: borderGray,
    height: '100%',
    transform: [{ rotate: '15deg' }]
  }
})
