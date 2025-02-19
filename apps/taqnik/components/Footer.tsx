import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput, useWindowDimensions, Platform, Linking, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const translateY = new Animated.Value(0);

  useEffect(() => {
    let lastOffset = 0;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = (event: any) => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      const currentOffset = window.scrollY;
      const diff = currentOffset - lastOffset;
      lastOffset = currentOffset;

      // Show footer when near bottom
      const isNearBottom = 
        window.innerHeight + currentOffset >= 
        document.documentElement.scrollHeight - 100;

      if (isNearBottom) {
        setIsVisible(true);
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      } else if (diff > 0 && isVisible) { // Scrolling down
        setIsVisible(false);
        Animated.spring(translateY, {
          toValue: 200,
          useNativeDriver: true,
        }).start();
      } else if (diff < 0 && !isVisible) { // Scrolling up
        setIsVisible(true);
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isVisible]);

  const handleSubscribe = () => {
    // Implement newsletter subscription logic
    console.log('Subscribe:', email);
    setEmail('');
  };

  const SocialButton = ({ icon, url }: { icon: keyof typeof Ionicons.glyphMap; url: string }) => (
    <Pressable 
      style={[styles.socialButton, { backgroundColor: colors.surface }]}
      onPress={() => Linking.openURL(url)}
    >
      <Ionicons name={icon} size={20} color={colors.primary} />
    </Pressable>
  );

  return (
    <Animated.View style={[
      styles.animatedContainer,
      {
        transform: [{ translateY }]
      }
    ]}>
      <BlurView 
        intensity={colorScheme === 'dark' ? 40 : 80}
        tint={colorScheme}
        style={styles.container}
      >
        <View style={[styles.content, isDesktop && styles.desktopContent]}>
          {/* Company Section */}
          <View style={styles.section}>
            <ThemedText weight="semibold" size="md">About Taqnik</ThemedText>
            <ThemedText 
              variant="secondary"
              size="sm" 
              style={styles.description}
            >
              Empowering innovation through cutting-edge AI solutions and tools.
            </ThemedText>
            <View style={styles.socialLinks}>
              <SocialButton icon="logo-twitter" url="https://twitter.com/taqnik" />
              <SocialButton icon="logo-linkedin" url="https://linkedin.com/company/taqnik" />
              <SocialButton icon="logo-github" url="https://github.com/taqnik" />
            </View>
          </View>

          {/* Quick Links */}
          <View style={styles.section}>
            <ThemedText weight="semibold" size="md">Quick Links</ThemedText>
            <View style={styles.linkGroup}>
              {['About Us', 'Contact', 'Privacy Policy', 'Terms'].map((text) => (
                <Pressable key={text} style={styles.linkButton}>
                  <ThemedText variant="secondary" size="sm">{text}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Products */}
          <View style={styles.section}>
            <ThemedText weight="semibold" size="md">Products</ThemedText>
            <View style={styles.linkGroup}>
              {[
                `Let AI Build It!`,
              ].map((text) => (
                <Pressable key={text} style={styles.linkButton}>
                  <ThemedText variant="secondary" size="sm">{text}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Newsletter */}
          <View style={[styles.section, styles.newsletterSection]}>
            <ThemedText weight="semibold" size="md">Newsletter</ThemedText>
            <View style={styles.newsletterInput}>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.surface,
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder="Enter your email"
                placeholderTextColor={colors.secondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Pressable 
                style={[styles.subscribeButton, { backgroundColor: colors.primary }]}
                onPress={handleSubscribe}
              >
                <ThemedText weight="semibold" size="sm" style={styles.buttonText}>
                  Subscribe
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.copyright, { borderTopColor: colors.border }]}>
          <ThemedText variant="secondary" size="xs">
            © {new Date().getFullYear()} Taqnik. All rights reserved.
          </ThemedText>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 229, 229, 0.3)',
  },
  content: {
    padding: 12,
  },
  desktopContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    marginBottom: 24,
    minWidth: 200,
    flex: 1,
    marginHorizontal: 12,
  },
  newsletterSection: {
    flex: 1.2,
  },
  description: {
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 18,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  socialButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  linkGroup: {
    marginTop: 8,
    gap: 8,
  },
  linkButton: {
    paddingVertical: 2,
  },
  newsletterInput: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 1,
  },
  subscribeButton: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  copyright: {
    borderTopWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
}); 