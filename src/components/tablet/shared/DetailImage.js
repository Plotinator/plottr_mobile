import React from 'react'
import PropTypes from 'react-proptypes'
import { View, Image } from 'react-native'
import { AddButton, Text } from '../../shared/common'
import styles from './DetailImageStyles'
import { t } from 'plottr_locales'


export default function DetailImage({ image, displayStyle, imageSourceType, editMode }) {
  let imageStyle = styles.default;
  let containerStyle = styles.containerDefault;
  let editIconStyle = styles.editIconDefault;
  switch (displayStyle) {
    case 'circular':
      imageStyle = styles.circular;
      containerStyle = styles.containerCircular;
      editIconStyle = styles.editIconDefault;
      break
    case 'fullWidth':
      imageStyle = styles.fullWidth;
      containerStyle = styles.containerFullWidth;
      editIconStyle = styles.editIconFullWidth;
      break
    default:
      imageStyle = styles.default;
      containerStyle = styles.containerDefault;
      editIconStyle = styles.editIconDefault;
  }
  return image ?
    (<View style={containerStyle}>
      <Image
        style={imageStyle}
        source={imageSourceType == 'default' ? image : { uri: image }} />
      {editMode ? <AddButton style={editIconStyle} size={50} icon='camera' onPress={this.handleEdit} /> : null}
    </View>
    ) : (<>
      {editMode ?
        (<View style={styles.addImageButtonContainer}>
          <AddButton size={40} icon='camera' onPress={this.handleEdit} />
          <Text style={styles.addImageText} fontSize='h7' fontStyle='semiBold' color='orange'>
            {t('Add Image')}
          </Text>
        </View>)
        : null}
    </>
    )
}

DetailImage.propTypes = {
  image: PropTypes.string,
  displayStyle: PropTypes.string,
  imageSourceType: PropTypes.string
}
