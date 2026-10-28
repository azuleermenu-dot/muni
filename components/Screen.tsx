import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/constants/theme';
export default function Screen({ children }: { children: ReactNode }) {
  return <SafeAreaView style={styles.safe}><View style={styles.container}>{children}</View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: theme.bg }, container: { flex: 1, paddingHorizontal: 20 } });
