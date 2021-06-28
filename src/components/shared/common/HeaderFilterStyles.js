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
    maxHeight: '80%',
    padding: baseMargin,
    marginBottom: -baseMargin
  },
  filterColumn: {
    alignItems: 'flex-start',
    maxWidth: 230,
    paddingHorizontal: baseMargin * 1.5,
    paddingBottom: doubleBaseMargin
  },
  titleContainer: {
    paddingBottom: baseMargin / 2,
    height: ifTablet(28, 22)
  },
  columnTitle: {
    ...style.bold,
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
  },
  top: {
    flex: 1
  },
  bottom: {
    height: ifTablet('auto', 180),
    paddingVertical: baseMargin,
    width: '100%'
  }
})
