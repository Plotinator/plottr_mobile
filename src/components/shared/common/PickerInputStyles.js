import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, cornerRadius, ifTablet } = Metrics
const { style, size } = Fonts
const {
  orange,
  white,
  textGray,
  cloudWhite,
  borderGray,
  textBlack,
  warmWhiteBG,
  warmWhite,
  warmWhiter
} = Colors

export default ScaledSheet.create({
  wrapper: {
    marginBottom: baseMargin * 1.5
  },
  container: {
    backgroundColor: warmWhiteBG,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: borderGray,
    borderRadius: cornerRadius * 1.5,
    padding: baseMargin / 3,
    paddingBottom: baseMargin / 4,
    paddingRight: '23@ms',
    minHeight: ifTablet('35@ms', '42@ms'),
    paddingHorizontal: baseMargin
  },
  selected: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: ifTablet(size.tiny, size.h5),
    paddingLeft: baseMargin / 1.25
  },
  menuPopover: {
    borderRadius: cornerRadius
  },
  menuScroller: {
    maxHeight: '200@ms'
  },
  menuItem: {
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuText: {
    ...style.semiBold,
    fontSize: ifTablet(size.tiny, size.h5)
  },
  caret: {
    fontSize: ifTablet(size.tiny, size.h5),
    right: -baseMargin
  },
  label: {
    marginBottom: baseMargin / 2
  },
  labelEditText: {
    fontSize: ifTablet(size.tiny, size.h5),
    ...Fonts.style.boldItalic,
    marginLeft: baseMargin / 4,
    opacity: 0.5
  },
  labelText: {
    fontSize: ifTablet(size.tiny, size.h5),
    ...Fonts.style.bold
  },
  detailsText: {
    ...Fonts.style.regular,
    fontSize: ifTablet(size.tiny, size.h5)
  }
})
