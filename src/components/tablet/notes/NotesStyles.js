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
    backgroundColor: Colors.warmBG
  },
  grid: {
    flex: 1
  },
  noteList: {
    height: '100%',
    padding: 8
  },
  title: {
    textAlign: 'center',
    marginBottom: 8
  },
  noteItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 8,
    borderColor: 'hsl(210, 36%, 96%)', //gray-9
    borderWidth: 1
  },
  activeItem: {
    borderColor: 'hsl(208, 88%, 62%)', //blue-6
    backgroundColor: 'hsl(210, 31%, 80%)', //gray-7
    borderStyle: 'dashed'
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  additionals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
