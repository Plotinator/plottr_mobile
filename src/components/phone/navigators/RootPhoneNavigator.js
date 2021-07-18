import React, { useRef, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Drawer } from 'native-base'
import MainTabs from './MainTabs'
import SideBar from '../../shared/SideBar'
import ErrorBoundary from '../../shared/ErrorBoundary'

const RootStack = createStackNavigator()

export default function RootPhoneNavigator(props) {
  const drawerRef = useRef(null)
  const closeDrawer = () => drawerRef.current._root.close()
  const openDrawer = () => drawerRef.current._root.open()

  return (
    <ErrorBoundary>
      <Drawer
        ref={drawerRef}
        content={
          <SideBar
            closeFile={props.closeFile}
            closeDrawer={closeDrawer}
            logout={props.logout}
          />
        }
        onClose={closeDrawer}>
        <RootStack.Navigator mode='modal'>
          <RootStack.Screen
            name='Main'
            component={MainTabs}
            options={{ headerShown: false }}
            initialParams={{ openDrawer }}
          />
        </RootStack.Navigator>
      </Drawer>
    </ErrorBoundary>
  )
}
