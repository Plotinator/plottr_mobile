import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import Fonts from '../../../fonts'
import { Metrics } from '../../../utils'
import PropTypes from 'react-proptypes'
import styles from './DetailBlockStyles'
import Text from './Text'
import Input from './Input'
import RichEditor from './RichEditor'

const { ifTablet } = Metrics
const DetailBlock = (props) => {
  const {
    source,
    heading,
    headingStyle = 'bold',
    details,
    type = 'line',
    editMode = false,
    objectKey,
    onChange,
    centerText
  } = props
  const isParagraph = type === 'paragraph'

  const LineTextEditor = ({ disabled }) => {
    return disabled ? (
      <Text style={styles.detailsText}>{details}</Text>
    ) : (
      <Input
        rounded
        value={details}
        style={styles.input}
        inputStyle={styles.inputText}
        onChangeText={onChange}
      />
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text
          fontStyle={headingStyle}
          style={[
            styles.headingText,
            editMode && styles.headingEditText,
            centerText && styles.centerText
          ]}
          center={centerText}>
          {heading}
        </Text>
      </View>
      <View style={styles.details}>
        {isParagraph ? (
          <RichEditor
            hideOnEmpty={!editMode}
            disabled={!editMode}
            fontSize={ifTablet(Fonts.size.tiny, Fonts.size.h5)}
            initialValue={details}
            onChange={(value) => {
              onChange(objectKey, value)
            }}
          />
        ) : !editMode ? (
          <Text
            style={[styles.detailsText, centerText && styles.centerText]}
            center={centerText}>
            {details}
          </Text>
        ) : (
          <Input
            rounded
            value={details}
            style={styles.input}
            inputStyle={styles.inputText}
            onChangeText={(value) => {
              onChange(objectKey, value)
            }}
          />
        )}
      </View>
    </View>
  )
}

DetailBlock.propTypes = {
  heading: PropTypes.string,
  headingStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  editMode: PropTypes.bool,
  centerText: PropTypes.bool
}

export default DetailBlock
