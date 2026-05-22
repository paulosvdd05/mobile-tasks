import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { linking, AppTheme } from './config';
import { routes } from './constants';
import { useAppTheme, useSessionBootstrap } from './hooks';
import { Auth, Dashboard, Onboarding, Profile } from './pages';
import { useAppSelector } from './store';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const createNavigationTheme = (theme: AppTheme) => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    border: theme.colors.border,
    card: theme.colors.surface,
    notification: theme.colors.primary,
    primary: theme.colors.primary,
    text: theme.colors.text,
  },
  dark: theme.isDark,
});

export const AppContent: FC = () => {
  const theme = useAppTheme();
  const hasHydratedSession = useAppSelector(state => state.app.hasHydratedSession);
  const token = useAppSelector(state => state.session.token);

  useSessionBootstrap();

  if (!hasHydratedSession) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.background,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <StatusBar style={theme.statusBarStyle} />
        <ActivityIndicator color={theme.colors.primary} size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking} theme={createNavigationTheme(theme)}>
      <StatusBar style={theme.statusBarStyle} />
      <Stack.Navigator
        initialRouteName={token ? routes.dashboard.name : routes.onboarding.name}
        screenOptions={{ headerShown: false }}
      >
        {token ? (
          <>
            <Stack.Screen name={routes.dashboard.name} component={Dashboard} />
            <Stack.Screen name={routes.profile.name} component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name={routes.onboarding.name} component={Onboarding} />
            <Stack.Screen name={routes.auth.name} component={Auth} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
