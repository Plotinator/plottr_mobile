import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, doubleBaseMargin, cornerRadius, ifTablet } = Metrics
const { style, size } = Fonts
const {
  orange,
  white,
  whiteTone,
  grayTone,
  borderGray,
  backgroundTone,
  lightGrayTone,
  textLightGrayTone,
  textGrayTone,
  textDarkGrayTone,
  textDarkerGrayTone,
  warmBG
} = Colors

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: warmBG // backgroundTone
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
    fontSize: ifTablet(size.h5, size.h2),
    ...style.bold,
    marginRight: baseMargin / 2,
    color: textGrayTone
  },
  groupLabel: {
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.warmGray, // grayTone,
    paddingVertical: baseMargin / 1.5,
    paddingLeft: doubleBaseMargin,
    paddingRight: baseMargin / 1.5,
    marginBottom: baseMargin
  },
  groupText: {
    ...style.bold,
    color: Colors.warmTextGray, // textLightGrayTone,
    fontSize: ifTablet(size.h7, size.h4)
  },
  items: {
    paddingLeft: ifTablet(baseMargin, doubleBaseMargin),
    paddingRight: ifTablet(0, baseMargin * 1.2),
    paddingBottom: ifTablet(baseMargin, doubleBaseMargin)
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.warmWhiteBG, // whiteTone,
    padding: baseMargin * 1.25,
    paddingVertical: baseMargin * 0.75,
    minHeight: 30 + baseMargin * 2
  },
  wrapper: {
    borderRadius: cornerRadius * ifTablet(1, 1.5),
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: Colors.warmWhiteBG,
    marginBottom: 3
  },
  itemActive: {
    backgroundColor: orange
  },
  itemText: {
    flex: 1,
    ...style.bold,
    color: textDarkGrayTone,
    fontSize: ifTablet(size.size9, size.h5)
  },
  number: {
    height: '100%'
  },
  itemNumber: {
    ...style.bold,
    color: textDarkGrayTone,
    fontSize: ifTablet(size.size9, size.size7)
  },
  textActive: {
    color: white
  },
  trashButton: {
    marginLeft: baseMargin / 2
  },
  trashIcon: {
    fontSize: ifTablet(size.size9, size.size7)
  },
  colors: {
    flexDirection: 'row',
    position: 'absolute',
    right: baseMargin / 1.5,
    bottom: baseMargin / 1.8
  },
  colorDot: {
    width: 8,
    height: 8,
    marginLeft: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: whiteTone
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
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  slideColumn: {
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: cornerRadius * ifTablet(1, 1.5),
    borderBottomLeftRadius: cornerRadius * ifTablet(1, 1.5),
    backgroundColor: warmBG,
    padding: baseMargin * 1.5
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: cornerRadius * ifTablet(1, 1.5),
    borderBottomRightRadius: cornerRadius * ifTablet(1, 1.5),
    backgroundColor: warmBG,
    padding: baseMargin * 1.5
  }
})
