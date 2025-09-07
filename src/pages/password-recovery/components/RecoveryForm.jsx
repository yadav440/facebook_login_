import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecoveryForm = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState('email');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else if (recoveryMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex?.test(formData?.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email address';
      }
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex?.test(formData?.emailOrPhone?.replace(/\s/g, ''))) {
        newErrors.emailOrPhone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-detect recovery method
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value?.includes('@') || emailRegex?.test(value)) {
      setRecoveryMethod('email');
    } else if (value?.match(/^\d/)) {
      setRecoveryMethod('phone');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - reject specific test cases
      if (formData?.emailOrPhone === 'notfound@example.com') {
        setErrors({ emailOrPhone: 'No account found with this email address' });
        return;
      }
      
      if (formData?.emailOrPhone === '+1234567890') {
        setErrors({ emailOrPhone: 'No account found with this phone number' });
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-soft-lg p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={32} color="var(--color-success)" />
        </div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Reset Link Sent
        </h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We've sent a password reset link to{' '}
          <span className="font-medium text-text-primary">
            {formData?.emailOrPhone}
          </span>
          {recoveryMethod === 'email' ?'. Please check your email and follow the instructions to reset your password.' :'. Please check your messages for the reset code.'
          }
        </p>
        <div className="bg-accent rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="mb-2">
                <strong>Didn't receive the {recoveryMethod === 'email' ? 'email' : 'message'}?</strong>
              </p>
              <ul className="space-y-1 text-xs">
                {recoveryMethod === 'email' && (
                  <li>• Check your spam or junk folder</li>
                )}
                <li>• Make sure you entered the correct {recoveryMethod === 'email' ? 'email address' : 'phone number'}</li>
                <li>• Wait a few minutes for delivery</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              setIsSuccess(false);
              setFormData({ emailOrPhone: '' });
              setErrors({});
            }}
          >
            Try Different {recoveryMethod === 'email' ? 'Email' : 'Phone'}
          </Button>
          
          <Link to="/login">
            <Button variant="ghost" fullWidth>
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-soft-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="KeyRound" size={32} color="var(--color-primary)" />
        </div>
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Reset Your Password
        </h1>
        <p className="text-text-secondary">
          Enter your email address or phone number and we'll send you a link to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-sm text-error">{errors?.general}</span>
            </div>
          </div>
        )}

        <div>
          <Input
            label={recoveryMethod === 'email' ? 'Email Address' : 'Phone Number'}
            type={recoveryMethod === 'email' ? 'email' : 'tel'}
            name="emailOrPhone"
            placeholder={recoveryMethod === 'email' ? 'Enter your email address' : 'Enter your phone number'}
            value={formData?.emailOrPhone}
            onChange={handleInputChange}
            error={errors?.emailOrPhone}
            required
            disabled={isLoading}
          />
          
          <div className="mt-2 flex items-center space-x-4 text-xs text-text-secondary">
            <button
              type="button"
              onClick={() => setRecoveryMethod('email')}
              className={`flex items-center space-x-1 px-2 py-1 rounded transition-smooth ${
                recoveryMethod === 'email' ?'bg-primary/10 text-primary' :'hover:bg-muted'
              }`}
            >
              <Icon name="Mail" size={12} />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => setRecoveryMethod('phone')}
              className={`flex items-center space-x-1 px-2 py-1 rounded transition-smooth ${
                recoveryMethod === 'phone' ?'bg-primary/10 text-primary' :'hover:bg-muted'
              }`}
            >
              <Icon name="Phone" size={12} />
              <span>Phone</span>
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>
      </form>
      <div className="mt-8 pt-6 border-t border-border">
        <div className="text-center space-y-4">
          <p className="text-sm text-text-secondary">
            Remember your password?
          </p>
          <Link to="/login">
            <Button variant="ghost" fullWidth>
              <Icon name="ArrowLeft" size={16} />
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecoveryForm;