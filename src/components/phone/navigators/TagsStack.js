import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TagsHome from '../../screens/tags'
import { ScreenOptions } from '../../shared/navigators'

const Stack = createStackNavigator()

export default function TagsStack(props) {
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='TagsHome'
        component={TagsHome}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
    </Stack.Navigator>
  )
}
