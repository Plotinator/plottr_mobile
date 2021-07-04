import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'

const { baseMargin, doubleBaseMargin, ifTablet } = Metrics
const { textGrayTone } = Colors
const { size, style } = Fonts

export default ScaledSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.warmWhite
  },
  container: {
    flex: 1,
    backgroundColor: Colors.warmBG
  },
  scroller: {
    // flex: 1
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin,
    color: textGrayTone
  },
  titleText: {
    fontSize: ifTablet(size.h5, size.h2),
    ...style.bold,
    marginRight: baseMargin,
    color: textGrayTone
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
