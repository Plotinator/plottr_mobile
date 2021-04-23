import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'

const { baseMargin } = Metrics

export default ScaledSheet.create({
  container: {
    marginBottom: baseMargin
  },
  heading: {
    marginBottom: baseMargin * 0.05
  },
  details: {}
})
