import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { LiquidBackground } from '@/components/LiquidBackground';
import { storage } from '@/utils/storage';
import { exportToCSV } from '@/utils/csvExport';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import Svg, { Path } from 'react-native-svg';

export default function SettingsScreen() {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(600)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide up animation
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim]);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Get user data
      const userData = await storage.getUserData();

      // Check if there's any data to export
      if (userData.periodDays.length === 0 && userData.symptomLogs.length === 0) {
        Alert.alert(
          'No Data to Export',
          'You don\'t have any cycle data to export yet. Start tracking to build your history!',
          [{ text: 'OK' }]
        );
        setIsExporting(false);
        return;
      }

      // Export to CSV
      await exportToCSV(userData);

      // Success feedback
      Alert.alert(
        'Export Successful',
        'Your cycle data has been exported. Choose where to save or share it.',
        [{ text: 'Done' }]
      );
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert(
        'Export Failed',
        'There was an error exporting your data. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleResetConfirm = async () => {
    try {
      await storage.resetAllData();
      setShowResetModal(false);

      // Navigate to onboarding after reset
      router.replace('/onboarding');
    } catch (error) {
      console.error('Reset error:', error);
      Alert.alert(
        'Reset Failed',
        'There was an error resetting your data. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleClose = () => {
    // Slide down animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
    });
  };

  return (
    <View style={styles.container}>
      <LiquidBackground />

      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Settings Panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <Path
                d="M18 6L6 18M6 6L18 18"
                stroke={theme.colors.deepPlum}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Settings</Text>

            {/* Data Management Section */}
            <Text style={styles.sectionTitle}>Data Management</Text>
            <GlassCard style={styles.groupCard}>
              {/* Export to CSV */}
              <TouchableOpacity
                style={styles.settingsRow}
                onPress={handleExport}
                disabled={isExporting}
                activeOpacity={0.7}
              >
                <Text style={styles.settingsRowText}>
                  {isExporting ? 'Exporting...' : 'Export to CSV'}
                </Text>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 18L15 12L9 6"
                    stroke={theme.colors.deepPlum}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Reset Application */}
              <TouchableOpacity
                style={styles.settingsRow}
                onPress={() => setShowResetModal(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.settingsRowText, styles.destructiveText]}>
                  Reset Application
                </Text>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 18L15 12L9 6"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </GlassCard>

            {/* Information Section */}
            <Text style={styles.sectionTitle}>Information</Text>
            <GlassCard style={styles.groupCard}>
              {/* Privacy Policy */}
              <TouchableOpacity
                style={styles.settingsRow}
                onPress={() => router.push('/privacy-policy')}
                activeOpacity={0.7}
              >
                <Text style={styles.settingsRowText}>Privacy Policy</Text>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 18L15 12L9 6"
                    stroke={theme.colors.deepPlum}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider} />

              {/* About Cycleguard */}
              <TouchableOpacity
                style={styles.settingsRow}
                onPress={() => router.push('/about')}
                activeOpacity={0.7}
              >
                <Text style={styles.settingsRowText}>About Cycleguard</Text>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 18L15 12L9 6"
                    stroke={theme.colors.deepPlum}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </GlassCard>

            <Text style={styles.footerText}>
              Your data is private and stored only on your device.
            </Text>
          </View>
        </ScrollView>
      </Animated.View>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        visible={showResetModal}
        title="Are you sure?"
        message="This will permanently delete all your cycle data and settings. This action cannot be undone."
        confirmText="Reset"
        cancelText="Cancel"
        onConfirm={handleResetConfirm}
        onCancel={() => setShowResetModal(false)}
        destructive
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(107, 76, 107, 0.6)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: theme.colors.deepPlum,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 20,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.softMauve,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.lg,
    padding: theme.spacing.sm,
    zIndex: 10,
  },
  content: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  groupCard: {
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 56,
  },
  settingsRowText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.primary,
    flex: 1,
  },
  destructiveText: {
    color: '#DC2626',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(107, 76, 107, 0.1)',
    marginHorizontal: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: theme.spacing.xl,
  },
});
