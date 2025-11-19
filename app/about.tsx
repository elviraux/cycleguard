import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '@/constants/theme';
import { LiquidBackground } from '@/components/LiquidBackground';
import { GlassCard } from '@/components/GlassCard';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LiquidBackground />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 18L9 12L15 6"
              stroke={theme.colors.deepPlum}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Svg width={80} height={80} viewBox="0 0 100 100" fill="none">
              {/* Shield outline */}
              <Path
                d="M50 10 L20 25 L20 50 C20 70 35 85 50 90 C65 85 80 70 80 50 L80 25 Z"
                fill={theme.colors.dustyRose}
                fillOpacity={0.3}
                stroke={theme.colors.deepPlum}
                strokeWidth={2}
              />
              {/* Uterus symbol */}
              <Path
                d="M50 35 C42 35 35 42 35 50 C35 54 37 57 40 59 L40 70 M50 35 C58 35 65 42 65 50 C65 54 63 57 60 59 L60 70"
                stroke={theme.colors.deepPlum}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Circle
                cx={35}
                cy={45}
                r={5}
                fill={theme.colors.deepPlum}
              />
              <Circle
                cx={65}
                cy={45}
                r={5}
                fill={theme.colors.deepPlum}
              />
            </Svg>
          </View>
        </View>

        <Text style={styles.appName}>Cycleguard</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>

        <GlassCard style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Your Cycle, Your Space</Text>
          <Text style={styles.paragraph}>
            Cycleguard is a privacy-first period tracker designed for people who value their
            data autonomy. No accounts, no cloud sync, no tracking—just a simple, beautiful
            tool that respects your boundaries.
          </Text>

          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Track your cycle with easy date logging</Text>
            <Text style={styles.featureItem}>• Record symptoms and personal notes</Text>
            <Text style={styles.featureItem}>• View predictions for upcoming cycles</Text>
            <Text style={styles.featureItem}>• Export your data anytime</Text>
            <Text style={styles.featureItem}>• 100% local data storage</Text>
            <Text style={styles.featureItem}>• No account or internet required</Text>
          </View>

          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            In an age where intimate health data is often exploited, Cycleguard stands as a
            sanctuary. We believe period tracking should be a personal practice, not a data
            harvest. Your body, your data, your choice.
          </Text>

          <Text style={styles.sectionTitle}>Privacy Commitment</Text>
          <Text style={styles.paragraph}>
            We will never sell, share, or access your personal health information. Everything
            stays on your device, encrypted by your device&apos;s security measures.
          </Text>

          <Text style={styles.footer}>
            Made with care for your privacy • © 2025 Cycleguard
          </Text>
          <Text style={styles.footer}>
            The mobile app was built with Fastshot.
            Fastshot - No code, mobile app builder. Anyone with an idea can create a mobile app, just by chatting with AI. Try building your app at https://fastshot.ai
          </Text>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.deepPlum,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  appVersion: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.light,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  contentCard: {
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  paragraph: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  featureList: {
    marginBottom: theme.spacing.md,
  },
  featureItem: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.text.secondary,
    lineHeight: 28,
    marginBottom: theme.spacing.xs,
  },
  footer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    marginTop: theme.spacing.xl,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
