import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import NavigationHeader from '../components/NavigationHeader';
import Footer from '../components/Footer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              header: () => <NavigationHeader />,
              contentStyle: {
                backgroundColor: '#fff',
                flex: 1,
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="products" />
            <Stack.Screen
              name="products/[id]"
              options={{
                title: 'Product Details',
              }}
            />
            <Stack.Screen 
              name="(external)/[app]"
              options={{
                title: 'Redirecting...',
                headerShown: false,
              }}
            />
            <Stack.Screen name="blog" />
            <Stack.Screen name="ai-tools" />
          </Stack>
          <Footer />
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
