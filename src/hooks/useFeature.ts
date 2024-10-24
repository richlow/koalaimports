import { useState, useEffect } from 'react';

const DEV_MODE = import.meta.env.DEV;

export function useFeature(featureName: string): boolean {
  // In development mode, always return true
  if (DEV_MODE) {
    return true;
  }

  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const features = JSON.parse(localStorage.getItem('resume_koala_features') || '{}');
      return features[featureName] || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const features = JSON.parse(localStorage.getItem('resume_koala_features') || '{}');
        setIsEnabled(features[featureName] || false);
      } catch {
        setIsEnabled(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [featureName]);

  return isEnabled;
}

export function setFeature(featureName: string, enabled: boolean): void {
  try {
    const features = JSON.parse(localStorage.getItem('resume_koala_features') || '{}');
    features[featureName] = enabled;
    localStorage.setItem('resume_koala_features', JSON.stringify(features));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error setting feature flag:', error);
  }
}