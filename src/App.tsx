import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import { globalStyles } from './styles/globalStyles';

export default function App() {
  return (
    <View style={globalStyles.screen}>
      <StatusBar style="dark" />
      <HomeScreen />
    </View>
  );
}