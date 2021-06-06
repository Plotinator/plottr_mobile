import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import HeaderButton from './HeaderButton'
import styles from './HeaderButtonOptionsStyles'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import { cloneDeep } from 'lodash'

export default class HeaderButtonOptions extends Component {
  render() {
    const { style, title, icon, children, button, count } = this.props
    return (
      <View style={[styles.container, style]}>
        <Popover
          popoverStyle={styles.menuPopover}
          placement={PopoverPlacement.BOTTOM}
          from={
            button || <HeaderButton title={title} icon={icon} count={count} />
          }>
          <View>{children}</View>
        </Popover>
      </View>
    )
  }
}

HeaderButtonOptions.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
