import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, selectors } from 'pltr/v2'
import { t } from 'plottr_locales'
import { View, TouchableWithoutFeedback } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import AddButton from './AddButton'
import IconButton from './IconButton'
import ScrollerView from './ScrollerView'
import styles from './MainListStyles'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'

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
  state = {
    focusGroup: null
  }

  componentWillUnmount () {
    clearInterval(this.groupInterval)
  }

  handleFocusGroup = (focusGroup) => {
    this.setState({ focusGroup })
    clearInterval(this.groupInterval)
    this.groupInterval = setTimeout(this.handleClearFocused, 5e3)
  }

  handleClearFocused = () => {
    this.setState({ focusGroup: null })
  }

  renderTitleHead () {
    const { title, onPressAdd } = this.props
    return (
      title && (
        <View style={styles.titleHead}>
          <Text style={styles.titleText}>{title} </Text>
          {onPressAdd && (
            <AddButton data={{}} onPress={onPressAdd} />
          )}
        </View>
      )
    )
  }

  renderGroupList () {
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
              onPress={onPressAdd} />
          )}
        </View>
      </ShellButton>
    )
  }

  renderList (data) {
    const { list } = this.props
    const listdata = data || list || []
    return (
      <View style={styles.items}>
        {listdata.map(this.renderListItem)}
      </View>
    )
  }

  renderListItem = (item, i) => {
    const {
      type = t('Item'),
      onPressItem,
      fontSize,
      numbered,
      activeKey,
      activeValue,
      alwaysShowDelete,
      onPressDelete
    } = this.props
    const { title, name, colors } = item
    const itemName = title || name || `${t('New')} ${type} ${i+1}`
    const isActive = activeValue && item[activeKey] === activeValue
    const textStyles = [
      styles.itemText,
      isActive && styles.textActive,
      fontSize && { fontSize }
    ]
    return (
      <ShellButton
        key={i}
        data={{ ...item, listIndex: i }}
        style={[styles.item, isActive && styles.itemActive]}
        onPress={onPressItem}>
        {numbered && (
          <View style={styles.number}>
            <Text style={[styles.itemNumber, isActive && styles.textActive]}>
              {`${i + 1}. `}
            </Text>
          </View>
        )}
        <Text style={textStyles}>
          {itemName}
        </Text>
        {onPressDelete && (alwaysShowDelete || isActive) && (
          <IconButton
            data={item}
            name='trash'
            color='white'
            size={10}
            onPress={onPressDelete}
            buttonStyle={styles.trashButton} />
        )}
        {colors && (
          <View style={styles.colors}>
            {colors.map(this.renderColor)}
          </View>
        )}
      </ShellButton>
    )
  }

  renderColor = (color, i) => (
    color && (
      <View key={i} style={[styles.colorDot, {
          backgroundColor: tinycolor(color).toHexString()
        }]}
      />
    )
  )

  render () {
    const { isGroup } = this.props
    return (
      <View style={styles.container}>
        {this.renderTitleHead()}
        <ScrollerView scrollerProps={styles.scroller}>
          {isGroup ? this.renderGroupList() : this.renderList()}
        </ScrollerView>
      </View>
    )
  }
}

MainList.propTypes = {
  title: PropTypes.string,
  // onPressAdd: PropTypes.funct,
  // onPressDelete: PropTypes.funct,
  // onPressItem: PropTypes.funct,
  isGroup: PropTypes.bool,
  numbered: PropTypes.bool,
  alwaysShowDelete: PropTypes.bool,
  list: PropTypes.array
}

export default MainList
