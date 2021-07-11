import { sortBy } from 'lodash'
import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectors, actions } from 'pltr/v2'
import ErrorBoundary from '../../shared/ErrorBoundary'
import SceneCard from '../../tablet/timeline/CardModal'
import styles from './OutlineStyles'
import Toolbar from '../../shared/Toolbar'
import {
  Text,
  BackButton,
  HeaderAttributes,
  AttributesButton,
  HeaderButtonOptions
} from '../../shared/common'
import { t } from 'plottr_locales'

export default class SceneDetails extends Component {
  componentDidMount() {
    const { route } = this.props
    const scene = route && route.params.scene
    console.log('scene', scene)
  }

  saveScene = () => {}

  render() {
    const { navigation, route, openDrawer } = this.props
    const scene = route && route.params.scene
    if (!scene) return null

    return (
      <SafeAreaView style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
            <Toolbar onPressDrawer={openDrawer}>
              <BackButton onPress={navigation.goBack} />
              <View style={[styles.additionals, styles.leanRight]}>
                <HeaderButtonOptions
                  title={t('Attributes')}
                  button={<AttributesButton />}>
                  <HeaderAttributes type={'cards'} />
                </HeaderButtonOptions>
              </View>
            </Toolbar>
            <View style={styles.scene}>
              <SceneCard
                isEmbedded
                key={scene.id}
                card={scene}
                // onSave={this.saveScene}
                navigation={navigation}
              />
            </View>
          </View>
        </ErrorBoundary>
      </SafeAreaView>
    )
  }
}
