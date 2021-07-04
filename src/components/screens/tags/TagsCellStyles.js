import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'

const { baseMargin, doubleBaseMargin, cornerRadius, ifTablet } = Metrics
const { style, size } = Fonts

export default ScaledSheet.create({
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ifTablet(150, 135),
    height: ifTablet(95, 75),
    backgroundColor: Colors.warmWhite,
    borderWidth: ifTablet(3, 2),
    borderRadius: cornerRadius * ifTablet(1, 1.5),
    padding: baseMargin / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    marginHorizontal: baseMargin,
    marginVertical: baseMargin
  },
  focused: {
    borderWidth: ifTablet(3, 2),
    zIndex: 9,
    backgroundColor: Colors.warmWhiteBG
  },
  blocker: {
    zIndex: 9,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  tagInner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: baseMargin / 2,
    paddingVertical: baseMargin / 4
  },
  tagTextInput: {
    ...Fonts.style.bold,
    fontSize: ifTablet(size.h8, size.h6) * 1.1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.warmTextDarkGray,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1
  },
  /* Bottom right button */
  bottomRightButton: {
    zIndex: 9,
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
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
    borderLeftWidth: 30,
    borderBottomWidth: 30
  },
  bottomRightIcon: {
    position: 'absolute',
    fontSize: ifTablet(size.micro, size.small) * 1.1,
    color: 'white',
    bottom: 2,
    right: 0
  },
  /* Top right button */
  topRightButton: {
    zIndex: 9,
    top: 0,
    right: 0,
    position: 'absolute'
  },
  topRightShape: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
    borderLeftWidth: 30,
    borderTopWidth: 30
  },
  topRightIcon: {
    position: 'absolute',
    transform: [{ rotate: '270deg' }],
    fontSize: ifTablet(size.micro, size.small) * 1.2,
    color: 'white',
    top: 0,
    right: 2
  },
  /* Bottom left button */
  bottomLeftButton: {
    zIndex: 9,
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
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderRightColor: 'transparent',
    borderRightWidth: 32,
    borderBottomWidth: 32
  },
  bottomLeftIcon: {
    position: 'absolute',
    fontSize: ifTablet(size.micro, size.small),
    color: 'white',
    bottom: 2,
    left: 3
  },
  /* Top left button */
  topLeftButton: {
    zIndex: 9,
    top: 0,
    left: 0,
    position: 'absolute'
  },
  topLeftShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderRightColor: 'transparent',
    borderRightWidth: 32,
    borderTopWidth: 32
  },
  topLeftIcon: {
    position: 'absolute',
    fontSize: ifTablet(size.micro, size.small) * 1.2,
    color: 'white',
    top: 2,
    left: 1
  }
})
