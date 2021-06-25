import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { t } from 'plottr_locales'
import NotesHome from '../notes/NotesHome'
import NoteDetails from '../notes/NoteDetails'
import AddButton from '../../ui/AddButton'
import DrawerButton from '../../ui/DrawerButton'
import withBoundary from '../shared/BoundaryWrapper'
import { RenderTitle } from '../../shared/common'

const Stack = createStackNavigator()
const NoteDetailsBounded = withBoundary(NoteDetails)

export default function NotesStack(props) {
  const addNote = () => {
    props.navigation.push('NoteDetails', { isNewNote: true })
  }
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='NotesHome'
        component={NotesHome}
        initialParams={{ openDrawer }}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f5f4f0' // warmWhite
          },
          title: RenderTitle('Notes'),
          headerRight: () => <AddButton onPress={addNote} />,
          headerLeft: () => (
            <DrawerButton openDrawer={props.route?.params?.openDrawer} />
          )
        }}
      />
      <Stack.Screen
        name='NoteDetails'
        component={NoteDetailsBounded}
        initialParams={{ openDrawer }}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f5f4f0' // warmWhite
          },
          title: RenderTitle('Note Details')
        }}
      />
    </Stack.Navigator>
  )
}
