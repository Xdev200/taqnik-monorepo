import { Text, TextProps, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function ThemedText({ style, lightColor, darkColor, ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? darkColor ?? '#ECEDEE' : lightColor ?? '#11181C';

  return <Text style={[{ color }, style]} {...props} />;
} 