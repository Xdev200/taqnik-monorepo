import { View, ViewProps, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({ style, lightColor, darkColor, pointerEvents, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? darkColor ?? '#151718' : lightColor ?? '#fff';

  return (
    <View 
  {...props} 
  style={[
    { backgroundColor }, 
    style, 
    pointerEvents ? { pointerEvents } : {} // Ensure it's properly applied
  ]} 
/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 