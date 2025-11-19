import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { LiquidBackground } from '@/components/LiquidBackground';
import { storage } from '@/utils/storage';

export default function SetupScreen() {
  const router = useRouter();
  const [lastPeriodDate, setLastPeriodDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [periodLength, setPeriodLength] = useState('5');
  const [cycleLength, setCycleLength] = useState('28');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setLastPeriodDate(selectedDate);
    }
  };

  const handleSave = async () => {
    const cycleData = {
      lastPeriodStart: lastPeriodDate.toISOString(),
      periodLength: parseInt(periodLength) || 5,
      cycleLength: parseInt(cycleLength) || 28,
    };

    await storage.saveCycleData(cycleData);
    await storage.markOnboardingComplete();

    router.replace('/home');
  };

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <LiquidBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Let&apos;s Personalize Your Cycle</Text>

          <GlassCard style={styles.card}>
            <View style={styles.cardContent}>
              {/* First day of last period */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First day of your last period</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateText}>{formatDate(lastPeriodDate)}</Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={lastPeriodDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}

              {/* Period length */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Typical period length</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={periodLength}
                    onChangeText={setPeriodLength}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="5"
                    placeholderTextColor={theme.colors.text.light}
                  />
                  <Text style={styles.inputSuffix}>days</Text>
                </View>
              </View>

              {/* Cycle length */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Average cycle length</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={cycleLength}
                    onChangeText={setCycleLength}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="28"
                    placeholderTextColor={theme.colors.text.light}
                  />
                  <Text style={styles.inputSuffix}>days</Text>
                </View>
              </View>

              <Text style={styles.helperText}>You can change these anytime.</Text>
            </View>
          </GlassCard>

          <PrimaryButton
            title="Save →"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  card: {
    marginBottom: theme.spacing.xl,
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  dateText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    fontWeight: theme.fontWeight.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    paddingHorizontal: theme.spacing.md,
  },
  input: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    fontWeight: theme.fontWeight.medium,
    paddingVertical: theme.spacing.md,
  },
  inputSuffix: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.light,
    marginLeft: theme.spacing.sm,
  },
  helperText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  saveButton: {
    marginTop: theme.spacing.md,
  },
});
