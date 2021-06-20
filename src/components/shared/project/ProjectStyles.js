import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'

const {
  ifTablet,
  baseMargin,
  doubleBaseMargin,
  cornerRadius,
  section,
  doubleSection,
  screenHeight,
  screenWidth
} = Metrics
const {
  orange,
  warmWhite,
  warmBG,
  warmGray,
  warmTextGray,
  warmTextDarkGray
} = Colors
const smallestDimension =
  screenWidth > screenHeight ? screenHeight : screenWidth
const {
  size: { h1, h3, h4, h5, h6 },
  style
} = Fonts

export default ScaledSheet.create({
  background: {
    flex: 1,
    backgroundColor: warmWhite
  },
  container: {
    flex: 1,
    backgroundColor: warmBG
  },
  labelContainer: {
    paddingTop: doubleBaseMargin,
    paddingBottom: baseMargin / 2.5,
    paddingLeft: doubleBaseMargin * 1.2,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  labelProject: {
    backgroundColor: warmGray,
    borderRadius: cornerRadius,
    paddingHorizontal: baseMargin * 1.5,
    paddingTop: baseMargin / 3,
    paddingBottom: baseMargin / 2,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: baseMargin / 1.5
  },
  labelText: {
    color: warmTextGray
  },
  seriesContainer: {
    paddingHorizontal: ifTablet(doubleSection, baseMargin) * 2,
    alignItems: 'center'
  },
  seriesName: {
    ...style.bold,
    flexWrap: 'wrap',
    marginTop: baseMargin / 2,
    color: warmTextDarkGray,
    lineHeight: h1 * 1.2,
    fontSize: h1,
    textAlign: 'center'
  },
  seriesDescription: {
    ...style.regular,
    flexWrap: 'wrap',
    color: warmTextGray,
    paddingHorizontal: section,
    lineHeight: ifTablet(h5, h3) * 1.5,
    fontSize: ifTablet(h5, h3),
    textAlign: 'center'
  },
  seriesTheme: {
    ...style.italic,
    flexWrap: 'wrap',
    color: warmTextGray,
    paddingHorizontal: section,
    lineHeight: h6 * 1.5,
    fontSize: ifTablet(h6, h5),
    textAlign: 'center',
    marginTop: baseMargin / 2,
    marginBottom: -baseMargin / 2
  },
  seriesGenre: {
    ...style.semiBold,
    flexWrap: 'wrap',
    color: warmTextGray,
    lineHeight: h6 * 1.6,
    fontSize: ifTablet(h6, h5),
    textAlign: 'center'
  },
  booksContainer: {
    flex: 1,
    marginTop: baseMargin,
    paddingLeft: doubleBaseMargin
  },
  booksList: {
    paddingHorizontal: doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  book: {
    width: ifTablet(0.29, 0.5) * smallestDimension
  },
  saveButton: {
    width: 120,
    marginHorizontal: baseMargin / 2
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: doubleBaseMargin,
    alignItems: 'center'
  }
})
