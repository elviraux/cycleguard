import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { theme } from '@/constants/theme';
import { GlassCard } from '@/components/GlassCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { LiquidBackground } from '@/components/LiquidBackground';
import { Calendar } from '@/components/Calendar';
import { GearIcon } from '@/components/icons/GearIcon';
import { storage } from '@/utils/storage';
import { cycleCalculations } from '@/utils/cycleCalculations';
import { UserData } from '@/types/cycle';

export default function HomeScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [symptomNotes, setSymptomNotes] = useState('');

  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserData = async () => {
    const data = await storage.getUserData();
    setUserData(data);

    if (!data.hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  };

  const handleDatePress = async (date: string) => {
    const isLogged = userData?.periodDays.some(pd => pd.date === date);

    if (isLogged) {
      await storage.removePeriodDay(date);
    } else {
      await storage.addPeriodDay(date);
    }

    loadUserData();
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleLogSymptoms = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setShowSymptomModal(true);
  };

  const handleSaveSymptoms = async () => {
    if (selectedDate) {
      await storage.saveSymptomLog({
        date: selectedDate,
        symptoms: [],
        notes: symptomNotes,
      });
      setShowSymptomModal(false);
      setSymptomNotes('');
      loadUserData();
    }
  };

  if (!userData || !userData.cycleData) {
    return null;
  }

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const nextPeriod = cycleCalculations.calculateNextPeriod(userData.cycleData);

  const { periodDates, fertileDates } = cycleCalculations.getPredictedDatesForMonth(
    userData.cycleData,
    currentYear,
    currentMonth
  );

  const loggedPeriodDates = userData.periodDays.map(pd => pd.date);

  return (
    <View style={styles.container}>
      <LiquidBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cycle Overview</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
            activeOpacity={0.7}
          >
            <GearIcon size={28} color={theme.colors.deepPlum} />
          </TouchableOpacity>
        </View>

        {/* Month navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={handlePreviousMonth} style={styles.navButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path d="M15 18L9 12L15 6" stroke={theme.colors.deepPlum} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {cycleCalculations.formatMonthYear(currentYear, currentMonth)}
          </Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path d="M9 18L15 12L9 6" stroke={theme.colors.deepPlum} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <GlassCard style={styles.calendarCard}>
          <Calendar
            year={currentYear}
            month={currentMonth}
            periodDates={periodDates}
            fertileDates={fertileDates}
            loggedPeriodDates={loggedPeriodDates}
            currentDate={todayString}
            onDatePress={handleDatePress}
          />
        </GlassCard>

        {/* Info cards */}
        <View style={styles.infoCards}>
          <GlassCard style={styles.infoCard}>
            <Text style={styles.infoCardText}>
              Today is {cycleCalculations.formatDate(today)}
            </Text>
          </GlassCard>

          <PrimaryButton
            title="Log Symptoms"
            onPress={handleLogSymptoms}
            style={styles.logButton}
          />

          <GlassCard style={styles.infoCard}>
            <Text style={styles.infoCardText}>
              Next Period Due: {cycleCalculations.formatDate(nextPeriod)}
            </Text>
          </GlassCard>
        </View>
      </ScrollView>

      {/* Symptom Modal */}
      <Modal
        visible={showSymptomModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSymptomModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Symptoms</Text>
            <Text style={styles.modalDate}>{selectedDate}</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Add notes about symptoms, mood, etc."
              placeholderTextColor={theme.colors.text.light}
              value={symptomNotes}
              onChangeText={setSymptomNotes}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <PrimaryButton
                title="Save"
                onPress={handleSaveSymptoms}
                style={styles.modalButton}
              />
              <PrimaryButton
                title="Cancel"
                onPress={() => setShowSymptomModal(false)}
                variant="ghost"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    padding: theme.spacing.sm,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  navButton: {
    padding: theme.spacing.sm,
  },
  monthText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  calendarCard: {
    marginBottom: theme.spacing.lg,
  },
  infoCards: {
    gap: theme.spacing.md,
  },
  infoCard: {
    padding: theme.spacing.lg,
  },
  infoCardText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  logButton: {
    marginVertical: theme.spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(107, 76, 107, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    width: '85%',
    maxWidth: 400,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: theme.colors.deepPlum,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
  },
  modalTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  modalDate: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  modalButtons: {
    gap: theme.spacing.md,
  },
  modalButton: {
    width: '100%',
  },
});
