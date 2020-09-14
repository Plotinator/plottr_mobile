import React, { Component } from 'react'
import { View } from 'native-base'
import tinycolor from 'tinycolor2'
import { StyleSheet } from 'react-native'
import { Cell } from '../../ui/Cell'

export class BlankCell extends Component {
  render () {
    const { color } = this.props
    const colorObj = tinycolor(color)
    return <Cell style={styles.cell}>
      <View style={[styles.coloredLine, {borderColor: colorObj.toHexString()}]}/>
    </Cell>
  }
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
  },
  coloredLine: {
    width: '100%',
    borderWidth: 1,
  },
})
