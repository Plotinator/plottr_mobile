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
  screenWidth
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
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogBox: {
    backgroundColor: white,
    borderRadius: buttonRadius / ifTablet(1.5, 1),
    // minHeight: 120,
    minWidth: 200,
    maxWidth: ifTablet('50%', '80%'),
    alignItems: 'center',
    height: 'auto',
    width: 'auto'
  },
  dialogTitle: {
    flexDirection: 'row',
    minHeight: 40,
    padding: baseMargin,
    paddingTop: doubleBaseMargin
  },
  titleText: {
    ...style.bold,
    fontSize: ifTablet(size.h5, size.h4),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogBody: {
    paddingHorizontal: section,
    alignItems: 'center'
  },
  bodyText: {
    fontSize: ifTablet(size.h6, size.h5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    maxWidth: '55%'
  },
  inputText: {
    ...style.boldItalic
  },
  closeButton: {
    padding: baseMargin * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -baseMargin / 2,
    right: -baseMargin / 4
  },
  closeIcon: {
    fontSize: ifTablet(size.h4, size.h3),
    paddingBottom: 0,
    color: textGray
  },
  dialogActions: {
    flexDirection: 'row',
    marginTop: baseMargin,
    paddingTop: baseMargin,
    paddingHorizontal: doubleBaseMargin,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: section
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: orange,
    borderWidth: 1,
    borderColor: orange,
    padding: baseMargin,
    paddingHorizontal: doubleBaseMargin * 0.66,
    marginHorizontal: baseMargin / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonRadius / ifTablet(1.5, 1.25)
  },
  positiveButton: {
    backgroundColor: orange
  },
  outlined: {
    backgroundColor: 'transparent'
  },
  dangerButton: {
    backgroundColor: red
  },
  actionIcon: {
    marginRight: baseMargin,
    color: white,
    fontSize: size.h5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  orangeText: {
    color: orange
  },
  buttonText: {
    ...style.bold,
    fontSize: ifTablet(size.h6, size.h5)
  }
})
