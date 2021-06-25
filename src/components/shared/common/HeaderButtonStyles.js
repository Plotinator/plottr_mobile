import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius, ifTablet } = Metrics
const {
  size: { tiny, h5, h7, h6 }
} = Fonts

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: baseMargin * 0.73,
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
    top: ifTablet(-5, -3),
    right: ifTablet(-25, -15),
    backgroundColor: Colors.orange,
    borderRadius: 30,
    width: ifTablet('20@ms', '22@ms'),
    height: ifTablet('20@ms', '22@ms'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    color: Colors.white,
    fontSize: tiny,
    ...Fonts.style.bold
  }
})
