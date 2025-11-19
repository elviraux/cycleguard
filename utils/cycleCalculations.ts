import { CycleData } from '@/types/cycle';

export const cycleCalculations = {
  /**
   * Calculate the predicted next period start date
   */
  calculateNextPeriod(cycleData: CycleData): Date {
    const lastStart = new Date(cycleData.lastPeriodStart);
    const nextStart = new Date(lastStart);
    nextStart.setDate(lastStart.getDate() + cycleData.cycleLength);
    return nextStart;
  },

  /**
   * Calculate predicted period dates for a given cycle
   */
  getPredictedPeriodDates(cycleData: CycleData, startDate: Date): string[] {
    const dates: string[] = [];
    for (let i = 0; i < cycleData.periodLength; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  },

  /**
   * Calculate fertile window (typically 5-6 days before ovulation)
   * Ovulation is typically 14 days before next period
   */
  getFertileWindowDates(cycleData: CycleData, periodStartDate: Date): string[] {
    const dates: string[] = [];
    const ovulationDay = cycleData.cycleLength - 14;
    const fertileStart = ovulationDay - 5;

    for (let i = fertileStart; i <= ovulationDay; i++) {
      const date = new Date(periodStartDate);
      date.setDate(periodStartDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  },

  /**
   * Get all predicted dates for the visible month
   */
  getPredictedDatesForMonth(cycleData: CycleData, year: number, month: number): {
    periodDates: string[];
    fertileDates: string[];
  } {
    const periodDates: string[] = [];
    const fertileDates: string[] = [];

    // Check current cycle
    const lastPeriodStart = new Date(cycleData.lastPeriodStart);
    const nextPeriodStart = this.calculateNextPeriod(cycleData);

    // Add dates from last period if they fall in this month
    const lastPeriodDates = this.getPredictedPeriodDates(cycleData, lastPeriodStart);
    periodDates.push(...lastPeriodDates.filter(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() === month;
    }));

    // Add dates from next period if they fall in this month
    const nextPeriodDates = this.getPredictedPeriodDates(cycleData, nextPeriodStart);
    periodDates.push(...nextPeriodDates.filter(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() === month;
    }));

    // Add fertile window dates
    const lastFertileDates = this.getFertileWindowDates(cycleData, lastPeriodStart);
    fertileDates.push(...lastFertileDates.filter(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() === month;
    }));

    const nextFertileDates = this.getFertileWindowDates(cycleData, nextPeriodStart);
    fertileDates.push(...nextFertileDates.filter(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() === month;
    }));

    return { periodDates, fertileDates };
  },

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  },

  /**
   * Format month and year for display
   */
  formatMonthYear(year: number, month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[month]} ${year}`;
  },
};
