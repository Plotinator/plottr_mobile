import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import Fonts from '../../../fonts'
import PropTypes from 'react-proptypes'
import styles from './DetailBlockStyles'
import Text from './Text'
import Input from './Input'
import RichEditor from './RichEditor'

const DetailBlock = (props) => {
  const {
    heading,
    headingStyle = 'bold',
    details,
    type = 'line',
    editMode = false,
    objectKey,
    onChange,
  } = props
  const isParagraph = type === 'paragraph'

  const LineTextEditor = ({ disabled }) => {
    return disabled ? (
      <Text style={styles.detailsText}>{details}</Text>
    ) : (
      <Input
        inset
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
          style={[styles.headingText, editMode && styles.headingEditText]}>
          {heading}
        </Text>
      </View>
      <View style={styles.details}>
        {isParagraph ? (
          <RichEditor
            disabled={!editMode}
            fontSize={Fonts.size.tiny}
            initialValue={details}
            onChange={(value) => {
              onChange(objectKey, value);
            }}
          />
        ) : (
          !editMode ? (
            <Text style={styles.detailsText}>{details}</Text>
          ) : (
            <Input
              inset
              value={details}
              style={styles.input}
              inputStyle={styles.inputText}
              onChangeText={(value) => {
                onChange(objectKey, value);
              }}
            />
          )
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
  editMode: PropTypes.bool
}

export default DetailBlock
