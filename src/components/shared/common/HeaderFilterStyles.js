import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, ifTablet } = Metrics
const { style, size } = Fonts

export default ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterBase: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    width: 'auto',
    padding: baseMargin,
    marginBottom: -baseMargin
  },
  filterColumn: {
    alignItems: 'flex-start',
    maxWidth: 230,
    paddingHorizontal: baseMargin * 1.5,
    paddingBottom: doubleBaseMargin
  },
  columnTitle: {
    ...style.bold,
    paddingBottom: baseMargin / 2,
    fontSize: ifTablet(size.tiny)
  },
  clearButton: {
    paddingHorizontal: doubleBaseMargin,
    paddingBottom: baseMargin
  },
  clearText: {
    ...style.semiBold,
    fontSize: ifTablet(size.size9),
    color: Colors.orange
  }
})
