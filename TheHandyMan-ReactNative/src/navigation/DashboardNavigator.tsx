import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from '../screens/dashboard/AdminDashboardScreen';
import UserDashboardScreen from '../screens/dashboard/UserDashboardScreen';
import WorkerDashboardScreen from '../screens/dashboard/WorkerDashboardScreen';

const Stack = createNativeStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserDashboard">
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
      <Stack.Screen name="WorkerDashboard" component={WorkerDashboardScreen} />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;