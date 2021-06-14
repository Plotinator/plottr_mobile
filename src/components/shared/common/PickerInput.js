import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import Text from './Text'
import ShellButton from './ShellButton'
import IconButton from './IconButton'
import styles from './PickerInputStyles'
import PropTypes from 'prop-types'
import Popover, {
  PopoverMode,
  PopoverPlacement
} from 'react-native-popover-view'
import { t } from 'plottr_locales'

const PickerInput = (props) => {
  const {
    editMode,
    valueKey,
    displayKey,
    paramKey,
    options,
    value,
    onChange,
    title = t('Option')
  } = props
  const selected = [
    ...options,
    { [valueKey]: null, [displayKey]: t('Select {title}', { title }) }
  ].find((option) => String(option[valueKey]) == String(value))

  const handleChange = (option) =>
    onChange && onChange(paramKey, option[valueKey])
  const renderOption = (option, i) => {
    const isSelected = selected[valueKey] == option[valueKey]
    return (
      <ShellButton
        data={option}
        key={i}
        style={styles.menuItem}
        onPress={handleChange}>
        <Text
          style={styles.menuText}
          color={isSelected ? 'orange' : 'textGray'}>
          {option[displayKey]}
        </Text>
      </ShellButton>
    )
  }

  const render = () => {
    return editMode ? (
      <View style={styles.wrapper}>
        <View style={styles.label}>
          <Text style={styles.labelEditText}>{title}</Text>
        </View>
        <View style={styles.container}>
          <Popover
            popoverStyle={styles.menuPopover}
            from={
              <ShellButton style={styles.selected}>
                <Text style={styles.name}>{selected[displayKey]}</Text>
                <IconButton style={styles.caret} name='chevron-down' />
              </ShellButton>
            }>
            <ScrollView style={styles.menuScroller}>
              {options.map(renderOption)}
              {options.length == 0 && (
                <View style={styles.menuItem}>
                  <Text style={styles.menuText}>{t('No options :/')}</Text>
                </View>
              )}
            </ScrollView>
          </Popover>
        </View>
      </View>
    ) : (
      <View style={styles.wrapper}>
        <Text style={styles.labelText}>{title}</Text>
        <Text style={styles.detailsText}>{selected[displayKey]}</Text>
      </View>
    )
  }

  return render()
}

PickerInput.propTypes = {
  editMode: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  valueKey: PropTypes.string.isRequired,
  paramKey: PropTypes.string.isRequired,
  displayKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  onChange: PropTypes.func.isRequired
}

export default PickerInput
