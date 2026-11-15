import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import { globalStyles } from './styles/globalStyles';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={globalStyles.screen}>
      <StatusBar style="dark" />
      {loading ? <LoadingScreen /> : <HomeScreen />}
    </View>
  );
}