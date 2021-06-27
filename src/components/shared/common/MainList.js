import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, selectors } from 'pltr/v2'
import { t } from 'plottr_locales'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import AddButton from './AddButton'
import IconButton from './IconButton'
import ScrollerView from './ScrollerView'
import styles from './MainListStyles'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

const DefaultList = [
  {
    title: 'Main',
    data: [
      { name: 'Little Pig #1', role: 'Lead' },
      { name: 'Little Pig #2', role: 'Support' },
      { name: 'Little Pig #3', role: 'Minor' }
    ]
  }
]

class MainList extends Component {
  referrers = []

  state = {
    focusGroup: null
  }

  // events
  componentWillUnmount() {
    clearInterval(this.groupInterval)
  }

  // methods
  setRowReferrer = (ref_name) => (ref) => (this.referrers[ref_name] = ref)

  closeRow({ id, listIndex }) {
    // per row closure
    const Row = this.referrers[`_row_${id}_${listIndex}`]
    if (Row) Row.closeRow()
  }

  // handlers
  handleFocusGroup = (focusGroup) => {
    this.setState({ focusGroup })
    clearInterval(this.groupInterval)
    this.groupInterval = setTimeout(this.handleClearFocused, 5e3)
  }

  handleClearFocused = () => {
    this.setState({ focusGroup: null })
  }

  handlePressLeft = (item) => {
    const { onPressLeft } = this.props
    onPressLeft && onPressLeft(item)
    this.closeRow(item)
  }
  handlePressRight = (item) => {
    const { onPressRight } = this.props
    onPressRight && onPressRight(item)
    this.closeRow(item)
  }

  // renderers
  renderTitleHead() {
    const { title, onPressAdd } = this.props
    return (
      title && (
        <View style={styles.titleHead}>
          <Text style={styles.titleText}>{title} </Text>
          {onPressAdd && <AddButton data={{}} onPress={onPressAdd} />}
        </View>
      )
    )
  }

  renderGroupList() {
    const { list = DefaultList } = this.props
    return list.map((group, i) => {
      return (
        <React.Fragment key={i}>
          {this.renderGroupItem(group)}
          {this.renderList(group.data)}
        </React.Fragment>
      )
    })
  }

  renderGroupItem = (group, i) => {
    const { focusGroup } = this.state
    const { onPressAdd } = this.props
    const { title } = group
    const isFocused = focusGroup && focusGroup.id === group.id
    return (
      <ShellButton
        key={i}
        faded={!isFocused}
        noFeedback
        data={group}
        onPress={this.handleFocusGroup}>
        <View style={styles.groupLabel}>
          <Text style={styles.groupText}>{title}</Text>
          {onPressAdd && (
            <AddButton
              animated
              outlined
              data={group}
              animation={isFocused ? 'fadeIn' : 'fadeOut'}
              onPress={onPressAdd}
            />
          )}
        </View>
      </ShellButton>
    )
  }

  renderList(data) {
    const { list } = this.props
    const listdata = data || list || []
    return <View style={styles.items}>{listdata.map(this.renderListItem)}</View>
  }

  renderListItem = (item, i) => {
    const {
      images = {},
      type = t('Item'),
      onPressItem,
      fontSize,
      numbered,
      activeKey,
      activeValue,
      alwaysShowDelete,
      onPressDelete,
      leftIcon, // 'pen'
      rightIcon, // 'trash'
      onPressLeft,
      onPressRight
    } = this.props
    const { id, title, name, colors, imageId } = item
    const itemName = title || name || `${t('New')} ${type} ${i + 1}`
    const isActive = activeValue && item[activeKey] === activeValue
    const textStyles = [
      styles.itemText,
      isActive && styles.textActive,
      fontSize && { fontSize }
    ]
    const image = images[imageId] && { uri: images[imageId].data }
    return (
      <SwipeRow
        key={i}
        ref={this.setRowReferrer(`_row_${id}_${i}`)}
        closeOnRowPress
        leftOpenValue={50}
        rightOpenValue={-50}
        swipeToOpenPercent={50}
        swipeToClosePercent={20}
        disableLeftSwipe={!onPressRight}
        disableRightSwipe={!onPressLeft}>
        <View style={styles.sliderRow}>
          <View style={styles.slideColumn}>
            {onPressLeft && (
              <IconButton
                data={{ ...item, listIndex: i }}
                onPress={this.handlePressLeft}
                buttonStyle={styles.leftButton}
                name={leftIcon}
                size={20}
              />
            )}
          </View>
          <View style={styles.slideColumn}>
            {onPressRight && (
              <IconButton
                data={{ ...item, listIndex: i }}
                onPress={this.handlePressRight}
                buttonStyle={styles.rightButton}
                name={rightIcon}
                size={20}
              />
            )}
          </View>
        </View>
        <View style={styles.wrapper}>
          <ShellButton
            data={{ ...item, listIndex: i }}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={onPressItem}>
            {numbered && (
              <View style={styles.number}>
                <Text
                  style={[styles.itemNumber, isActive && styles.textActive]}>
                  {`${i + 1}. `}
                </Text>
              </View>
            )}
            {imageId && images[imageId] && (
              <Image source={image} style={styles.image} />
            )}
            <Text style={textStyles}>{itemName}</Text>
            {onPressDelete && (alwaysShowDelete || isActive) && (
              <IconButton
                data={item}
                name='trash'
                color='white'
                size={10}
                onPress={onPressDelete}
                buttonStyle={styles.trashButton}
                style={styles.trashIcon}
              />
            )}
            {colors && (
              <View style={styles.colors}>{colors.map(this.renderColor)}</View>
            )}
          </ShellButton>
        </View>
      </SwipeRow>
    )
  }

  renderColor = (color, i) =>
    color && (
      <View
        key={i}
        style={[
          styles.colorDot,
          {
            backgroundColor: tinycolor(color).toHexString()
          }
        ]}
      />
    )

  render() {
    const { isGroup, list } = this.props
    const noEmpty = list && list.length > 0
    return (
      <View style={styles.container}>
        {this.renderTitleHead()}
        {noEmpty && (
          <ScrollerView scrollerProps={styles.scroller}>
            {isGroup ? this.renderGroupList() : this.renderList()}
          </ScrollerView>
        )}
      </View>
    )
  }
}

MainList.propTypes = {
  images: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  // onPressAdd: PropTypes.funct,
  // onPressDelete: PropTypes.funct,
  // onPressItem: PropTypes.funct,
  isGroup: PropTypes.bool,
  numbered: PropTypes.bool,
  alwaysShowDelete: PropTypes.bool,
  list: PropTypes.array
}

function mapStateToProps(state) {
  return {
    images: state.images
  }
}

export default connect(mapStateToProps, null)(MainList)
