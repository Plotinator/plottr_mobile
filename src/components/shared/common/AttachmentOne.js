import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, selectors } from 'pltr/v2'
import { View, ScrollView } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import { Icon } from 'native-base'
import styles from './AttachmentStyles'
import PropTypes from 'prop-types'
import Popover, {
  PopoverMode,
  PopoverPlacement
} from 'react-native-popover-view'

export default class AttachmentOne extends Component {
  renderListItem = (attachment, i) => {
    const titleDisplay = this.renderAttachmentName(attachment)
    const { color } = attachment
    return (
      <ShellButton
        data={attachment}
        key={i}
        style={styles.menuItem}
        onPress={this.handleAddAttachment}>
        <Text fontSize='h6' fontStyle={'semiBold'} color={'textGray'}>
          {titleDisplay}
        </Text>
        {color && <View style={[styles.menuDot, { backgroundColor: color }]} />}
      </ShellButton>
    )
  }

  render() {
    const { placeholderType = 'an Option' } = this.props
    const {
      placeholder = t('Select {type}', { type: placeholderType })
    } = this.props
    return (
      <View style={styles.tabsBase}>
        <Popover
          popoverStyle={styles.menuPopover}
          from={
            <ShellButton style={styles.wholeButton}>
              <Text
                style={styles.addTypeText}
                fontSize='micro'
                fontStyle='italic'
                color='lightGray'>
                {value}
              </Text>
            </ShellButton>
          }>
          <ScrollView style={styles.menuScroller}>
            {unattached.map(this.renderListItem)}
            {unattached.length == 0 && (
              <View style={styles.menuItem}>
                <Text fontSize='h6' fontStyle={'semiBold'} color={'textGray'}>
                  {placeholder}
                </Text>
              </View>
            )}
          </ScrollView>
        </Popover>
      </View>
    )
  }
}
