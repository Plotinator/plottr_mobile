import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Project from '../../screens/project'
import Outline, { SceneDetails } from '../../screens/outline'
import { ScreenOptions } from '../../shared/navigators'

const Stack = createStackNavigator()

export default function PlacesStack(props) {
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Project'
        component={Project}
        options={ScreenOptions}
        initialParams={{ openDrawer }}
      />
      <Stack.Screen
        name='Outline'
        component={Outline}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
      <Stack.Screen
        name='SceneDetails'
        component={SceneDetails}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
    </Stack.Navigator>
  )
}
