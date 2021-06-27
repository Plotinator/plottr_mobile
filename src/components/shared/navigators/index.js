import React from 'react'
import TabButton from './TabButton'
import TabIcon from './TabIcon'
import TabStyles from './TabStyles'
import { Colors } from '../../../utils'

const TabBarOptions = {
  activeTintColor: '#ff7f32',
  keyboardHidesTabBar: true,
  style: TabStyles.tabContainer,
  labelStyle: TabStyles.tabLabel
  // safeAreaInsets: { bottom: 10 }
}

const TabScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: (props) => <TabIcon {...props} route={route} />,
  tabBarButton: TabButton
})

const ScreenOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: Colors.warmWhite
  }
}

export {
  TabIcon,
  TabButton,
  TabStyles,
  TabBarOptions,
  TabScreenOptions,
  ScreenOptions
}
