import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData, CycleData, PeriodDay, SymptomLog } from '@/types/cycle';

const STORAGE_KEY = 'cycleguard_user_data';

const defaultUserData: UserData = {
  periodDays: [],
  symptomLogs: [],
  hasCompletedOnboarding: false,
};

export const storage = {
  async getUserData(): Promise<UserData> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultUserData;
    } catch (error) {
      console.error('Error reading user data:', error);
      return defaultUserData;
    }
  },

  async saveUserData(data: UserData): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  async saveCycleData(cycleData: CycleData): Promise<void> {
    const userData = await this.getUserData();
    userData.cycleData = cycleData;
    await this.saveUserData(userData);
  },

  async markOnboardingComplete(): Promise<void> {
    const userData = await this.getUserData();
    userData.hasCompletedOnboarding = true;
    await this.saveUserData(userData);
  },

  async addPeriodDay(date: string): Promise<void> {
    const userData = await this.getUserData();
    const exists = userData.periodDays.some(pd => pd.date === date);
    if (!exists) {
      userData.periodDays.push({ date });
      await this.saveUserData(userData);
    }
  },

  async removePeriodDay(date: string): Promise<void> {
    const userData = await this.getUserData();
    userData.periodDays = userData.periodDays.filter(pd => pd.date !== date);
    await this.saveUserData(userData);
  },

  async saveSymptomLog(log: SymptomLog): Promise<void> {
    const userData = await this.getUserData();
    const existingIndex = userData.symptomLogs.findIndex(sl => sl.date === log.date);

    if (existingIndex >= 0) {
      userData.symptomLogs[existingIndex] = log;
    } else {
      userData.symptomLogs.push(log);
    }

    await this.saveUserData(userData);
  },
};
