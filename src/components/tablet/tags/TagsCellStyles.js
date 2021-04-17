import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'

const { baseMargin, doubleBaseMargin } = Metrics

export default ScaledSheet.create({
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 95,
    backgroundColor: 'hsl(210, 36%, 96%)', // gray-9
    borderWidth: 3,
    borderRadius: Metrics.cornerRadius,
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
    marginVertical: baseMargin,
  },
  focused: {
    borderWidth: 3,
    zIndex: 9,
    backgroundColor: 'white'
  },
  blocker: {
    zIndex: 9,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
    ...Fonts.style.semiBold,
    fontSize: Fonts.size.h8 * 1.1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.darkGray,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
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
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
    borderLeftWidth: 30,
    borderBottomWidth: 30,
  },
  bottomRightIcon: {
    position: 'absolute',
    fontSize: Fonts.size.micro * 1.1,
    color: 'white',
    bottom: 2,
    right: 0
  },
  /* Top right button */
  topRightButton: {
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
    borderTopWidth: 30,
  },
  topRightIcon: {
    position: 'absolute',
    transform: [{ rotate: '270deg' }],
    fontSize: Fonts.size.micro * 1.2,
    color: 'white',
    top: 0,
    right: 2
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
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderRightColor: 'transparent',
    borderRightWidth: 32,
    borderBottomWidth: 32,
  },
  bottomLeftIcon: {
    position: 'absolute',
    fontSize: Fonts.size.micro,
    color: 'white',
    bottom: 2,
    left: 3
  },
  /* Top left button */
  topLeftButton: {
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
    borderTopWidth: 32,
  },
  topLeftIcon: {
    position: 'absolute',
    fontSize: Fonts.size.micro * 1.2,
    color: 'white',
    top: 2,
    left: 1
  }
})
