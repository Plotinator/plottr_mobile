import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, buttonRadius } = Metrics
const { style } = Fonts
const { orange, white } = Colors

export default ScaledSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1@ms',
    borderColor: orange,
    borderRadius: buttonRadius,
    backgroundColor: orange
  },
  textWrapper: {
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin * 1.35
  },
  text: {
    ...style.buttonText,
    color: white
  },
  tightWrapper: {
    paddingHorizontal: baseMargin * 1.5,
    paddingVertical: baseMargin
  },
  smallWrapper: {
    paddingHorizontal: baseMargin * 1.5,
    paddingTop: baseMargin / 2,
    paddingBottom: baseMargin / 1.5
  },
  tinyWrapper: {
    paddingHorizontal: 0,
    paddingTop: baseMargin / 2.5,
    paddingBottom: baseMargin / 2
  },
  faded: {
    opacity: 0.5
  },
  block: {
    width: '100%'
  }
})
