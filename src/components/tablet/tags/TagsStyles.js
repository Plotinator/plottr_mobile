import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'

const { baseMargin, doubleBaseMargin } = Metrics

export default ScaledSheet.create({
  container: {
    flex: 1
  },
  scroller: {
    // flex: 1
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: baseMargin,
    paddingBottom: baseMargin
  },
  title: {
    textAlign: 'center'
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: doubleBaseMargin
  }
})
