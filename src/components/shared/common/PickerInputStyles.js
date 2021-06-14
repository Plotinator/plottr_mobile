import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, cornerRadius } = Metrics
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
    minHeight: '35@ms',
    paddingHorizontal: baseMargin
  },
  selected: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: Fonts.size.tiny,
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
    fontSize: Fonts.size.tiny
  },
  caret: {
    fontSize: size.tiny,
    right: -baseMargin
  },
  label: {
    marginBottom: baseMargin / 2
  },
  labelEditText: {
    fontSize: Fonts.size.h7,
    ...Fonts.style.boldItalic,
    marginLeft: baseMargin / 4,
    opacity: 0.5
  },
  labelText: {
    fontSize: Fonts.size.h7,
    ...Fonts.style.bold
  },
  detailsText: {
    ...Fonts.style.regular,
    fontSize: Fonts.size.tiny
  }
})
