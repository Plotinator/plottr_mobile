import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { t } from 'plottr_locales'
import AddButton from '../../ui/AddButton'
import DrawerButton from '../../ui/DrawerButton'
import TagsHome from '../tags/TagsHome'
import withBoundary from '../shared/BoundaryWrapper'
import TagDetails from '../tags/TagDetails'
import { RenderTitle } from '../../shared/common/Title'
import { Colors } from '../../../utils'

const Stack = createStackNavigator()
const TagDetailsBounded = withBoundary(TagDetails)

export default function TagsStack(props) {
  const addTag = () => {
    props.navigation.push('TagDetails', { isNewTag: true })
  }
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='TagsHome'
        component={TagsHome}
        initialParams={{ openDrawer }}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: Colors.warmWhite
          },
          title: RenderTitle('Tags'),
          headerRight: () => <AddButton onPress={addTag} />,
          headerLeft: () => (
            <DrawerButton openDrawer={props.route?.params?.openDrawer} />
          )
        }}
      />
      <Stack.Screen
        name='TagDetails'
        component={TagDetailsBounded}
        initialParams={{ openDrawer }}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: Colors.warmWhite
          },
          title: RenderTitle('Tag Details')
        }}
      />
    </Stack.Navigator>
  )
}
