import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectors } from 'pltr/v2'
import { View } from 'react-native'
import Text from './Text'
import Attachments from './Attachments'
import styles from './AttachmentPreviewStyles'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'

class AttachmentsPreview extends Component {
  renderAttachmentName(attachment) {
    const { type } = this.props
    const { title, name } = attachment
    const firstCapital = type.substring(0, 1).toUpperCase()
    const commonLast = type.substring(1)
    return name || title || `New ${firstCapital}${commonLast}`
  }

  renderAttachment = (attachment, i, theArray) => {
    const titleDisplay = this.renderAttachmentName(attachment)
    const { color } = attachment
    const { style, rounded, type } = this.props
    const showHash = type === 'tag'
    const divider = i < theArray.length - 1 ? ',' : ''
    const printText = showHash ? titleDisplay : `"${titleDisplay}"${divider}`
    const hexColor = color ? tinycolor(color).toHexString() : null
    const allStyles = [
      styles.attachment,
      showHash && rounded && styles.hash,
      { borderColor: hexColor }
    ]
    const tagTextProps = {
      fontSize: 'tiny',
      fontStyle: 'italic'
    }
    showHash ? (tagTextProps.color = hexColor) : null

    return (
      <View key={i} style={allStyles}>
        <Text {...tagTextProps}>
          {showHash && (
            <Text {...tagTextProps} faded>
              #
            </Text>
          )}
          {`${printText}`}
        </Text>
      </View>
    )
  }

  render() {
    const {
      title,
      source,
      titleStyle = 'bold',
      attachments,
      type,
      cardId,
      editMode
    } = this.props
    const attachmentsList = this.props[`${type}s`]
    const attached = attachmentsList.filter(
      ({ id }) => attachments.indexOf(id) > -1
    )
    return (
      <View style={styles.container}>
        {title && (
          <View style={styles.heading}>
            <Text
              fontStyle={titleStyle}
              style={[styles.headingText, editMode && styles.headingEditText]}>
              {title}
            </Text>
          </View>
        )}
        {editMode ? (
          <Attachments
            cardId={cardId}
            attachments={attachments}
            type={type}
            sourceType={source}
          />
        ) : (
          <View style={styles.attachments}>
            {attached.map(this.renderAttachment)}
          </View>
        )}
      </View>
    )
  }
}

AttachmentsPreview.propTypes = {
  attachments: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  rounded: PropTypes.bool
}

function mapStateToProps(state) {
  const { books = [] } = state
  const bookIds = []
  Object.keys(books).map((key, index) => {
    bookIds[index] = { ...books[key] }
  })
  return {
    characters: selectors.charactersSortedAtoZSelector(state),
    places: selectors.placesSortedAtoZSelector(state),
    tags: selectors.sortedTagsSelector(state),
    books: [state.books],
    bookIds
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentsPreview)
