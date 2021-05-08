import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { t } from 'plottr_locales'
import Metrics from '../../utils/Metrics'
import Colors from '../../utils/Colors'
import Fonts from '../../fonts'
import { Text, ShellButton } from '../shared/common'

const { size: fontSizes, style: fontStyles } = Fonts

export default function NewButton (props) {
  const defaultPress = () => {}
  return (
    <ShellButton bordered iconLeft style={styles.button} onPress={props.onPress ?? defaultPress}>
      <Icon type='FontAwesome5' name='plus' style={styles.icon}/>
      <Text style={styles.text}>{t('New')}</Text>
    </ShellButton>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin / 1.75,
    paddingLeft: Metrics.baseMargin * 1.5,
    paddingRight: Metrics.doubleBaseMargin / 1.5,
    borderRadius: Metrics.cornerRadius / 2,
    borderColor: Colors.borderGray,
    // backgroundColor: 'white',
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  text: {
    ...fontStyles.bold,
    color: Colors.white
  },
  icon: {
    marginRight: Metrics.baseMargin,
    fontSize: fontSizes.small,
    color: Colors.white
  },
})
