import { useTheme } from '@emotion/react';
import Avatar from 'components/common/Avatar';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { HStack } from 'components/common/Stack';
import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

type FormValues = {
  email: string;
  username: string;
  password: string;
  avatar: FileList;
};

interface AvatarUploaderProps {
  alt?: string;
  control: Control<FormValues>; // Add this line
}
const AvatarUploader: React.FC<AvatarUploaderProps> = ({ control, alt }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const theme = useTheme();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // Set the file name
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <HStack spacing="2rem">
        <Avatar src={selectedImage} alt={alt} />
        <Controller
          name="avatar"
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={event => {
                  handleImageUpload(event);
                  field.onChange(event);
                }}
              />
              <Button
                size="xs"
                bgColor={theme.colors.primary.semi_light}
                hoverColor={theme.colors.primary.default}
                fontColor={theme.colors.mono.white}
                type="button"
                onClick={() => {
                  const elem = document.getElementById('fileInput');
                  if (elem) elem.click();
                }}
              >
                파일 선택
              </Button>
            </>
          )}
        />
        {/* 여기에 파일 이름 표시  */}
        {fileName && <div>Selected file: {fileName}</div>}
      </HStack>
    </div>
  );
};

export default AvatarUploader;

/*
    <div>
      <HStack spacing="2rem">
        <Avatar src={selectedImage} alt={alt} />
        <Controller
          name="avatar"
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <Input
              bgColor={theme.colors.mono.input_gray}
              type="file"
              accept="image/*"
              onChange={event => {
                handleImageUpload(event);
                field.onChange(event);
              }}
            />
          )}
        />
      </HStack>
    </div> */
