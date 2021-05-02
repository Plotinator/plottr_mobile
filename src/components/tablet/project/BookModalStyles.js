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
  centerTitle: {
    width: '100%',
    alignItems: 'center'
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: section * 1.1,
    paddingBottom: section * 1.2,
  },
  bookContainer: {
    paddingTop: doubleBaseMargin,
    paddingLeft: doubleBaseMargin * .83,
    marginBottom: -section,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
