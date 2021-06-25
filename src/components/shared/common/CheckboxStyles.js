import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius, ifTablet } = Metrics
const { size, style } = Fonts
const { textGray, warmTextDarkGray, orange } = Colors

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
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
    marginRight: baseMargin * 0.75
  },
  selectedCheckBox: {
    borderColor: orange
  },
  checkTick: {
    fontSize: size.micro,
    marginTop: '0@ms',
    marginRight: '-2@ms',
    color: warmTextDarkGray
  },
  selectedTick: {
    color: orange
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  label: {
    ...style.semiBold,
    maxWidth: 150,
    fontSize: ifTablet(size.size9),
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 2,
    color: warmTextDarkGray
  },
  selectedLabel: {
    color: orange
  }
})
