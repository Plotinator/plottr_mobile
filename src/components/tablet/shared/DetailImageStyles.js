import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

export default ScaledSheet.create({
  containerDefault: {
    alignSelf: 'center',
    width: 120,
    height: 120
  },
  containerCircular: {
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  containerFullWidth: {
    alignSelf: 'center',
    width: '100%',
    height: 400
  },
  default: {
    resizeMode: 'contain',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    marginTop: Metrics.doubleBaseMargin,
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: Colors.borderGray
  },
  circular: {
    resizeMode: 'cover',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 150,
    width: 200,
    height: 200,
    borderWidth: 1,
    marginTop: Metrics.baseMargin / 2,
    borderColor: Colors.borderGray
  },
  fullWidth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: Metrics.cornerRadius,
    width: '100%',
    height: 400,
    borderWidth: 1,
    borderColor: Colors.borderGray
  },
  editIconDefault: {
    position: 'absolute',
    right: Metrics.baseMargin,
    bottom: 0
  },
  editIconFullWidth: {
    position: 'absolute',
    right: Metrics.baseMargin,
    bottom: Metrics.baseMargin
  },
  addImageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: -Metrics.doubleBaseMargin
  },
  addImageText: {
    paddingLeft: Metrics.baseMargin / 2
  }
})
