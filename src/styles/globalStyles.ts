import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 12,
    },
});