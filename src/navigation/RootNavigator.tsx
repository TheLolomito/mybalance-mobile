import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen } from '../screens/DashboardScreen';
import { NewMovementScreen } from '../screens/NewMovementScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Settings: undefined;
  NewMovement: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NewMovement" component={NewMovementScreen} />
    </Stack.Navigator>
  );
}
