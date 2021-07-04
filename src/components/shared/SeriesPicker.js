import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { t } from 'plottr_locales'
import { selectors, actions } from 'pltr/v2'
import { List, ListItem, Button, Icon } from 'native-base'
import Popover from 'react-native-popover-view'
import { Text, ShellButton, ScrollerView } from './common'
import Metrics from '../../utils/Metrics'
import Colors from '../../utils/Colors'
import Fonts from '../../fonts'
import styles from './SeriesPickerStyles'

const { size: fontSizes, style: fontStyles } = Fonts

class SeriesPicker extends Component {
  state = { open: false }

  handleToggleOpen = () => this.setState({ open: !this.state.open })

  handleChange = (val) => {
    this.props.actions.changeCurrentTimeline(val)
    this.setState({ open: false })
  }

  handleSwitchToSeries() {
    this.handleChange('series')
  }

  renderItems() {
    const { currentTimeline, bookIds, books } = this.props
    return bookIds.map((id) => {
      const book = books[`${id}`]
      return (
        <ShellButton
          data={id}
          key={id}
          style={styles.menuItem}
          onPress={this.handleChange}>
          <Text
            style={styles.itemText}
            color={id == currentTimeline ? 'green' : 'textGray'}>
            {(book && book.title) || t('Untitled')}
          </Text>
        </ShellButton>
      )
    })
  }

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
    const { currentTimeline, series, books } = this.props
    const seriesText =
      series.name == ''
        ? t('Series View')
        : `${series.name} (${t('Series View')})`
    const selectedTitle =
      currentTimeline == 'series'
        ? seriesText
        : books[currentTimeline].title || t('Untitled')
    return (
      <Popover
        style={styles.menuPopover}
        isVisible={this.state.open}
        onRequestClose={this.handleToggleOpen}
        from={
          <ShellButton
            bordered
            dark
            iconRight
            style={styles.picker}
            onPress={this.handleToggleOpen}>
            <Text style={styles.title}>{selectedTitle}</Text>
            <Icon
              type='FontAwesome5'
              name='chevron-down'
              style={styles.caret}
            />
          </ShellButton>
        }>
        <View>
          <ShellButton
            style={styles.menuItem}
            onPress={this.handleSwitchToSeries}>
            <Text style={styles.seriesText}>{seriesText}</Text>
          </ShellButton>
          <ScrollerView style={styles.menuScroller}>
            {this.renderItems()}
          </ScrollerView>
        </View>
      </Popover>
    )
  }
}

SeriesPicker.propTypes = {
  series: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  bookIds: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    series: state.series,
    books: state.books,
    bookIds: state.books.allIds,
    currentTimeline: selectors.currentTimelineSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.ui, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPicker)
