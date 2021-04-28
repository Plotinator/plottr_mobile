import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import { Colors } from '../../../utils'

const { baseMargin } = Metrics
const { style, size } = Fonts
const {
  gray,
  white,
  orange,
  textGray,
  lightGray,
  textLightGray,
  lightenGray,
  cloudWhite,
  borderGray,
  textBlack,
  cloudGray
} = Colors

export default ScaledSheet.create({
  container: {
    marginBottom: baseMargin
  },
  heading: {
    marginBottom: baseMargin * 0.05,
    flexDirection: 'row',
    alignItems:'center',
  },
  headingText: {
    fontSize: Fonts.size.h7,
    marginBottom: baseMargin / 4,
    marginRight: baseMargin / 2
  },
  headingEditText: {
    ...Fonts.style.boldItalic,
    marginLeft: baseMargin / 4,
    marginBottom: baseMargin / 2,
    opacity: 0.5
  },
  attachments: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden'
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: baseMargin / 3
  },
  hash: {
    paddingVertical: baseMargin / 3,
    paddingTop: baseMargin / 4,
    paddingHorizontal: baseMargin * 1.25,
    marginRight: baseMargin / 2,
    marginTop: baseMargin,
    borderWidth: 1.2,
    borderRadius: 20
  },
  count: {
    marginTop: -baseMargin / 2,
    backgroundColor: cloudGray,
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
})
