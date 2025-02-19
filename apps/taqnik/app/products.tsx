import { StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import ProductCard from '../components/ProductCard';

// This would typically come from an API or database
const PRODUCTS = [
  {
    id: 'build-it',
    name: 'Let AI Build It',
    imageUrl: 'https://example.com/Build-It.jpg', // Replace with actual image
    playstoreLink: 'https://play.google.com/store/apps/details?id=com.xdev200200.letaibuildit&hl=en',
    description: 'AI-powered app that helps you build and generate code for your next project.',
    route: 'build-it',
    isExternalApp: true
  },
  // Add more products as needed
];

export default function Products() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768; // Breakpoint for desktop devices
  const numColumns = isDesktop ? 3 : 1;

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => (
          <View style={[styles.cardWrapper, { width: isDesktop ? '33.33%' : '100%' }]}>
            <ProductCard {...item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // Force re-render when numColumns changes
        contentContainerStyle={styles.content}
        columnWrapperStyle={isDesktop ? styles.row : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  cardWrapper: {
    padding: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
  },
}); 