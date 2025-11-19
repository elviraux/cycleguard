import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export function GlassCard({ children, style, intensity = 80 }: GlassCardProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Outer glow/border effect */}
      <View style={styles.borderGlow} />

      {/* Inner border gradient for light-catching effect */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.innerBorder}
      />

      <BlurView intensity={intensity} style={styles.blur} tint="light">
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    // Enhanced shadow for depth
    shadowColor: theme.colors.deepPlum,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  borderGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  innerBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  blur: {
    flex: 1,
    borderRadius: theme.borderRadius.xl,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: theme.borderRadius.xl,
  },
});
