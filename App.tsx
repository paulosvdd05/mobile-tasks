import 'react-native-gesture-handler';

import { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
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
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
