import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { theme } from '@/constants/theme';

interface CalendarDayProps {
  day: number;
  dateString: string;
  isToday: boolean;
  isPredictedPeriod: boolean;
  isFertile: boolean;
  isLoggedPeriod: boolean;
  onPress: (date: string) => void;
}

function CalendarDay({
  day,
  dateString,
  isToday,
  isPredictedPeriod,
  isFertile,
  isLoggedPeriod,
  onPress,
}: CalendarDayProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress(dateString);
  };

  return (
    <Animated.View
      style={[
        styles.dayContainer,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.day,
          isFertile && styles.fertileDay,
          isPredictedPeriod && styles.predictedPeriodDay,
          isLoggedPeriod && styles.loggedPeriodDay,
          isToday && styles.today,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.dayText,
            (isLoggedPeriod || isToday) && styles.dayTextWhite,
          ]}
        >
          {day}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface CalendarProps {
  year: number;
  month: number;
  periodDates: string[];
  fertileDates: string[];
  loggedPeriodDates: string[];
  currentDate: string;
  onDatePress: (date: string) => void;
}

export function Calendar({
  year,
  month,
  periodDates,
  fertileDates,
  loggedPeriodDates,
  currentDate,
  onDatePress,
}: CalendarProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const formatDateString = (day: number) => {
    const d = new Date(year, month, day);
    return d.toISOString().split('T')[0];
  };

  const renderDay = (day: number) => {
    const dateString = formatDateString(day);
    const isToday = dateString === currentDate;
    const isPredictedPeriod = periodDates.includes(dateString);
    const isFertile = fertileDates.includes(dateString);
    const isLoggedPeriod = loggedPeriodDates.includes(dateString);

    return (
      <CalendarDay
        key={day}
        day={day}
        dateString={dateString}
        isToday={isToday}
        isPredictedPeriod={isPredictedPeriod}
        isFertile={isFertile}
        isLoggedPeriod={isLoggedPeriod}
        onPress={onDatePress}
      />
    );
  };

  // Create empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <View key={`empty-${i}`} style={styles.dayContainer} />
  ));

  return (
    <View style={styles.container}>
      {/* Day labels */}
      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <View key={i} style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {emptyCells}
        {days.map(renderDay)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  weekDayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.light,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    padding: 2,
  },
  day: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.round,
  },
  dayText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  dayTextWhite: {
    color: theme.colors.white,
  },
  today: {
    borderWidth: 2,
    borderColor: theme.colors.deepPlum,
    backgroundColor: theme.colors.deepPlum,
  },
  predictedPeriodDay: {
    borderWidth: 2,
    borderColor: theme.colors.periodPink,
  },
  fertileDay: {
    backgroundColor: theme.colors.fertileGlow,
  },
  loggedPeriodDay: {
    backgroundColor: theme.colors.dustyRose,
  },
});
