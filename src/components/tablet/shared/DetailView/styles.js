import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../../../../utils/Metrics'
import Colors from '../../../../utils/Colors'
import Fonts from '../../../../fonts'

const {
  baseMargin,
  doubleBaseMargin,
  section,
  cornerRadius,
  screenHeight,
  buttonRadius
} = Metrics
const { style, size } = Fonts
const {
  gray,
  white,
  orange,
  textGray,
  lightGray,
  textLightGray,
  lightenGray,
  cloudWhite,
  borderGray,
  textBlack,
  cloudGray
} = Colors

export default ScaledSheet.create({
    detailsWrapper: {
        backgroundColor: white,
        margin: baseMargin,
        padding: baseMargin * 1.5,
        borderRadius: cornerRadius,
        minHeight: 50
    },
    detailsBlock:{
      marginBottom: baseMargin
    },
    detailsBlockHeading:{
      marginBottom: baseMargin / 2

    },
    richEditorStyle: {
      padding:0,
      margin:0,
      borderWidth:0,
    }
})
