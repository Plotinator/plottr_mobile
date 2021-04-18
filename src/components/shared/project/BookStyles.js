import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import { isTablet } from 'react-native-device-info'
import Fonts from '../../../fonts'

const { size, style } = Fonts
const { section, baseMargin, cornerRadius } = Metrics

const { gray, orange } = Colors

export default ScaledSheet.create({
  book: {
    width: isTablet() ? '33%' : '66%'
  },
  bookImage: {
    width: '100%',
    aspectRatio: 0.8
  },
  titleWrapper: {
    flex: 2,
    paddingRight: '25%',
    paddingLeft: '12%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookTitle: {
    width: '100%',
    fontFamily: 'Georgia',
    lineHeight: size.h5 * 1.4,
    color: Colors.warmTextGray,
    fontSize: size[isTablet() ? 'h5' : 'h3']
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: '10%',
    paddingRight: '22%',
    paddingBottom: '25%',
    alignItems: 'center'
  },
  centerButtons: {
    justifyContent: 'center'
  },
  button: {
    paddingVertical: baseMargin / 2,
    paddingHorizontal: baseMargin,
    backgroundColor: orange,
    borderRadius: cornerRadius
  },
  trashButton: {
    paddingLeft: baseMargin / 2
  }
})
