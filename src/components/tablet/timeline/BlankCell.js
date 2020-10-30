import React, { useRef, useEffect, useState } from 'react'
import { View } from 'native-base'
import tinycolor from 'tinycolor2'
import { StyleSheet } from 'react-native'
import Cell from '../shared/Cell'
import { useRegisterCoordinates } from './hooks'
import CardModal from './CardModal'

export function BlankCell (props) {
  const [cellRef, measure] = useRegisterCoordinates(props.register, props.chapterId, props.lineId, true, 0)
  const [showModal, toggleModal] = useState(false)

  const onLayout = () => measure()

  const renderModal = () => {
    if (!showModal) return null
    return <CardModal isNewCard={true} chapterId={props.chapterId} lineId={props.lineId} navigation={props.navigation} onClose={() => toggleModal(false)} />
  }

  const { color } = props
  const colorObj = tinycolor(color)
  return <Cell style={styles.cell} ref={cellRef} onLayout={onLayout} onPress={() => toggleModal(true)}>
    <View style={[styles.coloredLine, {borderColor: colorObj.toHexString()}]}/>
    { renderModal() }
  </Cell>
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
