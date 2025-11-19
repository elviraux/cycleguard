import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { theme } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export function LiquidBackground() {
  const blob1X = useRef(new Animated.Value(0)).current;
  const blob1Y = useRef(new Animated.Value(0)).current;
  const blob1Scale = useRef(new Animated.Value(1)).current;

  const blob2X = useRef(new Animated.Value(width * 0.7)).current;
  const blob2Y = useRef(new Animated.Value(height * 0.3)).current;
  const blob2Scale = useRef(new Animated.Value(1)).current;

  const blob3X = useRef(new Animated.Value(width * 0.2)).current;
  const blob3Y = useRef(new Animated.Value(height * 0.7)).current;
  const blob3Scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateBlob = (
      xValue: Animated.Value,
      yValue: Animated.Value,
      scaleValue: Animated.Value,
      delay: number
    ) => {
      const animate = () => {
        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(xValue, {
                toValue: Math.random() * width,
                duration: 15000 + Math.random() * 10000,
                useNativeDriver: true,
              }),
              Animated.timing(yValue, {
                toValue: Math.random() * height,
                duration: 15000 + Math.random() * 10000,
                useNativeDriver: true,
              }),
              Animated.timing(scaleValue, {
                toValue: 0.8 + Math.random() * 0.4,
                duration: 10000,
                useNativeDriver: true,
              }),
            ]),
            Animated.parallel([
              Animated.timing(xValue, {
                toValue: Math.random() * width,
                duration: 15000 + Math.random() * 10000,
                useNativeDriver: true,
              }),
              Animated.timing(yValue, {
                toValue: Math.random() * height,
                duration: 15000 + Math.random() * 10000,
                useNativeDriver: true,
              }),
              Animated.timing(scaleValue, {
                toValue: 0.8 + Math.random() * 0.4,
                duration: 10000,
                useNativeDriver: true,
              }),
            ]),
          ])
        ).start();
      };

      setTimeout(animate, delay);
    };

    animateBlob(blob1X, blob1Y, blob1Scale, 0);
    animateBlob(blob2X, blob2Y, blob2Scale, 3000);
    animateBlob(blob3X, blob3Y, blob3Scale, 6000);
  }, [blob1X, blob1Y, blob1Scale, blob2X, blob2Y, blob2Scale, blob3X, blob3Y, blob3Scale]);

  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <View style={styles.baseGradient} />

      {/* Animated blobs */}
      <Animated.View
        style={[
          styles.blob,
          {
            backgroundColor: theme.colors.dustyRose,
            width: 350,
            height: 350,
            transform: [
              { translateX: blob1X },
              { translateY: blob1Y },
              { scale: blob1Scale },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.blob,
          {
            backgroundColor: theme.colors.softMauve,
            width: 400,
            height: 400,
            transform: [
              { translateX: blob2X },
              { translateY: blob2Y },
              { scale: blob2Scale },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.blob,
          {
            backgroundColor: '#E8B4D5',
            width: 320,
            height: 320,
            transform: [
              { translateX: blob3X },
              { translateY: blob3Y },
              { scale: blob3Scale },
            ],
          },
        ]}
      />

      {/* Overlay for additional blur effect */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  baseGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.cream,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.4,
    // Note: In a real app, you'd use a blur library or native module
    // For now, we simulate blur with opacity and overlapping
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(245, 230, 232, 0.3)',
  },
});
