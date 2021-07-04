import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import Fonts from '../../../fonts'
import FormStyles from '../../shared/form/Styles'

const {
  ifTablet,
  baseMargin,
  cornerRadius,
  doubleBaseMargin,
  screenWidth
} = Metrics
const { style, size } = Fonts
const { gray, white, orange, warmGray, warmWhite, warmTextGray } = Colors
const imageSize = (screenWidth - doubleBaseMargin * 2) * ifTablet(0.205, 0.274)

export default ScaledSheet.create({
  ...FormStyles,
  window: {
    ...FormStyles.window,
    width: '90%',
    maxHeight: '80%',
    paddingRight: 0
  },
  titleHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: doubleBaseMargin,
    color: warmTextGray
  },
  titleText: {
    fontSize: size.h5,
    ...style.bold,
    marginRight: baseMargin / 2,
    marginTop: -baseMargin / 4,
    color: warmTextGray
  },
  addButton: {
    marginRight: baseMargin
  },
  images: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    marginRight: imageSize * 0.115,
    marginBottom: imageSize * 0.115,
    borderRadius: cornerRadius * 1.2
    // borderWidth: '2@ms',
    // borderColor: warmWhite
  },
  image: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: cornerRadius
  },
  selected: {
    borderWidth: '2@ms',
    borderColor: orange
  },
  /* Bottom right button */
  bottomRightButton: {
    bottom: 0,
    right: 0,
    position: 'absolute'
  },
  bottomRightShape: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderTopColor: orange,
    borderBottomColor: orange,
    borderLeftColor: 'transparent',
    borderLeftWidth: 40,
    borderBottomWidth: 40,
    borderBottomRightRadius: cornerRadius
  },
  bottomRightIcon: {
    position: 'absolute',
    fontSize: size.nano * 1.2,
    color: 'white',
    bottom: 6,
    right: 5
  },
  /* Bottom left button */
  bottomLeftButton: {
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  bottomLeftShape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderTopColor: orange,
    borderBottomColor: orange,
    borderRightColor: 'transparent',
    borderRightWidth: 40,
    borderBottomWidth: 40,
    borderBottomLeftRadius: cornerRadius
  },
  bottomLeftIcon: {
    position: 'absolute',
    fontSize: ifTablet(size.nano, size.small),
    color: 'white',
    bottom: 7,
    left: 6
  },
  actions: {
    ...FormStyles.actions,
    paddingRight: doubleBaseMargin,
    paddingTop: baseMargin
  }
})
