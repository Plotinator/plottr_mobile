import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectors } from 'pltr/v2'
import { View } from 'react-native'
import Text from './Text'
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

  renderTabCell = (attachment, i, theArray) => {
    const titleDisplay = this.renderAttachmentName(attachment);
    const length = theArray.length;
    const { color } = attachment;
    const { style } = this.props;
    const hexColor = tinycolor(color).toHexString()

    return (
      <View key={i} style={[styles.tabCell, hexColor && { borderColor: hexColor }, style]}>
        {style ?
          <Text color={hexColor} fontSize='tiny' fontStyle='italic'>{`#${titleDisplay}`}</Text> :
          <Text fontSize='tiny' fontStyle='italic'>{`"${titleDisplay}"${i < length - 1 ? ',' : ''}`}</Text>
        }
      </View>
    )
  }

  render() {
    const { attachments, type } = this.props
    const attachmentsList = this.props[`${type}s`]
    const attached = attachmentsList.filter(({ id }) => attachments.indexOf(id) > -1)
    return (
      <View style={styles.tabsBase}>
        {attached.map(this.renderTabCell)}
      </View>
    )
  }
}

AttachmentsPreview.propTypes = {
  attachments: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  sourceType: PropTypes.string.isRequired,
  style: PropTypes.object
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
