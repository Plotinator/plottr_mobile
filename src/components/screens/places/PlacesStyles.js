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
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite
  },
  grid: {
    flex: 1
  },
  placeList: {
    height: '100%',
    padding: 8
  },
  title: {
    textAlign: 'center',
    marginBottom: 8
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  additionals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  additionals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
