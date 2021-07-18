import { ScaledSheet } from 'react-native-size-matters'
import { Metrics, Colors } from '../../../utils'
import Fonts from '../../../fonts'

const { warmWhiteBG, warmBG } = Colors
const { ifTablet, cornerRadius, baseMargin } = Metrics
const { size, style } = Fonts

export default ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  base: {
    backgroundColor: warmWhiteBG,
    width: '100%',
    height: '80%',
    borderRadius: cornerRadius * 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  contentWrapper: {
    width: '85%',
    height: '80%'
  },
  expressWrapper: {
    width: '100%',
    height: '70%'
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: size.h2,
    height: 37,
    width: 37,
    backgroundColor: warmWhiteBG,
    borderRadius: 20
  },
  closeIcon: {
    fontSize: size.h2
  },
  currentColorWrapper: {
    zIndex: -1,
    backgroundColor: warmBG,
    borderRadius: cornerRadius * 1.5,
    marginTop: baseMargin,
    marginHorizontal: baseMargin,
    padding: baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorSwatch: {
    width: 40,
    height: 40,
    margin: 8,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10
  },
  currentTitle: {
    fontSize: ifTablet(size.h6, size.h4),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})
