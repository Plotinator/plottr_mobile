import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import Fonts from '../../../fonts'
import FormStyles from '../../shared/form/Styles'

const {
  ifTablet,
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
  warmWhite,
  lightGray,
  warmWhiteBG,
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
    backgroundColor: warmWhite,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: borderGray,
    borderRadius: cornerRadius
  },
  crumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: baseMargin * ifTablet(1, 1.5),
    paddingVertical: baseMargin,
    paddingRight: doubleBaseMargin,
    maxWidth: '50%'
  },
  chapterText: {
    ...style.bold,
    fontSize: ifTablet(size.small),
    color: textLightGray
  },
  crumbIcon: {
    fontSize: size.tiny,
    color: textLightGray,
    marginTop: ifTablet(4, 0),
    marginLeft: baseMargin / 2
  },
  divider: {
    width: 1.5,
    backgroundColor: borderGray,
    height: '100%',
    transform: [{ rotate: '15deg' }]
  },
  wrapper: {
    marginBottom: baseMargin
  },
  trashButton: {
    fontSize: ifTablet(size.h6, size.h4),
    marginLeft: baseMargin / 2,
    marginTop: doubleBaseMargin
  }
})
