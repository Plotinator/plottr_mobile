import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import { Text, ShellButton, Button, WelcomeToPlottr } from '../../shared/common'
import images from '../../../images'
import * as Animatable from 'react-native-animatable'
import { t } from 'plottr_locales'
import { Spinner } from 'native-base'
import { SKIP_VERIFICATION_DURATION } from '../../../utils/constants'

const { PLOTTR_FILE } = images

export default class Dashboard extends Component {
  handleFourceVerify = () => this.props.forceVerify(true)

  renderCTAButtons() {
    const {
      createDocument,
      openDocument,
      logout,
      loading,
      noLogout,
      skipVerificationDetails
    } = this.props
    const currentTime = new Date().getTime()
    const timeLapsedSeconds =
      (parseInt(currentTime) -
        parseInt(skipVerificationDetails?.skipVerificationStartTime)) /
      1000
    let remainingHours =
      Math.floor((SKIP_VERIFICATION_DURATION - timeLapsedSeconds) / 3600) +
      ' hrs'
    // handle 0 hrs
    remainingHours =
      remainingHours === '0 hrs'
        ? Math.floor((SKIP_VERIFICATION_DURATION - timeLapsedSeconds) / 60) +
          ' mins'
        : remainingHours
    return [
      <Button
        block
        key='create'
        disabled={loading}
        buttonColor='green'
        style={styles.button}
        onPress={createDocument}>
        {t('CREATE NEW PROJECT')}
      </Button>,
      <Button
        block
        key={'select'}
        disabled={loading}
        style={styles.button}
        onPress={openDocument}>
        {t('SELECT A PROJECT FILE')}
      </Button>,
      !noLogout && !skipVerificationDetails?.skipVerification && (
        <ShellButton
          key={'logout'}
          disabled={loading}
          style={styles.logout}
          onPress={logout}>
          <Text color='lightgray'>{t('(Logout)')}</Text>
        </ShellButton>
      ),
      skipVerificationDetails?.skipVerification && (
        <ShellButton
          key={'skip'}
          disabled={loading}
          style={styles.logout}
          onPress={this.handleFourceVerify}>
          <Text color='textGray'>
            {t('Please verify your license in {time}', {
              time: remainingHours
            })}
          </Text>
        </ShellButton>
      )
    ]
  }

  renderLoader() {
    return (
      <View style={styles.loader}>
        <Spinner color='orange' />
      </View>
    )
  }

  renderRecentDocument = (document, i) => {
    const { readDocument } = this.props
    return (
      <RecentDocument
        key={i}
        index={i}
        document={document}
        onPress={readDocument}
      />
    )
  }

  renderRecentDocuments(hasRecent) {
    const { loading, recentDocuments } = this.props
    return hasRecent
      ? [
          <Animatable.View
            key={'recents'}
            delay={100}
            duration={1000}
            animation='fadeInUp'
            easing='ease-out-expo'
            style={styles.recentFiles}>
            {recentDocuments.map(this.renderRecentDocument)}
          </Animatable.View>,
          <Animatable.View
            key={'or'}
            delay={120}
            duration={1000}
            animation='fadeInUp'
            easing='ease-out-expo'
            style={styles.or}>
            <Text fontStyle={'bold'}>{t('or').toUpperCase()}</Text>
          </Animatable.View>
        ]
      : null
  }

  render() {
    const { loading, recentDocuments } = this.props
    const hasRecentDocuments = (recentDocuments || []).length
    return (
      <ScrollView contentContainerStyle={styles.scroller}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <WelcomeToPlottr>
              {hasRecentDocuments ? (
                <Text
                  fontStyle='light'
                  color='black'
                  style={styles.welcomeText}>
                  {t('Open one of your most recent projects')}
                </Text>
              ) : (
                <Text
                  fontStyle='light'
                  color='black'
                  center
                  style={styles.welcomeText}>
                  {t('You may create a new project')}
                </Text>
              )}
            </WelcomeToPlottr>
            {this.renderRecentDocuments(hasRecentDocuments)}
            <Animatable.View
              delay={hasRecentDocuments ? 150 : 100}
              duration={1000}
              animation='fadeInUp'
              easing='ease-out-expo'
              style={styles.actionButtons}>
              {loading ? this.renderLoader() : this.renderCTAButtons()}
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}

class RecentDocument extends Component {
  handleSelect = () => {
    const { index, document, onPress } = this.props
    onPress(document, index)
  }
  render() {
    const {
      index,
      document: { name }
    } = this.props
    return (
      <ShellButton
        delay={300 + index * 100}
        duration={600}
        animation='fadeIn'
        easing={'ease-out-back'}
        style={styles.project}
        onPress={this.handleSelect}>
        <Image source={PLOTTR_FILE} style={styles.fileIcon} />
        <Text fontStyle='semiBold' fontSize='h7' center>
          {name}
        </Text>
      </ShellButton>
    )
  }
}
