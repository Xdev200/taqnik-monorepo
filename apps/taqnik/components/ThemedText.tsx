import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'secondary' | 'primary' | 'accent' | 'error' | 'success';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

export function ThemedText({ 
  style, 
  lightColor, 
  darkColor, 
  variant = 'default',
  weight = 'normal',
  size = 'md',
  ...props 
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getTextColor = () => {
    if (lightColor && darkColor) {
      return colorScheme === 'dark' ? darkColor : lightColor;
    }
    switch (variant) {
      case 'secondary':
        return colors.secondary;
      case 'primary':
        return colors.primary;
      case 'accent':
        return colors.accent;
      case 'error':
        return colors.error;
      case 'success':
        return colors.success;
      default:
        return colors.text;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'xs': return 12;
      case 'sm': return 14;
      case 'md': return 16;
      case 'lg': return 18;
      case 'xl': return 20;
      case '2xl': return 24;
      default: return 16;
    }
  };

  const getFontWeight = () => {
    switch (weight) {
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return '700';
      default: return 'normal';
    }
  };

  return (
    <Text 
      {...props} 
      style={[
        { 
          color: getTextColor(),
          fontSize: getFontSize(),
          fontWeight: getFontWeight(),
        },
        style
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
