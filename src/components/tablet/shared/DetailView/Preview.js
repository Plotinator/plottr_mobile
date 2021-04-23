import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'native-base'
import { selectors, actions, helpers, initialState } from 'pltr/v2'
import {
  View,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import { t } from 'plottr_locales'
import {
  Input,
  Text,
  Button,
  RichEditor,
  ShellButton,
  AddButton,
  AttachmentsPreview,
  Attachments
} from '../../../shared/common'
import styles from './styles'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import Collapsible from 'react-native-collapsible'
import DetailImage from '../DetailImage'
import EditButton from '../../../shared/common/EditButton'
import Fonts from '../../../../fonts'

class DetailPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      object: null,
      objectMeta: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { object, objectMeta } = props
    return {
      object: cloneDeep(object),
      objectMeta: cloneDeep(objectMeta)
    }
  }

  handleEdit = () => {}

  renderAttribute = (attribute, i) => {
    const { object } = this.state
    const {
      title,
      key,
      type,
      titleStyle,
      attachmentType,
      attachmentSourceType,
      itemStyle
    } = attribute
    return (
      <View style={styles.attributeContainer}>
        {object[key] && object[key].length > 0 && (
          <View key={i} style={styles.detailsBlock}>
            <View style={styles.detailsBlockHeading}>
              <Text
                fontSize='h7'
                fontStyle='bold'
                style={titleStyle ? titleStyle : {}}>
                {title}
              </Text>
            </View>
            <View style={styles.detailsBlockDetails}>
              {type === 'line' && (
                <Text fontSize='tiny' fontStyle='regular'>
                  {object[key]}
                </Text>
              )}
              {type === 'paragraph' && (
                <RichEditor
                  fontSize={Fonts.size.tiny}
                  initialValue={object[key]}
                  disabled
                />
              )}
              {type === 'attachment' && (
                <Collapsible collapsed={false}>
                  <AttachmentsPreview
                    cardId={object.id}
                    attachments={object[key]}
                    type={attachmentType}
                    sourceType={attachmentSourceType}
                    style={itemStyle}
                  />
                </Collapsible>
              )}
            </View>
          </View>
        )}
      </View>
    )
  }

  render() {
    const { object, objectMeta } = this.state
    // console.log("IMAGE----------", object.image);
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <ScrollView
            style={styles.scroller}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback>
              <View style={styles.detailsWrapper}>
                <View style={styles.detailsBlock}>
                  {object.image && (
                    <DetailImage
                      displayStyle={objectMeta.image.displayStyle}
                      image={object.image && object.image.data}
                    />
                  )}
                </View>
                <View style={styles.detailsBlock}>
                  <View style={styles.detailsBlockHeading}>
                    <Text fontSize='h7' fontStyle='bold'>
                      {objectMeta.title.content}
                    </Text>
                  </View>
                  <View style={styles.detailsBlockDetails}>
                    {objectMeta.description.type === 'line' && (
                      <Text fontSize='tiny' fontStyle='regular'>
                        {objectMeta.description.content}
                      </Text>
                    )}
                    {objectMeta.description.type === 'paragraph' && (
                      <RichEditor
                        disabled
                        fontSize={Fonts.size.tiny}
                        initialValue={objectMeta.description.content}
                      />
                    )}
                  </View>
                </View>
                {objectMeta && objectMeta.attributes.map(this.renderAttribute)}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <View style={styles.editButtonContainer}>
            <AddButton size={50} icon='pen' onPress={this.handleEdit} />
          </View>
        </View>
      </View>
    )
  }
}

DetailPreview.propTypes = {
  object: PropTypes.object.isRequired,
  attributes: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    positionOffset: selectors.positionOffsetSelector(state),
    beats: selectors.sortedBeatsByBookSelector(state),
    lines: selectors.sortedLinesByBookSelector(state),
    bookId: selectors.currentTimelineSelector(state),
    cards: state.cards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.card, dispatch),
    uiActions: bindActionCreators(actions.ui, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPreview)
// export default DetailPreview
