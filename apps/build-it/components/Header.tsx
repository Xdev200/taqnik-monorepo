import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';

function AIRobotIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#0EA5E9" />
          <Stop offset="100%" stopColor="#0284C7" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2a2 2 0 0 1 2 2v2h3a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3V4a2 2 0 0 1 2-2z"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
      />
      <Circle cx="9" cy="12" r="1.5" fill="#0EA5E9"/>
      <Circle cx="15" cy="12" r="1.5" fill="#0EA5E9"/>
    </Svg>
  );
}

export function Header() {
  return (
    <BlurView intensity={80} style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>
          Let AI Build It
        </ThemedText>
        <AIRobotIcon />
      </View>
      <ThemedText style={styles.subtitle}>
        Tell us what tech you need. We'll tell you how you can build it with AI
      </ThemedText>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 229, 229, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0EA5E9',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
}); 