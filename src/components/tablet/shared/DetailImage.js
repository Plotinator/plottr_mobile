import React from 'react'
import PropTypes from 'react-proptypes'
import { Image, StyleSheet } from 'react-native'
import Metrics from '../../../utils/Metrics'
import Colors from '../../../utils/Colors'

export default function DetailImage({ image, displayStyle }) {
  let imageStyle = styles.default
  switch (displayStyle) {
    case 'circular':
      imageStyle = styles.circular
      break
    case 'fullWidth':
      imageStyle = styles.fullWidth
      break
    default:
      imageStyle = styles.default
  }
  return image ? <Image style={imageStyle} source={{ uri: image }} /> : null
}

const styles = StyleSheet.create({
  default: {
    resizeMode: 'contain',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    marginTop: Metrics.doubleBaseMargin,
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: Colors.borderGray
  },
  circular: {
    resizeMode: 'cover',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 150,
    width: 200,
    height: 200,
    borderWidth: 1,
    marginTop: Metrics.baseMargin / 2,
    borderColor: Colors.borderGray
  },
  fullWidth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: Metrics.cornerRadius,
    width: '100%',
    height: 400,
    borderWidth: 1,
    borderColor: Colors.borderGray
  }
})

DetailImage.propTypes = {
  image: PropTypes.string.isRequired
}
