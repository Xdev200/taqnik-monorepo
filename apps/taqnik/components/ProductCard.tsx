import { StyleSheet, Text, View, Image, Pressable, Linking } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  playstoreLink: string;
  description: string;
  route?: string;
  isExternalApp?: boolean;
};

export default function ProductCard({ 
  id, 
  name, 
  imageUrl, 
  playstoreLink, 
  description,
  route,
  isExternalApp 
}: ProductCardProps) {
  const router = useRouter();

  const handlePlayStorePress = async () => {
    try {
      await Linking.openURL(playstoreLink);
    } catch (error) {
      console.error('Error opening Play Store link:', error);
    }
  };

  const handlePress = () => {
    if (isExternalApp && route) {
      // Navigate to the external app
      router.push({
        pathname: '/(external)/[app]',
        params: { app: route }
      });
    } else if (route) {
      // Navigate within the current app
      router.push({
        pathname: route as any
      });
    } else {
      router.push({
        pathname: "/products/[id]",
        params: { id }
      });
    }
  };

  return (
    <Pressable 
      style={styles.card}
      onPress={handlePress}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <Pressable 
          style={styles.playstoreButton}
          onPress={handlePlayStorePress}
        >
          <Ionicons name="logo-google-playstore" size={24} color="#fff" />
          <Text style={styles.buttonText}>Get it on Play Store</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    height: 50,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    flex: 1,
  },
  playstoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 