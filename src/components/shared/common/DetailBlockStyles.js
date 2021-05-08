import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Fonts from '../../../fonts'
import FormStyles from '../form/Styles'

const { baseMargin } = Metrics

export default ScaledSheet.create({
  ...FormStyles,
  container: {
    marginBottom: baseMargin
  },
  heading: {
    marginBottom: baseMargin * 0.05
  },
  headingText: {
    fontSize: Fonts.size.h7
  },
  headingEditText: {
    ...Fonts.style.boldItalic,
    marginLeft: baseMargin / 4,
    opacity: 0.5
  },
  details: {},
  detailsText: {
    ...Fonts.style.regular,
    fontSize: Fonts.size.tiny
  },
  input: {
    ...FormStyles.input,
    marginTop: baseMargin / 1.5,
    height: '30@ms'
  },
  inputText: {
    ...FormStyles.inputText,
    fontSize: Fonts.size.tiny
  }
})
