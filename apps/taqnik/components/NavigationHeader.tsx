import { StyleSheet, View, Pressable, Text, useWindowDimensions, Animated } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import TaqnikLogo from './TaqnikLogo';

export default function NavigationHeader() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const NavigationLinks = () => (
    <>
      <Pressable style={styles.navItem} onPress={() => {
        router.push('/');
        if (!isDesktop) toggleMenu();
      }}>
        <Text style={styles.navText}>Home</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => {
        router.push('/products');
        if (!isDesktop) toggleMenu();
      }}>
        <Text style={styles.navText}>Products</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => {
        router.push('/blog');
        if (!isDesktop) toggleMenu();
      }}>
        <Text style={styles.navText}>Blog</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => {
        router.push('/ai-tools');
        if (!isDesktop) toggleMenu();
      }}>
        <Text style={styles.navText}>AI Tools</Text>
      </Pressable>
    </>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Pressable onPress={() => router.push('/')}>
            <TaqnikLogo />
          </Pressable>
        </View>
        
        {isDesktop ? (
          <View style={styles.rightSection}>
            <NavigationLinks />
          </View>
        ) : (
          <View style={styles.mobileNav}>
            <Pressable onPress={toggleMenu} style={styles.menuButton}>
              <Ionicons 
                name={isMenuOpen ? "close" : "menu"} 
                size={28} 
                color="#333" 
              />
            </Pressable>
          </View>
        )}
      </View>

      {!isDesktop && (
        <Animated.View 
          style={[
            styles.mobileMenu,
            {
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                })
              }],
              opacity: slideAnim,
            },
            isMenuOpen ? styles.menuOpen : styles.menuClosed,
          ]}
        >
          <NavigationLinks />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    zIndex: 100,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    gap: 24,
  },
  mobileNav: {
    padding: 8,
  },
  menuButton: {
    padding: 4,
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#ffffff',
    padding: 16,
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 12,
    zIndex: 100,
  },
  menuOpen: {
    display: 'flex',
  },
  menuClosed: {
    display: 'none',
  },
  navItem: {
    padding: 12,
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
}); 