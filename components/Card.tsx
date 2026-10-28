import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';
export default function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
const styles = StyleSheet.create({ card: { backgroundColor: theme.card, borderRadius: 22, padding: 16, borderWidth: 1, borderColor: theme.border } });
