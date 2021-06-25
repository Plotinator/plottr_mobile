import React from 'react'
import { t } from 'plottr_locales'
import { createStackNavigator } from '@react-navigation/stack'
import PlacesHome from '../places/PlacesHome'
import PlaceDetails from '../places/PlaceDetails'
import AddButton from '../../ui/AddButton'
import DrawerButton from '../../ui/DrawerButton'
import withBoundary from '../shared/BoundaryWrapper'
import { RenderTitle } from '../../shared/common'

const Stack = createStackNavigator()
const PlaceDetailsBounded = withBoundary(PlaceDetails)

export default function PlacesStack(props) {
  const addPlace = () => {
    props.navigation.push('PlaceDetails', { isNewPlace: true })
  }
  const openDrawer = props.route?.params?.openDrawer
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='PlacesHome'
        initialParams={{ openDrawer }}
        component={PlacesHome}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f5f4f0' // warmWhite
          },
          title: RenderTitle('Places'),
          headerRight: () => <AddButton onPress={addPlace} />,
          headerLeft: () => (
            <DrawerButton openDrawer={props.route?.params?.openDrawer} />
          )
        }}
      />
      <Stack.Screen
        name='PlaceDetails'
        component={PlaceDetailsBounded}
        initialParams={{ openDrawer }}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f5f4f0' // warmWhite
          },
          title: RenderTitle('Place Details')
        }}
      />
    </Stack.Navigator>
  )
}
