import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import Fonts from '../../../fonts'

const {
  ifTablet,
  baseMargin,
  doubleBaseMargin,
  section,
  cornerRadius,
  screenHeight,
  buttonRadius
} = Metrics
const { style, size } = Fonts
const {
  gray,
  white,
  warmBG,
  orange,
  textGray,
  lightGray,
  textLightGray,
  textDarkGrayTone,
  lightenGray,
  cloudWhite,
  borderGray,
  textBlack,
  cloudGray,
  warmWhiteBG
} = Colors

const inputText = {
  color: textBlack,
  paddingVertical: 0,
  paddingTop: baseMargin,
  paddingHorizontal: baseMargin / 2,
  fontSize: size.small
}

export default {
  avoidingView: {
    flex: 1,
    backgroundColor: '#00000033',
    justifyContent: 'center',
    alignItems: 'center'
  },
  window: {
    backgroundColor: warmWhiteBG,
    borderRadius: cornerRadius * 1.5,
    width: '80%',
    maxHeight: '75%',
    minHeight: 400,
    padding: doubleBaseMargin,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10
  },
  closeButton: {
    backgroundColor: warmWhiteBG,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -baseMargin * 0.9,
    right: -baseMargin * 0.9,
    borderRadius: 50,
    width: ifTablet('27@ms', '35@ms'),
    height: ifTablet('27@ms', '35@ms'),
    zIndex: 99
  },
  closeIcon: {
    fontSize: ifTablet(size.tiny, size.h5),
    color: orange
  },
  form: {},
  row: {
    paddingTop: baseMargin
  },
  labels: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: baseMargin / 2
  },
  label: {
    ...style.boldItalic,
    fontSize: size.small,
    color: lightenGray,
    paddingLeft: baseMargin / 4,
    paddingBottom: baseMargin / 2,
    marginRight: baseMargin / 2
  },
  count: {
    marginTop: -baseMargin / 2,
    backgroundColor: warmBG,
    borderRadius: 50,
    width: '17@ms',
    height: '17@ms',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    ...style.semiBold,
    fontSize: size.tiny,
    color: textLightGray
  },
  input: {
    backgroundColor: 'transparent',
    height: '48@mvs',
    borderRadius: cornerRadius * 1.25
  },
  inputText: {
    ...style.regular,
    ...inputText
  },
  inputBoldText: {
    ...style.semiBold,
    ...inputText,
    color: textDarkGrayTone
  },
  multiInput: {
    marginTop: 0
  },
  collapseButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: baseMargin / 2,
    bottom: baseMargin / 2
  },
  collapseText: {
    ...style.italic,
    color: textGray,
    fontSize: size.nano
  },
  collapseIcon: {
    fontSize: size.small / 2,
    color: textGray,
    marginTop: 5,
    marginLeft: baseMargin / 4
  },
  collapsedIcon: {
    marginTop: 2,
    transform: [{ rotate: '-90deg' }]
  },
  actions: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: doubleBaseMargin,
    paddingBottom: 1,
    flexDirection: 'row',
    marginHorizontal: -baseMargin / 2
  },
  action: {
    flex: 1,
    marginHorizontal: baseMargin / 2,
    borderRadius: cornerRadius,
    paddingHorizontal: ifTablet(doubleBaseMargin, 0)
  },
  menuPopover: {
    borderRadius: cornerRadius,
    paddingVertical: baseMargin
  },
  menuScroller: {
    maxHeight: '200@ms'
  },
  menuItem: {
    padding: baseMargin,
    paddingVertical: baseMargin / 2
  }
}
