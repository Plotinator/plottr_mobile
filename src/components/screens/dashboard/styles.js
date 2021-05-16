import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'
import { isTablet } from 'react-native-device-info'

const { warmWhiteBG, warmGray } = Colors
const {
  baseMargin,
  doubleBaseMargin,
  section,
  doubleSection,
  cornerRadius,
} = Metrics

export default ScaledSheet.create({
  scroller: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: section,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recentFiles: {
    flexDirection: 'row',
    justifyContent: "center",
    flexWrap: 'wrap',
    borderRadius: cornerRadius,
    backgroundColor: warmGray,
    paddingHorizontal: doubleBaseMargin,
    paddingTop: doubleBaseMargin,
    paddingBottom: baseMargin,
    marginTop: baseMargin,
    width: '80%'
  },
  welcomeText: {
    marginBottom: doubleBaseMargin
  },
  or: {
    marginTop: baseMargin * 1.5,
    marginBottom: baseMargin * 1.5
  },
  project: {
    width: isTablet() ? '33%' : '50%',
    alignItems: 'center',
    marginBottom: baseMargin,
    paddingHorizontal: baseMargin / 2,
    paddingBottom: baseMargin / 2
  },
  fileIcon: {
    width: '60@ms',
    height: '60@ms',
    resizeMode: 'contain'
  },
  actionButtons: {
    // minHeight: 150,
    width: '90%',
    maxWidth: 450,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: doubleBaseMargin
  },
  logout: {
    paddingTop: doubleSection
  }
})
