import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, cornerRadius, screenWidth } = Metrics
const { style, size } = Fonts
const { warmBG, warmTextGray, warmWhiteBG, lightenGray } = Colors
const windowWidth = screenWidth * 0.75

export default ScaledSheet.create({
  container: {
    maxWidth: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: baseMargin,
    paddingBottom: 0
  },
  title: {
    ...style.bold,
    fontSize: size.tiny,
    color: warmTextGray
  },
  subtitle: {
    ...style.italic,
    fontSize: size.tiny,
    color: warmTextGray
  },
  rowItems: {
    // flex: 1,
    padding: baseMargin,
    paddingTop: baseMargin * 1.5
  },
  rowItem: {
    backgroundColor: warmBG,
    borderRadius: cornerRadius,
    overflow: 'hidden',
    width: '100%',
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    // padding: baseMargin,
    marginBottom: 2
  },
  rowDrag: {
    padding: baseMargin,
    justifyContent: 'center'
  },
  rowName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'center'
  },
  nameInput: {
    // maxWidth: windowWidth * 0.53,
    marginRight: -doubleBaseMargin
  },
  nameText: {
    ...style.bold,
    fontSize: size.tiny,
    color: warmTextGray
  },
  rowType: {},
  typeText: {
    ...style.italic,
    fontSize: size.tiny,
    color: warmTextGray
  },
  rowAction: {
    justifyContent: 'center'
  },
  icon: {
    padding: baseMargin,
    fontSize: size.tiny
  },
  iconLarger: {
    padding: baseMargin * 1.1,
    fontSize: size.small
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: baseMargin,
    paddingVertical: baseMargin
  }
})
