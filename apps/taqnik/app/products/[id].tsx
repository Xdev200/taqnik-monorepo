import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// This would typically come from an API or database
const PRODUCTS = {
  product1: {
    id: 'product1',
    name: 'AI Chat Assistant',
    imageUrl: 'https://example.com/ai-chat.jpg',
    playstoreLink: 'https://play.google.com/store/apps/details?id=com.taqnik.aichat',
    description: 'An intelligent chat assistant powered by advanced AI to help with your daily tasks.',
    longDescription: `
      Our AI Chat Assistant is designed to make your life easier. With advanced natural language processing capabilities,
      it can help you with:
      • Writing and editing
      • Answering questions
      • Task management
      • And much more!
    `,
    features: [
      'Natural language processing',
      '24/7 availability',
      'Multi-language support',
      'Personalized responses',
    ],
  },
  // Add more products as needed
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS[id as keyof typeof PRODUCTS];

  const handlePlayStorePress = async () => {
    try {
      await Linking.openURL(product.playstoreLink);
    } catch (error) {
      console.error('Error opening Play Store link:', error);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.longDescription}</Text>
        
        <Text style={styles.featuresTitle}>Key Features</Text>
        {product.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}

        <Pressable 
          style={styles.playstoreButton}
          onPress={handlePlayStorePress}
        >
          <Ionicons name="logo-google-playstore" size={24} color="#fff" />
          <Text style={styles.buttonText}>Get it on Play Store</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
  },
  playstoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 