import React from 'react'
import PropTypes from 'react-proptypes'
import { View, Image } from 'react-native'
import { AddButton, ShellButton, Text } from '../../shared/common'
import styles from './DetailImageStyles'
import { t } from 'plottr_locales'
import Metrics from '../../../utils/Metrics'

const { ifTablet } = Metrics

export default function DetailImage({
  image,
  displayStyle,
  imageSourceType,
  editMode,
  onPress
}) {
  let imageStyle = styles.default
  let containerStyle = styles.containerDefault
  let editIconStyle = styles.editIconDefault
  switch (displayStyle) {
    case 'circular':
      imageStyle = styles.circular
      containerStyle = styles.containerCircular
      break
    case 'fullWidth':
      imageStyle = styles.fullWidth
      containerStyle = styles.containerFullWidth
      editIconStyle = styles.editIconFullWidth
      break
  }
  return image ? (
    <View style={containerStyle}>
      <Image
        style={imageStyle}
        source={imageSourceType == 'default' ? image : { uri: image }}
      />
      {editMode ? (
        <AddButton
          style={editIconStyle}
          size={ifTablet(40, 35)}
          icon='camera'
          onPress={onPress}
        />
      ) : null}
    </View>
  ) : editMode ? (
    <ShellButton style={styles.addImageButtonContainer} onPress={onPress}>
      <AddButton size={ifTablet(30, 26)} icon='camera' />
      <Text
        style={styles.addImageText}
        fontSize={ifTablet('h7', 'size13')}
        fontStyle='semiBold'
        color='orange'>
        {t('Add Image')}
      </Text>
    </ShellButton>
  ) : null
}

DetailImage.propTypes = {
  image: PropTypes.string,
  displayStyle: PropTypes.string,
  imageSourceType: PropTypes.string
}
