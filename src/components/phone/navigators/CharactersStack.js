import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CharactersHome, { CharacterDetails } from '../../screens/characters'
import { ScreenOptions } from '../../shared/navigators'

const Stack = createStackNavigator()

export default function CharactersStack(props) {
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='CharactersHome'
        component={CharactersHome}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
      <Stack.Screen
        name='CharacterDetails'
        component={CharacterDetails}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
    </Stack.Navigator>
  )
}
