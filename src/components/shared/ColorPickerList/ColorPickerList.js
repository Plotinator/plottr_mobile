import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import { colors } from 'pltr/v2'
import tinycolor from 'tinycolor2'
import { Text, ScrollerView, ShellButton } from '../common'
import styles from './Styles'

export default function ColorPickerList({ chooseColor }) {
  const renderColorList = (list) => {
    return list.map((c) => {
      const color = tinycolor(c)
      const hexVal = color.toHexString()
      const backgroundColor = { backgroundColor: hexVal }
      return (
        <ShellButton data={c} key={c} onPress={chooseColor}>
          <View style={[styles.colorSwatch, backgroundColor]} />
        </ShellButton>
      )
    })
  }

  const renderColorGroups = () => {
    return colors.colorsWithKeys.map((obj) => {
      return (
        <View style={styles.groupWrapper} key={obj.title}>
          <Text fontStyle='semiBold' style={styles.title}>
            {obj.title}
          </Text>
          <View style={styles.colorGroup}>{renderColorList(obj.colors)}</View>
        </View>
      )
    })
  }

  return (
    <View style={styles.wrapper}>
      <ScrollerView>
        <View style={styles.colors}>{renderColorGroups()}</View>
      </ScrollerView>
    </View>
  )
}
