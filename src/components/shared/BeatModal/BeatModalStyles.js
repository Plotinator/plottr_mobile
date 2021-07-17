import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { ifTablet, baseMargin, doubleBaseMargin, cornerRadius } = Metrics
const { size } = Fonts

export default ScaledSheet.create({
  container: {
    // minWidth: 240,
    alignItems: 'center'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: doubleBaseMargin
  },
  last: {
    marginBottom: 0
  },
  description: {
    fontSize: ifTablet(size.h4)
  },
  input: {
    flex: 1
  },
  inputStyle: {
    paddingTop: baseMargin * 0.8
  },
  colorSwatch: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: doubleBaseMargin,
    borderRadius: cornerRadius
  },
  pen: {
    color: 'white',
    fontSize: size.small
  },
  center: {
    alignItems: 'center'
  },
  ctaButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0
  },
  button: {
    width: '78%'
  },
  trashButton: {
    marginRight: baseMargin
  },
  trash: {
    fontSize: size.h4,
    color: Colors.lightGray
  }
})
