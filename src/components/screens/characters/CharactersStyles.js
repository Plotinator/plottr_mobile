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
  title: {
    textAlign: 'center',
    marginBottom: 8
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  characterSideImage: {
    resizeMode: 'contain',
    overflow: 'hidden',
    borderRadius: 50,
    marginRight: 10,
    width: 30,
    height: 30
  },
  additionals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  floatingCategories: {
    position: 'absolute',
    right: 0,
    top: baseMargin * 1.25,
    zIndex: 9
  }
})
