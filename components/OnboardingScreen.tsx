import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { theme } from '@/constants/theme';
import { PrimaryButton } from './PrimaryButton';
import { LiquidBackground } from './LiquidBackground';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  title: string;
  body: string;
  icon: React.ReactNode;
  primaryButton: {
    title: string;
    onPress: () => void;
  };
  secondaryButton?: {
    title: string;
    onPress: () => void;
  };
}

export function OnboardingScreen({
  title,
  body,
  icon,
  primaryButton,
  secondaryButton,
}: OnboardingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      {/* Animated liquid background */}
      <LiquidBackground />

      {/* Content with fluid animations */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          {icon}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={primaryButton.title}
            onPress={primaryButton.onPress}
            variant="primary"
            style={styles.primaryButton}
          />

          {secondaryButton && (
            <PrimaryButton
              title={secondaryButton.title}
              onPress={secondaryButton.onPress}
              variant="ghost"
              style={styles.secondaryButton}
            />
          )}
        </View>

        <View style={styles.indicator}>
          <View style={styles.indicatorDot} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  body: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.text.light,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  indicator: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  indicatorDot: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.deepPlum,
    borderRadius: 2,
  },
});
