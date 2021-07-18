import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../../../utils/Colors'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'

const { orange, white } = Colors
const { ifTablet, baseMargin } = Metrics
const { size, style } = Fonts

export default ScaledSheet.create({
  wrapper: {
    flex: 1,
    padding: baseMargin
  },
  colors: {
    flex: 1
  },
  groupWrapper: {
    flex: 1,
    marginVertical: baseMargin / 2
  },
  colorGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    ...style.bold,
    fontSize: size.h4,
    marginVertical: baseMargin / 2,
    marginLeft: baseMargin
  },
  colorSwatch: {
    width: 40,
    height: 40,
    margin: baseMargin / 2,
    borderBottomRightRadius: baseMargin,
    borderTopLeftRadius: baseMargin
  }
})
