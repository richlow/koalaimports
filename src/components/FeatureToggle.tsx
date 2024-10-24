import React from 'react';
import { FeatureFlags, setFeatureOverride, getFeatures } from '../config/features';

interface FeatureToggleProps {
  feature: keyof FeatureFlags;
  label: string;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ feature, label }) => {
  const features = getFeatures();
  const isEnabled = features[feature];

  const handleToggle = () => {
    setFeatureOverride(feature, !isEnabled);
    // Force a page reload to ensure all components update
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <button
        type="button"
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
          ${isEnabled ? 'bg-indigo-600' : 'bg-gray-200'}
        `}
        role="switch"
        aria-checked={isEnabled}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${isEnabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};

export default FeatureToggle;