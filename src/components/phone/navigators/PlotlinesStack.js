import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { t } from 'plottr_locales'
import PlotlinesScreen from '../plotlines/PlotlinesScreen'
import PlotlineDetails from '../plotlines/PlotlineDetails'
import withBoundary from '../shared/BoundaryWrapper'
import { RenderTitle } from '../../shared/common'

const Stack = createStackNavigator()
const PlotlineDetailsBounded = withBoundary(PlotlineDetails)

export default function PlotlinesStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='PlotlinesHome'
        component={PlotlinesScreen}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f5f4f0' // warmWhite
          },
          title: RenderTitle('Plotlines'),
          headerBackTitle: RenderTitle('Done')
        }}
      />
      <Stack.Screen
        name='PlotlineDetails'
        component={PlotlineDetailsBounded}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f5f4f0' // warmWhite
          },
          title: RenderTitle('Plotline Details'),
          headerBackTitle: RenderTitle('Back')
        }}
      />
    </Stack.Navigator>
  )
}
