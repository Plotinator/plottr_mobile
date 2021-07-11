import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import styles from './RichEditorStyles'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { moderateScale } from 'react-native-size-matters'
import Text from './Text'
import { Colors, HTMLToSlate, SlateToHTML } from '../../../utils'
import Collapsible from 'react-native-collapsible'
import Metrics from '../../../utils/Metrics'
import { trim } from 'lodash'

const { IS_ANDROID } = Metrics

export default class RichTextEditor extends Component {
  preLength = 0
  getEditor = () => this.richText

  setEditor = (ref) => (this.richText = ref)

  handleEditorInitialized = () => {
    //
  }

  handleOnChange = (HTML) => {
    const { onChange } = this.props
    const SLATE = HTMLToSlate(HTML)
    onChange && onChange(SLATE)
  }

  handleFocusEditor = () => {
    IS_ANDROID && this.richText.focusContentEditor()
  }

  handleBlurEditor = () => {
    // this.richText.blurContentEditor()
  }

  renderTitleIcons = (title, size = 18, style = 'bold', props = {}) => ({
    tintColor,
    selected
  }) => {
    return (
      <Text
        {...props}
        fontSize={size}
        fontStyle={style}
        style={{ color: selected ? Colors.orange : tintColor }}>
        {title}
      </Text>
    )
  }

  render() {
    const {
      style,
      fontSize = 18,
      bgColor = Colors.warmWhiteBG,
      color = Colors.textDarkGrayTone,
      lineHeight = 1.75,
      value,
      onFocus,
      placeholder,
      editorStyle,
      toolbarStyle,
      initialValue,
      initialHTMLText,
      disabled,
      hideOnEmpty
    } = this.props
    const containerStyles = [
      styles.editorContainer,
      { minHeight: disabled ? 50 : 103 }
    ]
    containerStyles.push(style)
    disabled && containerStyles.push(styles.containerDisabled)

    const toolbarStyles = [styles.richToolbar]
    toolbarStyles.push(toolbarStyle)

    const editorStyles = [styles.richEditor]
    disabled && editorStyles.push(styles.editorDisabled)
    editorStyles.push(editorStyle)

    const placeholderText = placeholder || ''
    const html = initialHTMLText || initialValue
    const initialText = typeof html == 'object' ? SlateToHTML(html) : html
    const strippedText = trim(
      String(initialText || '').replace(/(<([^>]+)>)/gi, '')
    )
    const isEmpty = strippedText === ''
    const contentCSSText = `font-family: "Open Sans" !important; font-size: ${fontSize}px; color: ${color} !important; line-height: ${lineHeight}em; padding: 0 0 30px 0;`
    const cssText = `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'); p { margin-top: 0 !important; } body {  background-color: ${
      Colors[bgColor] || bgColor
    } !important; }`
    if (disabled && this.preLength != strippedText.length) {
      this.preLength = strippedText.length
    }
    return isEmpty && hideOnEmpty ? null : (
      <TouchableWithoutFeedback
        onPress={this.handleFocusEditor}
        onPressOut={this.handleBlurEditor}>
        <View style={containerStyles} key={this.preLength}>
          <RichEditor
            pasteAsPlainText
            ref={this.setEditor}
            style={editorStyles}
            editorStyle={{
              color: Colors.darkGray,
              cssText,
              contentCSSText
            }}
            placeholder={placeholderText}
            onFocus={onFocus}
            initialContentHTML={initialText}
            onChange={this.handleOnChange}
            editorInitializedCallback={this.handleEditorInitialized}
            disabled={!!disabled}
          />
          <Collapsible collapsed={!!disabled}>
            <RichToolbar
              style={toolbarStyles}
              iconSize={20}
              iconMap={{
                bold: this.renderTitleIcons('B', 20),
                italic: this.renderTitleIcons('I', 20, 'semiBoldItalic'),
                underline: this.renderTitleIcons('U', 18, 'semiBold', {
                  underlined: true
                }),
                heading2: this.renderTitleIcons('H1'),
                heading3: this.renderTitleIcons('H2')
              }}
              // editor={this.richText}
              getEditor={this.getEditor}
              selectedIconTint={Colors.orange}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.setStrikethrough,
                actions.heading2,
                actions.heading3,
                actions.insertOrderedList,
                actions.insertBulletsList
              ]}
            />
          </Collapsible>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
