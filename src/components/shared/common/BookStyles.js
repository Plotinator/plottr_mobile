import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import { isTablet } from 'react-native-device-info'
import Fonts from '../../../fonts'

const {
  size: { h6, h5, h4, h3, h1 },
  style
} = Fonts
const { ifTablet, section, baseMargin, cornerRadius } = Metrics

const { gray, orange, warmWhite } = Colors

export default ScaledSheet.create({
  book: {
    width: isTablet() ? '33%' : '66%'
  },
  bookImage: {
    width: '100%',
    justifyContent: 'flex-end',
    aspectRatio: 0.8
  },
  titleWrapper: {
    flex: 2,
    paddingHorizontal: baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: '2.8%',
    marginLeft: '3.5%',
    marginRight: '15%',
    marginBottom: '17%'
  },
  bookTitle: {
    width: '100%',
    fontFamily: 'Georgia',
    lineHeight: h5 * 1.4,
    color: Colors.warmTextGray,
    fontSize: ifTablet(h5, h3)
  },
  actions: {
    backgroundColor: `${warmWhite}99`,
    flexDirection: 'row',
    paddingHorizontal: baseMargin,
    paddingVertical: baseMargin,
    paddingLeft: baseMargin / 2,
    alignItems: 'center',
    justifyContent: 'space-between'
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
  trashIcon: {
    fontSize: ifTablet(h5, h3)
  },
  trashButton: {
    paddingLeft: baseMargin / 1
  }
})
