import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

export default ScaledSheet.create({
  editorContainer: {
    minHeight: 50,
    marginTop: Metrics.baseMargin / 2,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: Metrics.cornerRadius,
    paddingTop: Metrics.baseMargin / 2
  },
  richToolbar: {
    backgroundColor: Colors.warmWhite,
    borderRadius: Metrics.cornerRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: Metrics.baseMargin / 2
  },
  richEditor: {
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.cornerRadius,
    minHeight: 50
  },
  containerDisabled: {
    marginTop: 0,
    paddingTop: 0,
    borderWidth: 0
  },
  editorDisabled: {
    paddingHorizontal: 0
  }
})
