import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Metrics } from '../../../utils'
import Fonts from '../../../fonts'

const { baseMargin, doubleBaseMargin, cornerRadius, section, doubleSection } = Metrics
const { orange, warmWhite, warmBG, warmGray, warmTextGray, warmTextDarkGray } = Colors
const { size, style } = Fonts

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
    color: warmTextGray,
  },
  seriesContainer: {
    paddingHorizontal: doubleSection * 2,
    alignItems: 'center'
  },
  seriesName: {
    ...style.bold,
    flexWrap: 'wrap',
    marginTop: baseMargin / 2,
    color: warmTextDarkGray,
    lineHeight: size.h1 * 1.2,
    fontSize: size.h1,
    textAlign: 'center'
  },
  seriesDescription: {
    ...style.regular,
    flexWrap: 'wrap',
    color: warmTextGray,
    paddingHorizontal: section,
    lineHeight: size.h5 * 1.5,
    fontSize: size.h5,
    textAlign: 'center'
  },
  seriesTheme: {
    ...style.regular,
    flexWrap: 'wrap',
    color: warmTextGray,
    paddingHorizontal: section,
    lineHeight: size.h5 * 1.5,
    fontSize: size.h5,
    textAlign: 'center'
  },
  seriesGenre: {
    ...style.semiBold,
    flexWrap: 'wrap',
    color: warmTextGray,
    lineHeight: size.h5 * 1.4,
    fontSize: size.h5 * .95,
    textAlign: 'center',
    marginBottom: -baseMargin / 2
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
    width: '33%'
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
