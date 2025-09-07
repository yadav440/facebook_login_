import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CreateAccountSection = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/registration');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">New to Facebook?</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleCreateAccount}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 border-0"
        >
          Create new account
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          By clicking "Create new account", you agree to our{' '}
          <a href="#" className="text-primary hover:underline">
            Terms
          </a>
          ,{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Cookies Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default CreateAccountSection;