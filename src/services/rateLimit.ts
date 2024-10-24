import { addDays, isSameDay } from './dateUtils';

interface UsageRecord {
  date: string;
  count: number;
  lastUsed: string;
}

const FREE_DAILY_LIMIT = 3;

export class RateLimitService {
  private static STORAGE_KEY = 'resume_koala_usage';

  static getCurrentUsage(): UsageRecord {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return this.createNewUsageRecord();
    }

    const usage: UsageRecord = JSON.parse(stored);
    const today = new Date().toISOString().split('T')[0];

    // Reset if it's a new day
    if (usage.date !== today) {
      return this.createNewUsageRecord();
    }

    return usage;
  }

  static incrementUsage(): void {
    const usage = this.getCurrentUsage();
    usage.count += 1;
    usage.lastUsed = new Date().toISOString();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usage));
  }

  static canUseService(): boolean {
    const usage = this.getCurrentUsage();
    return usage.count < FREE_DAILY_LIMIT;
  }

  static getRemainingChecks(): number {
    const usage = this.getCurrentUsage();
    return Math.max(0, FREE_DAILY_LIMIT - usage.count);
  }

  private static createNewUsageRecord(): UsageRecord {
    return {
      date: new Date().toISOString().split('T')[0],
      count: 0,
      lastUsed: new Date().toISOString()
    };
  }
}