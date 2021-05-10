import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius } = Metrics
const { size, style } = Fonts
const { textGray, warmTextDarkGray } = Colors

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: baseMargin / 4
  },
  checkBox: {
    width: '13@ms',
    height: '13@ms',
    borderWidth: 1.5,
    borderColor: warmTextDarkGray,
    borderRadius: cornerRadius / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: baseMargin * .75
  },
  checkTick: {
    fontSize: size.micro,
    marginTop: '0@ms',
    marginRight: '-2@ms',
    color: warmTextDarkGray
  },
  label: {
    ...style.semiBold,
    fontSize: size.size9,
    flexWrap: 'wrap',
    paddingBottom: 2,
    color: warmTextDarkGray
  }
})
