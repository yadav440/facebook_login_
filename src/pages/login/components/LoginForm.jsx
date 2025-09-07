import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    keepLoggedIn: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: "user@facebook.com",
    phone: "+1234567890",
    password: "facebook123"
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const { emailOrPhone, password } = formData;
      
      // Check credentials
      if ((emailOrPhone === mockCredentials?.email || emailOrPhone === mockCredentials?.phone) && 
          password === mockCredentials?.password) {
        // Success - navigate to dashboard
        navigate('/main-dashboard');
      } else {
        // Failed authentication
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials?.email} or phone: ${mockCredentials?.phone} with password: ${mockCredentials?.password}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors?.general}</p>
          </div>
        )}

        {/* Email/Phone Input */}
        <Input
          label="Email or phone number"
          type="text"
          name="emailOrPhone"
          placeholder="Email or phone number"
          value={formData?.emailOrPhone}
          onChange={handleInputChange}
          error={errors?.emailOrPhone}
          required
          className="w-full"
        />

        {/* Password Input with Toggle */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Keep me logged in checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Keep me logged in"
            name="keepLoggedIn"
            checked={formData?.keepLoggedIn}
            onChange={handleInputChange}
            className="text-sm"
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          className="bg-primary hover:bg-blue-700 text-white font-semibold py-3"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>

        {/* Forgotten Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/password-recovery')}
            className="text-primary hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Forgotten password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;