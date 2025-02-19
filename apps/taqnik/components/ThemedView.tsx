import { View, ViewProps, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'surface' | 'card';
};

export function ThemedView({ style, lightColor, darkColor, variant = 'default', ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getBackgroundColor = () => {
    if (lightColor && darkColor) {
      return colorScheme === 'dark' ? darkColor : lightColor;
    }
    switch (variant) {
      case 'surface':
        return colors.surface;
      case 'card':
        return colors.card;
      default:
        return colors.background;
    }
  };

  return (
    <View 
      {...props} 
      style={[
        { backgroundColor: getBackgroundColor() },
        styles.container,
        style
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
