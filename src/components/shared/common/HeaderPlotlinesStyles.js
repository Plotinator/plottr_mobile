import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import { Metrics, Colors, Constants } from '../../../utils'

const { ATTRIBUTE_HEIGHT } = Constants
const {
  baseMargin,
  doubleBaseMargin,
  cornerRadius,
  screenWidth,
  ifTablet
} = Metrics
const { style, size } = Fonts
const { warmBG, warmTextGray, warmWhiteBG, lightenGray } = Colors
const windowWidth = screenWidth * ifTablet(0.75, 0.95)

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
    fontSize: ifTablet(size.tiny, size.h5),
    color: warmTextGray
  },
  subtitle: {
    ...style.italic,
    textAlign: 'center',
    fontSize: ifTablet(size.tiny),
    color: warmTextGray,
    marginBottom: baseMargin
  },
  rowItems: {
    paddingHorizontal: ifTablet(baseMargin)
  },
  rowItem: {
    backgroundColor: warmBG,
    borderRadius: cornerRadius * ifTablet(1, 1.5),
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
    height: ATTRIBUTE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  rowDrag: {
    paddingHorizontal: baseMargin * ifTablet(1, 1.5),
    paddingVertical: baseMargin * ifTablet(1, 0.9),
    justifyContent: 'center'
  },
  drag: {
    fontSize: ifTablet(null, size.regular)
  },
  rowName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameInput: {
    marginRight: -doubleBaseMargin
  },
  nameText: {
    ...style.bold,
    fontSize: ifTablet(size.tiny),
    color: warmTextGray
  },
  rowType: {},
  typeText: {
    ...style.italic,
    fontSize: ifTablet(size.tiny),
    color: warmTextGray
  },
  rowAction: {
    justifyContent: 'center',
    paddingRight: baseMargin / 4
  },
  colorButton: {
    justifyContent: 'center',
    paddingHorizontal: baseMargin / 4
  },
  icon: {
    padding: baseMargin,
    fontSize: ifTablet(size.tiny)
  },
  iconLarger: {
    padding: baseMargin * 1.1,
    fontSize: ifTablet(size.small, size.medium)
  },
  addButton: {
    marginTop: baseMargin
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: baseMargin
  }
})