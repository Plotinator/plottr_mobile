import React, { Component } from 'react'
import { View } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import Checkbox from './Checkbox'
import styles from './HeaderFilterStyles'
import { cloneDeep } from 'lodash'
import { t } from 'plottr_locales'
import Collapsible from 'react-native-collapsible'

export default class HeaderButtonOptions extends Component {
  state = {
    filters: [],
    selected: {}
  }

  handleClearFilter = () => {
    this.setState({
      selected: {}
    })
  }

  handleSelect = (active, checkbox) => {
    const { label, selectIndex } = checkbox
    const { selected } = this.state
    const { onFilter } = this.props
    const newSelected = cloneDeep(selected)
    if (active)
      newSelected[selectIndex] = checkbox
    else
      delete newSelected[selectIndex]
    this.setState({ selected: newSelected })
    onFilter && onFilter(newSelected)
  }

  renderGroup = ({ title, data = [] }, k) => {
    return (
      <View style={styles.filterColumn} key={k}>
        {title ? <Text style={styles.columnTitle}>{title}</Text> : null}
        {data.map((checkbox, i) => {
          const { label } = checkbox
          const { selected } = this.state
          const selectIndex = `${title}:${label}`
          const isActive = selected[selectIndex]
          return (
            <Checkbox
              key={i}
              index={i}
              active={isActive}
              data={{...checkbox, selectIndex }}
              onChange={this.handleSelect}
              label={label}
            />
          )
        })}
        {data.length == 0 ? <Text fontSize='micro'>{t('n/a')}</Text> : null}
      </View>
    )
  }

  render () {
    const { style, title, icon, options = [] } = this.props
    const { selected } = this.state
    const hasFilter = Object.keys(selected).length
    return (
      <View style={styles.container}>
        <View style={styles.filterBase}>
          {options.map(this.renderGroup)}
        </View>
        <Collapsible collapsed={!hasFilter}>
          <ShellButton
            onPress={this.handleClearFilter}
            style={styles.clearButton}>
            <Text center style={styles.clearText}>
              {t('Clear All Filters')}
            </Text>
          </ShellButton>
        </Collapsible>
      </View>
    )
  }
}
