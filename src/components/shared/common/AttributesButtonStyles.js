import { ScaledSheet } from 'react-native-size-matters'
import Fonts from '../../../fonts'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin * Metrics.ifTablet(0.73, 0.25),
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.cornerRadius / 2
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
  smile: {
    color: Colors.textGray,
    fontSize: Metrics.ifTablet(Fonts.size.h5, Fonts.size.h3),
    marginTop: -Metrics.baseMargin / 3,
    marginRight: -Metrics.baseMargin / 4
  },
  frownBase: {
    backgroundColor: Colors.textGray,
    borderRadius: 99,
    borderWidth: 3,
    borderColor: Colors.textGray,
    width: Metrics.ifTablet(22, 17),
    height: Metrics.ifTablet(22, 17),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: Metrics.baseMargin / 3,
    marginLeft: -Metrics.baseMargin / 4
  },
  frown: {
    color: 'white',
    fontSize: Metrics.ifTablet(Fonts.size.h5, Fonts.size.h3),
    marginLeft: -3,
    marginTop: -4
  },
  text: {
    ...Fonts.style.bold,
    fontSize: Metrics.ifTablet(Fonts.size.h7),
    paddingLeft: Metrics.baseMargin / 2,
    color: Colors.textGray
  }
})
