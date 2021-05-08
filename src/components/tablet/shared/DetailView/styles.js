import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../../utils/Metrics'
import Colors from '../../../../utils/Colors'
import Fonts from '../../../../fonts'
import FormStyles from '../../../shared/form/Styles'

const {
  baseMargin,
  doubleBaseMargin,
  section,
  cornerRadius,
  headerHeight,
  footerHeight,
  screenHeight,
  buttonRadius,
  doubleSection
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
  cloudGray,
  warmBG,
  warmWhiteBG
} = Colors

export default ScaledSheet.create({
  ...FormStyles,
  container: {
    flex: 1,
    backgroundColor: warmBG,
    padding: baseMargin,
    paddingLeft: 0
  },
  subContainer: {
    // dont remove subContainer
    // editButtonContainer needs it
    // for dynamic positioning
  },
  scroller: {
    overflow: 'hidden',
    borderRadius: cornerRadius
  },
  detailsWrapper: {
    backgroundColor: warmWhiteBG,
    padding: baseMargin * 1.5,
    borderRadius: cornerRadius,
    minHeight: 50,
    paddingBottom: doubleSection
  },
  detailsBlock: {
    marginBottom: baseMargin
  },
  detailsBlockHeading: {
    marginBottom: baseMargin * 0.05
  },
  editButtonContainer: {
    justifyContent: 'flex-end',
    paddingBottom: doubleBaseMargin,
    position: 'absolute',
    height: '100%',
    maxHeight: screenHeight - headerHeight - footerHeight - 35,
    top: 0,
    right: doubleBaseMargin
  }
})
