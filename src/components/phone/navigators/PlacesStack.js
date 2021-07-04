import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PlacesHome, { PlaceDetails } from '../../screens/places'
import { ScreenOptions } from '../../shared/navigators'

const Stack = createStackNavigator()

export default function PlacesStack(props) {
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='PlacesHome'
        component={PlacesHome}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
      <Stack.Screen
        name='PlaceDetails'
        component={PlaceDetails}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
    </Stack.Navigator>
  )
}
