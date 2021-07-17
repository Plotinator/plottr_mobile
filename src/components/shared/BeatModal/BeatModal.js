import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { t } from 'plottr_locales'
import { Icon } from 'native-base'
import BeatItemTitle from '../../shared/BeatItemTitle'
import { Text, Input, Button, ModalBox } from '../../shared/common'
import styles from './BeatModalStyles'
import { showAlert } from '../../shared/common/AlertDialog'
import { actions, selectors } from 'pltr/v2'

class BeatModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentBeat: {}
    }
    props.sendRef && props.sendRef(this)
  }

  setBeatModalRef = (ref) => (this._BeatModal = ref)

  editBeat = (beat) => {
    this.setState(
      {
        currentBeat: { ...beat }
      },
      () => {
        this._BeatModal.show()
      }
    )
  }

  handleHideBeatModal = () => this._BeatModal.hide()

  handleSetBeatTitle = (title) => {
    const { currentBeat } = this.state
    currentBeat.title = title
    this.setState({ currentBeat })
  }

  handleClearCurrentBeat = (title) => {
    this.setState({ currentBeat: {} })
  }

  handleSaveBeat = () => {
    const {
      currentBeat: { id, bookId, title }
    } = this.state
    const {
      beatActions,
      beatTree,
      hierarchyLevels,
      isSeries,
      hierarchyEnabled
    } = this.props
    this._BeatModal.hide()
    beatActions.editBeatTitle(id, bookId, title || 'auto')
    this.handleClearCurrentBeat()
  }

  handleAskToDeleteBeat = () => {
    // delay for 1 sec
    const {
      currentBeat,
      currentBeat: { title }
    } = this.state
    const {
      positionOffset,
      beatTree,
      hierarchyLevels,
      isSeries,
      hierarchyEnabled,
      beatIndex
    } = this.props
    showAlert({
      title: t('Delete Chapter'),
      message: t('Delete Chapter?'),
      actions: [
        {
          positive: true,
          name: t('Delete Chapter'),
          callback: this.handleDeleteBeat
        },
        {
          name: t('Cancel')
        }
      ]
    })
  }

  handleDeleteBeat = () => {
    const {
      currentBeat: { id, bookId }
    } = this.state
    const { beatActions } = this.props
    this._BeatModal.hide()
    beatActions.deleteBeat(id, bookId)
    this.handleClearCurrentBeat()
  }

  render() {
    const {
      currentBeat: { title }
    } = this.state
    const printTitle = title && title.props ? title.props.beat?.title : title
    return (
      <ModalBox
        title={t('Edit Chapter')}
        ref={this.setBeatModalRef}
        onRequestClose={this.handleHideBeatModal}
        onHide={this.handleClearCurrentBeat}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text center style={styles.description}>
              {t("Enter Chapter's name or enter")}
            </Text>
          </View>
          <View style={styles.row}>
            <Input
              center
              rounded
              placeholder={t('Title')}
              value={printTitle}
              placeholder='auto'
              style={styles.input}
              inputStyle={styles.inputStyle}
              autoCapitalize='sentences'
              onChangeText={this.handleSetBeatTitle}
            />
          </View>
          <View style={[styles.row, styles.last]}>
            <Button
              center
              buttonColor='transparent'
              style={styles.trashButton}
              onPress={this.handleAskToDeleteBeat}>
              <Icon name='trash' type='FontAwesome5' style={styles.trash} />
            </Button>
            <Button center style={styles.button} onPress={this.handleSaveBeat}>
              {t('Save Chapter')}
            </Button>
          </View>
        </View>
      </ModalBox>
    )
  }
}

BeatModal.propTypes = {
  bookId: PropTypes.any
}

function mapStateToProps(state) {
  const bookId = selectors.currentTimelineSelector(state)
  return {
    bookId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    beatActions: bindActionCreators(actions.beat, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeatModal)
