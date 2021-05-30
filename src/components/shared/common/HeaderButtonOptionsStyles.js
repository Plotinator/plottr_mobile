import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius } = Metrics
const { warmWhiteBG } = Colors

export default ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuPopover: {
    borderRadius: cornerRadius,
    paddingVertical: baseMargin,
    backgroundColor: warmWhiteBG
  }
})
