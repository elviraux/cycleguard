import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';
import { PrimaryButton } from './PrimaryButton';

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
  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
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
      </View>
    </LinearGradient>
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
