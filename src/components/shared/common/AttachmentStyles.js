import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius } = Metrics
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
  tabsBase: {
    backgroundColor: cloudWhite,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: borderGray,
    borderRadius: cornerRadius * 1.5,
    padding: baseMargin / 3,
    paddingBottom: baseMargin / 4,
    paddingRight: '23@ms',
    minHeight: '30@ms'
  },
  tabCell: {
    // backgroundColor: warmWhiteBG,
    borderWidth: 1,
    borderColor: borderGray,
    borderRadius: cornerRadius,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: baseMargin / 6,
    marginRight: baseMargin / 3,
    marginBottom: baseMargin / 3
  },
  tabName: {
    ...style.semiBoldItalic,
    fontSize: size.tiny,
    color: textGray,
    paddingLeft: baseMargin / 1.25
  },
  whiteName: {
    color: white
  },
  removeButton: {
    padding: baseMargin / 1.5
  },
  removeIcon: {
    fontSize: size.micro,
    color: textBlack,
    opacity: 0.25
  },
  addButton: {
    width: '22@ms',
    height: '22@ms',
    position: 'absolute',
    top: baseMargin / 2,
    right: baseMargin / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: orange
  },
  addIcon: {
    fontSize: size.micro,
    color: orange
  },
  menuPopover: {
    borderRadius: cornerRadius
    // paddingVertical: baseMargin / 2
  },
  menuScroller: {
    maxHeight: '200@ms'
  },
  menuItem: {
    padding: baseMargin,
    paddingVertical: baseMargin / 2,
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuDot: {
    backgroundColor: white,
    width: '10@ms',
    height: '10@ms',
    marginLeft: baseMargin / 2,
    borderRadius: 50,
    marginTop: baseMargin / 4
  },
  addTypeText: {
    padding: baseMargin * 0.9
  }
})
