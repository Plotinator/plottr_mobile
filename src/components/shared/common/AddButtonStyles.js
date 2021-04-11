import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../../../utils/Colors'

const { orange, white } = Colors

export default ScaledSheet.create({
  plusButton: {
    backgroundColor: orange,
    borderColor: orange,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    height: 26,
    width: 26
  },
  plusIcon: {
    paddingTop: 1,
    paddingLeft: 1.5,
    fontSize: 9,
    color: white
  },
  outlined: {
    backgroundColor: 'transparent'
  }
})
