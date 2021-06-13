import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'
import FormStyles from '../../shared/form/Styles'

const {
  baseMargin,
  doubleBaseMargin,
  cornerRadius,
  section,
  doubleSection
} = Metrics
const {
  orange,
  warmWhite,
  warmBG,
  warmGray,
  warmWhiteBG,
  warmTextGray,
  warmTextDarkGray
} = Colors
const { size, style } = Fonts

export default ScaledSheet.create({
  ...FormStyles,
  container: {
    flex: 1,
    backgroundColor: warmBG
  },
  chapterList: {
    height: '100%',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  chapter: {
    // padding: baseMargin,
    paddingLeft: 0,
    paddingRight: baseMargin
  },
  chapterTitle: {
    paddingTop: baseMargin * 1.5,
    paddingBottom: baseMargin * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: baseMargin / 1.5
  },
  chapterText: {
    ...style.bold,
    color: warmTextGray,
    fontSize: size.h6
  },
  cardWrapper: {
    marginLeft: -16
  },
  outline: {},
  cards: {
    flex: 1
  },
  card: {
    borderRadius: cornerRadius,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: warmWhiteBG,
    marginBottom: baseMargin,
    paddingHorizontal: baseMargin * 1.5
  },
  cardHead: {
    alignItems: 'center'
  },
  cardHeader: {
    borderWidth: 1,
    borderColor: 'black',
    borderTopWidth: 0,
    borderBottomLeftRadius: cornerRadius,
    borderBottomRightRadius: cornerRadius,
    paddingHorizontal: baseMargin,
    paddingVertical: baseMargin / 3,
    marginBottom: baseMargin,
    marginHorizontal: doubleBaseMargin
  },
  cardHeaderText: {
    ...style.bold,
    fontSize: size.tiny
  },
  cardTitle: {
    marginBottom: baseMargin / 2
  },
  cardTitleText: {
    ...style.bold,
    textAlign: 'center',
    fontSize: size.tiny,
    color: warmTextGray
  },
  manualSorted: {
    right: baseMargin,
    bottom: baseMargin / 5,
    position: 'absolute',
    // backgroundColor: orange,
    borderColor: orange,
    borderWidth: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: cornerRadius,
    paddingHorizontal: baseMargin / 1.5,
    paddingVertical: baseMargin / 6
  },
  manualClose: {
    color: orange,
    fontSize: size.tiny.micro
  },
  manualText: {
    ...style.semiBold,
    ...style.microText,
    color: orange,
    marginRight: baseMargin / 2
  },
  cardBody: {
    minHeight: 50
  },
  cardFoot: {
    alignItems: 'flex-end',
    paddingBottom: baseMargin,
    marginTop: -baseMargin / 2,
    marginRight: -baseMargin / 2
  },
  editActions: {
    paddingBottom: baseMargin
  },
  input: {
    ...FormStyles.input,
    marginTop: baseMargin / 1.5,
    height: '30@ms'
  },
  inputText: {
    ...FormStyles.inputText,
    ...style.bold,
    color: warmTextGray,
    paddingHorizontal: 0,
    fontSize: Fonts.size.tiny
  },
  labelText: {
    fontSize: Fonts.size.tiny
  },
  reorderButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9
  },
  reorderUp: {
    justifyContent: 'flex-end',
    paddingTop: baseMargin / 2,
    paddingBottom: baseMargin / 6,
    paddingHorizontal: baseMargin * 1.2
  },
  reorderDown: {
    justifyContent: 'flex-start',
    paddingTop: baseMargin / 6,
    paddingBottom: baseMargin / 2,
    paddingHorizontal: baseMargin * 1.2
  },
  reorderUpIcon: {
    marginBottom: -baseMargin / 4
  },
  reorderDownIcon: {
    marginTop: -baseMargin / 4
  },
  additionals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
