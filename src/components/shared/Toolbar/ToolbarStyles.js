import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.warmWhite,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin * 1.5,
    backgroundColor: Colors.warmWhite,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.warmGray,
    borderRadius: 0,
    shadowColor: '#00000030',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0,
    elevation: 2,
    minHeight: Metrics.ifTablet('48@ms')
  },
  button: {
    marginRight: Metrics.doubleBaseMargin
  },
  icon: {
    fontSize: Metrics.ifTablet('18@ms', '24@ms'),
    color: Colors.textGray
  }
})
