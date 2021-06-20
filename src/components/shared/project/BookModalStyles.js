import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import Fonts from '../../../fonts'
import FormStyles from '../form/Styles'

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
    justifyContent: 'flex-end'
  },
  bookContainer: {
    paddingTop: doubleBaseMargin,
    paddingLeft: doubleBaseMargin * 0.83,
    marginBottom: -section,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraButton: {
    marginRight: baseMargin,
    marginBottom: baseMargin
  }
})
