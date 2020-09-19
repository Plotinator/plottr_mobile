import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import t from 'format-message'
import AddButton from '../../ui/AddButton'
import DrawerButton from '../../ui/DrawerButton'
import PlotlinesModal from '../plotlines/PlotlinesModal'
import PlotlineDetails from '../plotlines/PlotlineDetails'

const Stack = createStackNavigator()

export default function PlotlinesStack (props) {
  return <Stack.Navigator>
    <Stack.Screen name='PlotlinesHome' component={PlotlinesModal} options={{ title: t('Plotlines'), headerBackTitle: t('Done') }}/>
    <Stack.Screen name='PlotlineDetails' component={PlotlineDetails} options={{ title: t('Plotline Details'), headerBackTitle: t('Back') }} />
  </Stack.Navigator>
}