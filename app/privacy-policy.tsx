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
import Svg, { Path } from 'react-native-svg';
import { theme } from '@/constants/theme';
import { LiquidBackground } from '@/components/LiquidBackground';
import { GlassCard } from '@/components/GlassCard';

export default function PrivacyPolicyScreen() {
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
          <Text style={styles.paragraph}>
            Cycleguard is designed with your privacy as the top priority. We believe your
            personal health data should remain exactly that—personal.
          </Text>

          <Text style={styles.sectionTitle}>Data Storage</Text>
          <Text style={styles.paragraph}>
            All your cycle data, symptoms, and notes are stored locally on your device.
            Nothing is uploaded to the cloud or sent to any external servers.
          </Text>

          <Text style={styles.sectionTitle}>No Account Required</Text>
          <Text style={styles.paragraph}>
            Cycleguard doesn&apos;t require you to create an account, provide an email address,
            or share any identifying information. Your data stays on your device, always.
          </Text>

          <Text style={styles.sectionTitle}>No Third-Party Tracking</Text>
          <Text style={styles.paragraph}>
            We don&apos;t use any analytics services, advertising networks, or third-party
            tracking tools. Your usage patterns and personal information remain private.
          </Text>

          <Text style={styles.sectionTitle}>Data Export</Text>
          <Text style={styles.paragraph}>
            You can export your data at any time in CSV format. This exported file is
            created on your device and you have complete control over where you save it and
            who you share it with.
          </Text>

          <Text style={styles.sectionTitle}>Data Deletion</Text>
          <Text style={styles.paragraph}>
            You can permanently delete all your data at any time through the Reset
            Application option in Settings. This action is immediate and irreversible.
          </Text>

          <Text style={styles.sectionTitle}>Security</Text>
          <Text style={styles.paragraph}>
            Your data is protected by your device&apos;s security measures. We recommend using a
            passcode, fingerprint, or face ID to secure your device.
          </Text>

          <Text style={styles.footer}>
            Last updated: January 2025
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
  footer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    marginTop: theme.spacing.xl,
    fontStyle: 'italic',
  },
});
