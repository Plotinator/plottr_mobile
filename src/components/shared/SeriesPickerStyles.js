import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../utils/Metrics'
import Colors from '../../utils/Colors'
import Fonts from '../../fonts'

const { size: fontSizes, style: fontStyles } = Fonts
const { ifTablet, baseMargin, doubleBaseMargin, cornerRadius } = Metrics

export default ScaledSheet.create({
  picker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: baseMargin / 1.25,
    paddingLeft: baseMargin * 1.5,
    paddingRight: doubleBaseMargin / 1.5,
    borderRadius: cornerRadius / 2,
    borderColor: Colors.borderGray,
    backgroundColor: Colors.warmWhiteBG,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0.5,
      height: 0.75
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.25,
    elevation: 2
  },
  listItem: {
    width: 400,
    height: 60
  },
  seriesListItem: {
    backgroundColor: Colors.warmWhiteBG
  },
  title: {
    ...fontStyles.bold,
    fontSize: ifTablet(fontSizes.tiny, fontSizes.standard),
    paddingRight: baseMargin
  },
  caret: {
    fontSize: fontSizes.tiny,
    marginTop: 3,
    color: Colors.textBlack
  },
  text: {
    fontSize: fontSizes.tiny
  },
  menuPopover: {
    borderRadius: cornerRadius,
    paddingVertical: baseMargin
  },
  menuScroller: {
    maxHeight: '200@ms'
  },
  menuItem: {
    color: Colors.textGray,
    padding: baseMargin,
    paddingVertical: baseMargin / 2
  },
  seriesText: {
    ...fontStyles.bold,
    fontSize: ifTablet(fontSizes.h6),
    color: Colors.textGray
  },
  itemText: {
    ...fontStyles.semiBold,
    fontSize: ifTablet(fontSizes.h6)
  }
})
