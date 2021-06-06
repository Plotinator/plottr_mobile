import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin * 0.73,
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.cornerRadius / 2,
    marginRight: Metrics.baseMargin
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2
  },
  icon: {
    color: Colors.textGray,
    fontSize: Fonts.size.h6
  },
  text: {
    ...Fonts.style.bold,
    fontSize: Fonts.size.h7,
    paddingLeft: Metrics.baseMargin / 2,
    color: Colors.textGray
  },
  selected: {
    color: Colors.orange
  },
  count: {
    top: -7,
    right: -4,
    backgroundColor: Colors.orange,
    borderRadius: Metrics.cornerRadius,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    color: Colors.white,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.bold
  }
})
