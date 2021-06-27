import { ScaledSheet } from 'react-native-size-matters'
import { Colors } from '../../../utils'

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite
  },
  grid: {
    flex: 1
  },
  additionals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
