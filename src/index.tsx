import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';

import { routes } from './constants';
import { Home } from './pages';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppContent: FC = () => (
  <NavigationContainer>
    <StatusBar style='dark' />
    <Stack.Navigator initialRouteName={routes.home.name} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.home.name} component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);
