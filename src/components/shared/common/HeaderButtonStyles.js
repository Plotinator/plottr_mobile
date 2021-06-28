import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius, ifTablet } = Metrics
const {
  size: { nano, micro, tiny, h5, h7, h6 }
} = Fonts

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: baseMargin * ifTablet(0.73, 0.25),
    paddingHorizontal: baseMargin,
    borderRadius: cornerRadius / 2,
    marginRight: baseMargin
  },
  icon: {
    color: Colors.textGray,
    fontSize: ifTablet(h6, h5)
  },
  text: {
    ...Fonts.style.bold,
    fontSize: ifTablet(h7),
    paddingLeft: baseMargin / 2,
    color: Colors.textGray
  },
  selected: {
    color: Colors.orange
  },
  count: {
    position: 'absolute',
    top: ifTablet(0, -5),
    right: ifTablet(-10, -10),
    backgroundColor: Colors.orange,
    borderRadius: 30,
    width: ifTablet('15@ms', '20@ms'),
    height: ifTablet('15@ms', '20@ms'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    color: Colors.white,
    fontSize: ifTablet(micro, tiny),
    ...Fonts.style.bold
  }
})
