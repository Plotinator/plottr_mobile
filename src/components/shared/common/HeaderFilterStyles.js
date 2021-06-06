import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin } = Metrics
const { style, size } = Fonts

export default ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterBase: {
    flexDirection: 'row',
    width: 'auto',
    padding: baseMargin
  },
  filterColumn: {
    alignItems: 'flex-start',
    maxWidth: 230,
    paddingHorizontal: baseMargin * 1.5
  },
  columnTitle: {
    ...style.bold,
    paddingBottom: baseMargin / 2,
    fontSize: size.tiny
  },
  clearButton: {
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin
  },
  clearText: {
    ...style.semiBold,
    fontSize: size.size9,
    color: Colors.orange
  }
})
