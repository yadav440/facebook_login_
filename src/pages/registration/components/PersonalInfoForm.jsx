import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoForm = ({ formData, errors, onChange }) => {
  const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)
  }));

  const currentYear = new Date()?.getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i)
  }));

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="First name"
          value={formData?.firstName}
          onChange={(e) => onChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Last name"
          value={formData?.lastName}
          onChange={(e) => onChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email or Phone Number"
        type="text"
        placeholder="Email address or phone number"
        value={formData?.emailOrPhone}
        onChange={(e) => onChange('emailOrPhone', e?.target?.value)}
        error={errors?.emailOrPhone}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="New password"
        value={formData?.password}
        onChange={(e) => onChange('password', e?.target?.value)}
        error={errors?.password}
        required
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">
          Birthday <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <Select
            placeholder="Month"
            options={monthOptions}
            value={formData?.birthMonth}
            onChange={(value) => onChange('birthMonth', value)}
            error={errors?.birthMonth}
          />
          <Select
            placeholder="Day"
            options={dayOptions}
            value={formData?.birthDay}
            onChange={(value) => onChange('birthDay', value)}
            error={errors?.birthDay}
          />
          <Select
            placeholder="Year"
            options={yearOptions}
            value={formData?.birthYear}
            onChange={(value) => onChange('birthYear', value)}
            error={errors?.birthYear}
          />
        </div>
        {errors?.birthday && (
          <p className="text-sm text-destructive">{errors?.birthday}</p>
        )}
      </div>
      <Select
        label="Gender"
        placeholder="Select gender"
        options={genderOptions}
        value={formData?.gender}
        onChange={(value) => onChange('gender', value)}
        error={errors?.gender}
        required
      />
    </div>
  );
};

export default PersonalInfoForm;