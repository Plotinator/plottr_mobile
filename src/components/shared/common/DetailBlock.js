import React from 'react'
import { View } from 'react-native'
import Fonts from '../../../fonts'
import PropTypes from 'react-proptypes'
import styles from './DetailBlockStyles'
import Text from './Text'
import RichEditor from './RichEditor'

const DetailBlock = (props) => {
  const {
    heading,
    headingStyle = 'bold',
    details,
    type = 'line',
    editMode = false
  } = props
  const isParagraph = type === 'paragraph'

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text fontSize='h7' fontStyle={headingStyle}>
          {heading}
        </Text>
      </View>
      <View style={styles.details}>
        {isParagraph ? (
          <RichEditor
            disabled={!editMode}
            fontSize={Fonts.size.tiny}
            initialValue={details}
          />
        ) : (
          <Text fontSize='tiny' fontStyle='regular'>
            {details}
          </Text>
        )}
      </View>
    </View>
  )
}

DetailBlock.propTypes = {
  heading: PropTypes.string,
  headingStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string
}

export default DetailBlock
