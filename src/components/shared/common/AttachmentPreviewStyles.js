import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius } = Metrics
const { style, size } = Fonts
const { orange, white, textGray, cloudWhite, borderGray, textBlack } = Colors

export default ScaledSheet.create({
  tabsBase: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden'
  },
  tabCell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: baseMargin / 3,
    marginBottom: baseMargin / 3
  }
})
