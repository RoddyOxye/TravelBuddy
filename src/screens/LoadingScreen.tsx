import { View } from 'react-native';
import { Image } from 'expo-image';
import { globalStyles } from '../styles/globalStyles';

// Splash Screen
export default function LoadingScreen() {
  return (
    <View
      style={[
        globalStyles.screen,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Image
        source={require('../assets/loading.gif')}
        style={{ width: 220, height: 220 }}
        contentFit="contain"
        autoplay
        accessibilityLabel="A carregar o TravelBuddy"
      />
    </View>
  );
}