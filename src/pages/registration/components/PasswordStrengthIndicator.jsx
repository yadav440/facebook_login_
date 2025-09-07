import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      numbers: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };

    score = Object.values(checks)?.filter(Boolean)?.length;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-warning' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-secondary' };
    return { score, label: 'Strong', color: 'bg-success' };
  };

  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${strength?.color}`}
            style={{ width: `${(strength?.score / 5) * 100}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${
          strength?.score <= 2 ? 'text-destructive' :
          strength?.score <= 3 ? 'text-warning' :
          strength?.score <= 4 ? 'text-secondary' : 'text-success'
        }`}>
          {strength?.label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon 
            name={password?.length >= 8 ? "Check" : "X"} 
            size={12} 
            color={password?.length >= 8 ? "var(--color-success)" : "var(--color-text-secondary)"} 
          />
          <span>8+ characters</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={/[A-Z]/?.test(password) ? "Check" : "X"} 
            size={12} 
            color={/[A-Z]/?.test(password) ? "var(--color-success)" : "var(--color-text-secondary)"} 
          />
          <span>Uppercase letter</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={/[a-z]/?.test(password) ? "Check" : "X"} 
            size={12} 
            color={/[a-z]/?.test(password) ? "var(--color-success)" : "var(--color-text-secondary)"} 
          />
          <span>Lowercase letter</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={/\d/?.test(password) ? "Check" : "X"} 
            size={12} 
            color={/\d/?.test(password) ? "var(--color-success)" : "var(--color-text-secondary)"} 
          />
          <span>Number</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;