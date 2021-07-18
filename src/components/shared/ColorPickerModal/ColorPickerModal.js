import React from 'react'
import { View, Modal } from 'react-native'
import ColorPickerList from '../ColorPickerList'
import tinycolor from 'tinycolor2'
import { t } from 'plottr_locales'
import { Text, IconButton } from '../common'
import styles from './Styles'

export default function ColorPickerModal(props) {
  const {
    expressMode,
    currentColor,
    onClose,
    chooseColor,
    visible = true
  } = props
  const color = tinycolor(currentColor)
  const currentBackground = { backgroundColor: color.toHexString() }
  const bodyElement = (
    <View style={styles.container} elevation={10}>
      <View style={expressMode ? styles.expressWrapper : styles.contentWrapper}>
        <View style={styles.base}>
          <IconButton
            name='times'
            style={styles.closeIcon}
            buttonStyle={styles.closeButton}
            onPress={onClose}
          />
          <View style={styles.currentColorWrapper}>
            <Text
              fontSize='small'
              fontStyle='semiBold'
              style={styles.currentTitle}>
              {t('Current Color')}
            </Text>
            <View style={[styles.colorSwatch, currentBackground]} />
          </View>
          <ColorPickerList chooseColor={chooseColor} />
        </View>
      </View>
    </View>
  )
  return expressMode ? (
    <View style={styles.modal}>{bodyElement}</View>
  ) : (
    <Modal
      style={styles.modal}
      visible={visible}
      animationType='slide'
      transparent
      onDismiss={onClose}
      onRequestClose={onClose}>
      {bodyElement}
    </Modal>
  )
}
