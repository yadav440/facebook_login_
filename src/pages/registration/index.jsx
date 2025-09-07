import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PersonalInfoForm from './components/PersonalInfoForm';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import SocialRegistration from './components/SocialRegistration';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    gender: '',
    profilePhoto: null
  });

  const [agreed, setAgreed] = useState({
    terms: false,
    marketing: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAgreementChange = (field, value) => {
    setAgreed(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-()]+$/;
      if (!emailRegex?.test(formData?.emailOrPhone) && !phoneRegex?.test(formData?.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData?.birthMonth || !formData?.birthDay || !formData?.birthYear) {
      newErrors.birthday = 'Please provide your complete birth date';
    }

    if (!formData?.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!agreed?.terms) {
      newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep2()) return;

    setLoading(true);
    
    // Simulate registration process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Simulate social registration
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/main-dashboard');
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-surface rounded-lg shadow-soft-lg p-8 text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Account Created Successfully!
            </h2>
            <p className="text-text-secondary mb-4">
              Welcome to Facebook! Please check your email to verify your account.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} />
              <span>Redirecting to login...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="bg-surface rounded-lg shadow-soft-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-text-primary">
                    Create Account
                  </h1>
                  <p className="text-sm text-text-secondary mt-1">
                    Join Facebook to connect with friends and family
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-text-secondary'
                  }`}>
                    1
                  </div>
                  <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-text-secondary'
                  }`}>
                    2
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <PersonalInfoForm
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                  
                  <PasswordStrengthIndicator password={formData?.password} />
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <ProfilePhotoUpload
                    photo={formData?.profilePhoto}
                    onPhotoChange={(photo) => handleInputChange('profilePhoto', photo)}
                    error={errors?.profilePhoto}
                  />

                  <TermsAndPrivacy
                    agreed={agreed}
                    onAgreementChange={handleAgreementChange}
                    error={errors}
                  />

                  {errors?.submit && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                      <p className="text-sm text-destructive">{errors?.submit}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Back
                    </Button>
                    
                    <Button
                      type="submit"
                      loading={loading}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {/* Social Registration - Only show on step 1 */}
            {currentStep === 1 && (
              <div className="px-6 pb-6">
                <SocialRegistration onSocialRegister={handleSocialRegister} />
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 bg-muted border-t border-border">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className="text-text-secondary">Already have an account?</span>
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
              <a href="#" className="hover:text-text-primary">About</a>
              <a href="#" className="hover:text-text-primary">Help</a>
              <a href="#" className="hover:text-text-primary">Privacy</a>
              <a href="#" className="hover:text-text-primary">Terms</a>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              © {new Date()?.getFullYear()} Facebook Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;