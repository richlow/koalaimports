export interface FeatureFlags {
  jobTrackingCRM: boolean;
  // Add more feature flags here as needed
}

const DEV_MODE = import.meta.env.DEV;

// Default feature states
const defaultFeatures: FeatureFlags = {
  jobTrackingCRM: DEV_MODE, // Always enabled in development
};

// Get the current state of all features
export const getFeatures = (): FeatureFlags => {
  if (DEV_MODE) {
    return {
      ...defaultFeatures,
      jobTrackingCRM: true
    };
  }

  try {
    const stored = localStorage.getItem('resume_koala_features');
    const overrides = stored ? JSON.parse(stored) : {};
    return {
      ...defaultFeatures,
      ...overrides,
    };
  } catch {
    return defaultFeatures;
  }
};

// Set feature override in localStorage
export const setFeatureOverride = (feature: keyof FeatureFlags, enabled: boolean): void => {
  try {
    const features = getFeatures();
    features[feature] = enabled;
    localStorage.setItem('resume_koala_features', JSON.stringify(features));
  } catch (error) {
    console.error('Error setting feature override:', error);
  }
};

// Clear all feature overrides
export const clearFeatureOverrides = (): void => {
  localStorage.removeItem('resume_koala_features');
};