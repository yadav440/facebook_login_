import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const TermsAndPrivacy = ({ agreed, onAgreementChange, error }) => {
  return (
    <div className="space-y-4">
      <Checkbox
        label={
          <span className="text-sm text-text-secondary">
            I agree to Facebook's{' '}
            <a 
              href="#" 
              className="text-primary hover:underline font-medium"
              onClick={(e) => e?.preventDefault()}
            >
              Terms of Service
            </a>
            {' '}and{' '}
            <a 
              href="#" 
              className="text-primary hover:underline font-medium"
              onClick={(e) => e?.preventDefault()}
            >
              Privacy Policy
            </a>
          </span>
        }
        checked={agreed?.terms}
        onChange={(e) => onAgreementChange('terms', e?.target?.checked)}
        error={error?.terms}
        required
      />
      <Checkbox
        label="I would like to receive marketing emails and updates about new features"
        checked={agreed?.marketing}
        onChange={(e) => onAgreementChange('marketing', e?.target?.checked)}
      />
      <div className="text-xs text-text-secondary bg-muted p-3 rounded-md">
        <p className="mb-2">
          <strong>Data Protection Notice:</strong> Your personal information will be processed in accordance with our Privacy Policy.
        </p>
        <p>
          By creating an account, you acknowledge that you are at least 13 years old and agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;