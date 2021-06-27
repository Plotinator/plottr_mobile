import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotesHome, { NoteDetails } from '../../screens/notes'
import { ScreenOptions } from '../../shared/navigators'

const Stack = createStackNavigator()

export default function NotesStack(props) {
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='NotesHome'
        component={NotesHome}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
      <Stack.Screen
        name='NoteDetails'
        component={NoteDetails}
        initialParams={{ openDrawer }}
        options={ScreenOptions}
      />
    </Stack.Navigator>
  )
}
