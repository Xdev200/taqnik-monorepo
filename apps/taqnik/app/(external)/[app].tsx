import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function ExternalAppRedirect() {
  const { app } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const redirectToApp = async () => {
      try {
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Map the app parameter to the actual app URL
        const appRoutes = {
          'build-it': '/build-it' as const // Type assertion to make it a literal type
        };

        const route = appRoutes[app as keyof typeof appRoutes];
        if (route) {
          router.replace(route);
        } else {
          // Handle invalid app route
          router.replace('/');
        }
      } catch (error) {
        console.error('Error redirecting to app:', error);
        router.replace('/');
      }
    };

    redirectToApp();
  }, [app, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#333" />
      <Text style={styles.text}>Redirecting to {app}...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
}); 