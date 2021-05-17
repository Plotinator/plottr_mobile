import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import Colors from '../../../utils/Colors'

const { borderGray, darkGray, textGray, white, orange, green, red } = Colors
const {
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
    borderRadius: buttonRadius,
    // minHeight: 120,
    minWidth: 200,
    maxWidth: '90%',
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogBody: {
    paddingHorizontal: section,
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
    top: 0,
    right: 0
  },
  closeIcon: {
    fontSize: size.h1,
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
    borderRadius: buttonRadius
  },
  positiveButton: {
    backgroundColor: orange
  },
  outlined: {
    backgroundColor: 'transparent',
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
  }
})
