import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import FormStyles from '../form/Styles'

const { baseMargin, doubleBaseMargin, ifTablet } = Metrics

export default ScaledSheet.create({
  ...FormStyles,
  container: {
    marginBottom: doubleBaseMargin
  },
  heading: {
    marginBottom: baseMargin * 0.05
  },
  headingText: {
    fontSize: ifTablet(Fonts.size.h7, Fonts.size.h5)
  },
  headingEditText: {
    ...FormStyles.label
    // fontSize: ifTablet(Fonts.size.h7, Fonts.size.h5),
    // marginLeft: baseMargin / 4,
    // opacity: 0.5
  },
  details: {},
  detailsText: {
    ...Fonts.style.regular,
    fontSize: ifTablet(Fonts.size.h7, Fonts.size.h5)
  },
  centerText: {
    textAlign: 'center',
    fontSize: ifTablet(Fonts.size.h6, Fonts.size.h4)
  }
})
