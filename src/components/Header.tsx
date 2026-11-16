import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>TravelBuddy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
});