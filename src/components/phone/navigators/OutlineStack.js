import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { t } from 'plottr_locales'
import OutlineHome from '../outline/OutlineHome'
import Project from '../../screens/project'
import SceneDetails from '../outline/SceneDetails'
import { getStore } from '../../../store/configureStore'
import { actions } from 'pltr/v2'
import AddButton from '../../ui/AddButton'
import DrawerButton from '../../ui/DrawerButton'
import withBoundary from '../shared/BoundaryWrapper'
import { RenderTitle } from '../../shared/common'
import { Colors } from '../../../utils'

const Stack = createStackNavigator()
const SceneDetailsBounded = withBoundary(SceneDetails)

export default function OutlineStack(props) {
  const addChapter = () => {
    const store = getStore()
    const state = store.getState()
    const currentTimeline = state.ui.currentTimeline

    // TODO: rename scene to chapter
    store.dispatch(actions.beat.addBeat(currentTimeline))
  }
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Project'
        component={Project}
        options={{
          title: RenderTitle('Project'),
          headerShown: false
        }}
        initialParams={{ openDrawer }}
      />
      <Stack.Screen
        name='Outline'
        component={OutlineHome}
        options={{
          title: RenderTitle('Outline'),
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.warmWhite
          }
        }}
        initialParams={{ openDrawer }}
      />
      <Stack.Screen
        name='SceneDetails'
        component={SceneDetailsBounded}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.warmWhite
          },
          title: RenderTitle('Scene Details')
        }}
        initialParams={{ openDrawer }}
      />
    </Stack.Navigator>
  )
}
