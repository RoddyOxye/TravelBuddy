import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import { globalStyles } from './styles/globalStyles';
import Header from './components/Header';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.screen}>
        <StatusBar style="dark" />
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Header />
            <HomeScreen />
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}