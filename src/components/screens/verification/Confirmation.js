import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import {
  Text,
  ShellButton,
  Input,
  Button,
  WelcomeToPlottr,
  GoToPlottrDotCom
} from '../../shared/common'
import images from '../../../images'
import * as Animatable from 'react-native-animatable'
import { t } from 'plottr_locales'
import Metrics from '../../../utils/Metrics'
import AsyncStorage from '@react-native-community/async-storage'
import { SKIP_VERIFICATION_DURATION, SKIP_VERIFICATION_KEY } from '../../../utils/constants'
import { _UpdateData } from '../../AuthenticatorRoot'
import { cloneDeep } from 'lodash'


const { IS_ANDROID } = Metrics

class VerificationConfirmation extends Component {
  state = {
    code: '',
    submitted: false,
    resent: false
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { verifying } = nextProps
    const { submitted } = prevState
    if (!verifying && submitted == true) prevState.submitted = false
    return prevState
  }

  componentDidUpdate() {
    const { user, verifying } = this.props
    if (!verifying && user && user.email && user.verified) {
      // user is now valid and logged in and
      // AuthenticatorRoot should now be unmounting
    }
  }

  handleCodeText = (code) => this.setState({ code })

  handleCodeValidation = () => {
    const { code } = this.state
    const {
      route: {
        params: { verifyCode }
      }
    } = this.props
    verifyCode(code)
    this.setState({ submitted: true })
  }

  handleResendEmail = () => {
    const {
      // user: { email },
      user,
      route: {
        params: { sendVerificationEmail }
      }
    } = this.props
    sendVerificationEmail(user)
    this.setState({ resent: true })
  }

  handleDifferentEmail = () => {
    const { navigation } = this.props
    navigation.navigate('Verification')
  }

  handleSkipVerification = () => {
    const {
      verifying,
      user,
      route: {
        params: { updateSkipVerification, forceVerify }
      },
      skipVerificationDetails
    } = this.props
    let skipVerificationInfo = {
      'skipVerification': true,
      'skipVerificationStartTime':
        skipVerificationDetails?.skipVerificationStartTime ?
          skipVerificationDetails?.skipVerificationStartTime :
          new Date().getTime()
    }
    AsyncStorage.setItem(SKIP_VERIFICATION_KEY, JSON.stringify(skipVerificationInfo));
    const data = {
      user: cloneDeep(user),
      verifying,
      skipVerificationDetails: cloneDeep(skipVerificationInfo)
    }
    _UpdateData(data);
    updateSkipVerification(skipVerificationInfo);
    forceVerify(false);
  }

  didTimeLapse = (skipVerificationDetails) => {
    const { skipVerification, skipVerificationStartTime } = skipVerificationDetails;
    const currentTime = new Date().getTime();
    const timeLapsedSeconds =
      skipVerification === undefined ? 0 : (parseInt(currentTime) - parseInt(skipVerificationStartTime)) / 1000;
    return timeLapsedSeconds < SKIP_VERIFICATION_DURATION;
  }

  render() {
    const { code, resent, submitted } = this.state
    const {
      verifying,
      user: { email },
      skipVerificationDetails
    } = this.props
    const isValidCode = code && !code.match(/[^0-9]/)
    console.log('isValidCode', isValidCode, code)
    return (
      <ScrollView
        contentContainerStyle={styles.scroller}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <WelcomeToPlottr>
              <Text black fontStyle='bold' fontSize='h3' center>
                {t('Enter your verification code')}
              </Text>
              <Text black fontSize='h4' center>
                {t('to activate this device.')}
              </Text>
            </WelcomeToPlottr>
            <Animatable.View
              delay={100}
              duration={1000}
              animation='fadeInUp'
              easing='ease-out-expo'
              style={styles.formSection}>
              <Input
                friendly
                value={code}
                disabled={verifying}
                keyboardType='numeric'
                placeholder={t('CODE')}
                onChangeText={this.handleCodeText}
              />
              <Button
                block
                disabled={verifying || !isValidCode}
                buttonColor='green'
                style={styles.button}
                onPress={this.handleCodeValidation}>
                {t(verifying && submitted ? 'VERIFYING...' : 'VERIFY CODE')}
              </Button>
            </Animatable.View>
            <Animatable.View
              delay={170}
              duration={1000}
              animation='fadeInUp'
              easing='ease-out-expo'
              style={styles.emailVerification}>
              <Text black fontSize='h4'>
                {t('A verification code was sent to:')}
              </Text>
              <Text black fontStyle='bold' fontSize='h5'>
                {email}
              </Text>
            </Animatable.View>
            <Animatable.View
              delay={150}
              duration={1000}
              animation='fadeInUp'
              easing='ease-out-expo'
              style={styles.actionButtons}>
              <Button
                block
                disabled={verifying || resent}
                buttonColor='blue'
                style={styles.button}
                onPress={this.handleResendEmail}>
                {t(resent && verifying ? 'RESENDING...' : 'RESEND EMAIL')}
              </Button>
              <View style={styles.or}>
                <Text fontStyle={'bold'}>{t('or')}</Text>
              </View>
              <Button
                block
                disabled={verifying}
                style={styles.button}
                onPress={this.handleDifferentEmail}>
                {t('Use a different email').toUpperCase()}
              </Button>
              {/* <View style={styles.or}>
                <Text fontStyle={'bold'}>{t('or')}</Text>
              </View> */}
              {/* <ShellButton */}
              {this.didTimeLapse(skipVerificationDetails) && <ShellButton
                block
                disabled={verifying}
                style={styles.button}
                buttonColor='lightGray'
                onPress={this.handleSkipVerification}>
                <Text>{!skipVerificationDetails?.skipVerification ? t('Skip verification for a day') : t('I will verify later')}</Text>
              </ShellButton>
              }
              {IS_ANDROID && <GoToPlottrDotCom />}
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}

const mapStateToProps = (data) => {
  const { user, verifying, skipVerificationDetails } = data.data;
  return {
    user: user || {},
    verifying,
    skipVerificationDetails: skipVerificationDetails || {}
  }
}

export default connect(mapStateToProps)(VerificationConfirmation)
