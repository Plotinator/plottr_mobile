import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import Colors from '../../../utils/Colors'

const { borderGray, darkGray, textGray, white, orange, green, red } = Colors
const {
  ifTablet,
  section,
  baseMargin,
  buttonRadius,
  doubleBaseMargin,
  doubleSection,
  screenHeight,
  screenWidth,
  warmWhiteBG,
  warmBG
} = Metrics
const { size, style } = Fonts

export default ScaledSheet.create({
  shade: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000033',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogBox: {
    backgroundColor: Colors.warmWhiteBG,
    borderRadius: buttonRadius,
    minHeight: 200,
    minWidth: 200,
    maxWidth: '90%',
    alignItems: 'center',
    height: 'auto',
    width: 'auto'
  },
  dialogTitle: {
    flexDirection: 'row',
    minHeight: 40,
    marginTop: baseMargin,
    padding: baseMargin,
    paddingTop: baseMargin * 1.2,
    marginBottom: baseMargin / 2
  },
  titleText: {
    ...style.bold,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: ifTablet(size.h6, size.h4)
  },
  dialogBody: {
    paddingHorizontal: section,
    paddingBottom: section,
    alignItems: 'center'
  },
  closeButton: {
    padding: baseMargin * 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0
  },
  closeIcon: {
    fontSize: ifTablet(size.h4, size.h2),
    paddingBottom: 0,
    color: textGray
  }
})
