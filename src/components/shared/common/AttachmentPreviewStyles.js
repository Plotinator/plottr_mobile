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
  attachments: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden'
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: baseMargin / 3
  },
  hash: {
    paddingVertical: baseMargin / 3,
    paddingTop: baseMargin / 4,
    paddingHorizontal: baseMargin * 1.25,
    marginRight: baseMargin / 2,
    marginTop: baseMargin,
    borderWidth: 1.2,
    borderRadius: 20
  }
})
