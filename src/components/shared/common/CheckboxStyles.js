import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

const { baseMargin, cornerRadius, ifTablet } = Metrics
const { size, style } = Fonts
const { textGray, warmTextDarkGray, orange } = Colors

export default ScaledSheet.create({
  container: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: baseMargin / 4
  },
  checkBox: {
    width: ifTablet('13@ms', '17@ms'),
    height: ifTablet('13@ms', '17@ms'),
    borderWidth: 1.5,
    borderColor: warmTextDarkGray,
    borderRadius: cornerRadius / ifTablet(2, 1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: baseMargin * 0.75
  },
  selectedCheckBox: {
    borderColor: orange
  },
  checkTick: {
    fontSize: ifTablet(size.micro, size.tiny),
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
