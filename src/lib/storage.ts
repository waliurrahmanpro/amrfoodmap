import { UserProgress } from '@/types';
import { FOODS } from '@/data/foods';

const STORAGE_KEY = 'amar_food_map_progress_v1';
const CURRENT_VERSION = 1;

const VALID_FOOD_IDS = new Set(FOODS.map((f) => f.id));

export const DEFAULT_PROGRESS: UserProgress = {
  version: CURRENT_VERSION,
  triedFoodIds: [],
  lastUpdated: '2026-01-01T00:00:00.000Z'
};

/**
 * Validates and sanitizes stored data to prevent corruption or unexpected state.
 */
function sanitizeProgress(raw: unknown): UserProgress {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_PROGRESS;
  }

  const obj = raw as Record<string, unknown>;
  const tried = Array.isArray(obj.triedFoodIds)
    ? obj.triedFoodIds.filter((id): id is string => typeof id === 'string' && VALID_FOOD_IDS.has(id))
    : [];

  return {
    version: typeof obj.version === 'number' ? obj.version : CURRENT_VERSION,
    triedFoodIds: Array.from(new Set(tried)),
    lastUpdated: typeof obj.lastUpdated === 'string' ? obj.lastUpdated : new Date().toISOString()
  };
}

export const storageService = {
  getStoredProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return DEFAULT_PROGRESS;
    }

    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (!item) {
        return DEFAULT_PROGRESS;
      }
      const parsed = JSON.parse(item);
      return sanitizeProgress(parsed);
    } catch (err) {
      console.warn('[Amar Food Map] Failed to parse localStorage progress, using default:', err);
      return DEFAULT_PROGRESS;
    }
  },

  saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;

    try {
      const sanitized = sanitizeProgress(progress);
      sanitized.lastUpdated = new Date().toISOString();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      window.dispatchEvent(new CustomEvent('amar-food-map:progress-updated', { detail: sanitized }));
    } catch (err) {
      console.error('[Amar Food Map] Failed to save progress to localStorage:', err);
    }
  },

  toggleFood(foodId: string): UserProgress {
    const current = this.getStoredProgress();
    const isTried = current.triedFoodIds.includes(foodId);

    const newTried = isTried
      ? current.triedFoodIds.filter((id) => id !== foodId)
      : [...current.triedFoodIds, foodId];

    const updated: UserProgress = {
      ...current,
      triedFoodIds: newTried,
      lastUpdated: new Date().toISOString()
    };

    this.saveProgress(updated);
    return updated;
  },

  resetProgress(): UserProgress {
    const resetData: UserProgress = {
      version: CURRENT_VERSION,
      triedFoodIds: [],
      lastUpdated: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('amar-food-map:progress-updated', { detail: resetData }));
      } catch (err) {
        console.error('[Amar Food Map] Failed to reset localStorage:', err);
      }
    }

    return resetData;
  },

  exportBackup(): string {
    return JSON.stringify(this.getStoredProgress(), null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      const sanitized = sanitizeProgress(parsed);
      this.saveProgress(sanitized);
      return true;
    } catch {
      return false;
    }
  }
};
