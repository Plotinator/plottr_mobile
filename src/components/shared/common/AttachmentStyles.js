import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius, ifTablet } = Metrics
const { style, size } = Fonts
const {
  orange,
  white,
  lightGray,
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
    backgroundColor: warmWhite,
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
    minHeight: ifTablet('30@ms', '38@ms')
  },
  tabCell: {
    backgroundColor: warmWhiteBG,
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
    fontSize: ifTablet(size.tiny, size.small),
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
    fontSize: ifTablet(size.micro, size.tiny),
    color: textBlack,
    opacity: 0.25
  },
  addButton: {
    width: ifTablet('22@ms', '25@vs'),
    height: ifTablet('22@ms', '25@vs'),
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
    fontSize: ifTablet(size.micro, size.tiny),
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
  menuItemText: {
    ...style.semiBold,
    fontSize: ifTablet(size.h6, size.h5),
    color: textGray
  },
  menuDot: {
    backgroundColor: white,
    width: '10@ms',
    height: '10@ms',
    marginRight: baseMargin,
    borderRadius: 50,
    marginTop: baseMargin / 4
  },
  addTypeText: {
    ...style.italic,
    padding: baseMargin * 0.9,
    fontSize: ifTablet(size.micro, size.tiny),
    color: lightGray
  },
  noItemText: {
    ...style.semiBold,
    fontSize: ifTablet(size.h6, size.h4),
    color: textGray
  },
  image: {
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 50,
    marginRight: baseMargin,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: borderGray
  }
})
