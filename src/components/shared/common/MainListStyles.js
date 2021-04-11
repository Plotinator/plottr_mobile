import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, cornerRadius } = Metrics
const { style, size } = Fonts
const { orange, white, whiteTone, grayTone, backgroundTone, lightGrayTone, textLightGrayTone, textGrayTone, textDarkGrayTone, textDarkerGrayTone } = Colors

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundTone
  },
  scroller: {
    paddingRight: baseMargin
  },
  titleHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin,
    color: textGrayTone
  },
  titleText: {
    fontSize: size.h5,
    ...style.bold,
    marginRight: baseMargin / 2,
    color: textGrayTone
  },
  groupLabel: {
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: grayTone,
    paddingVertical: baseMargin / 1.5,
    paddingLeft: doubleBaseMargin,
    paddingRight: baseMargin / 1.5,
    marginBottom: baseMargin
  },
  groupText: {
    ...style.bold,
    color: textLightGrayTone,
    fontSize: size.h7
  },
  items: {
    paddingLeft: baseMargin,
    paddingBottom: baseMargin,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: whiteTone,
    borderRadius: cornerRadius,
    padding: baseMargin,
    paddingTop: baseMargin * .9,
    marginBottom: 3
  },
  itemActive: {
    backgroundColor: orange
  },
  itemText: {
    ...style.bold,
    fontSize: size.size9
  },
  textActive: {
    color: white
  }
})
