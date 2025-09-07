import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePhotoUpload = ({ photo, onPhotoChange, error }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoChange({
          file,
          preview: e?.target?.result,
          name: file?.name
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const file = e?.dataTransfer?.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    const file = e?.target?.files?.[0];
    handleFileSelect(file);
  };

  const removePhoto = () => {
    onPhotoChange(null);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-text-primary">
        Profile Photo (Optional)
      </label>
      {photo ? (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={photo?.preview}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
              onClick={removePhoto}
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">{photo?.name}</p>
            <p className="text-xs text-text-secondary">Click the X to remove</p>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? 'border-primary bg-accent' :'border-border hover:border-primary'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Camera" size={24} color="var(--color-text-secondary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Add a profile photo
              </p>
              <p className="text-xs text-text-secondary">
                Drag and drop or click to browse
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="photo-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Choose File
            </Button>
          </div>
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;