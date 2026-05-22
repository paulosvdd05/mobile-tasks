import 'react-native-gesture-handler';

import { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appConfig } from './src/config';
import { AppContent } from './src';
import { useAppFonts } from './src/hooks';
import { store } from './src/store';

const App: FC = () => {
  const { fontsLoaded, hasFontError } = useAppFonts();

  if (!fontsLoaded && !hasFontError) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: appConfig.identity.colors.neutral0,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator color={appConfig.identity.colors.primary} size='large' />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
