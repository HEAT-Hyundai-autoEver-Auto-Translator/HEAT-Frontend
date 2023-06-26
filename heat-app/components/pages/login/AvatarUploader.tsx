import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from 'components/common/Avatar';
import { Button } from 'components/common/Button';
import { HStack } from 'components/common/Stack';
import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  language: string;
  avatar: FileList;
};

interface AvatarUploaderProps {
  alt?: string;
  control: Control<FormValues>; // Add this line
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const AvatarUploader = ({ control, alt }: AvatarUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const theme = useTheme();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length !== 1) {
      alert('You can only upload one file at a time.');
      return;
    }

    const file = files[0];
    if (file.size > MAX_FILE_SIZE) {
      alert('File size should not exceed 5MB.');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ width: '100%' }}>
      <HStack spacing="2rem" w="100%" style={{ marginBottom: '2rem' }}>
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
                  // 파일선택을 처리하고 field.onChange를 호출-> react-hook-form 에 알림
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
        <FileNameBox>
          <FileName>{fileName}</FileName>
        </FileNameBox>
      </HStack>
    </div>
  );
};

export default AvatarUploader;

const FileNameBox = styled.div`
  width: 19rem;
  height: 3rem;
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.mono.input_gray};
  color: black;
  font-size: 1.3rem;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileName = styled.span`
  white-space: nowrap; // Prevents the text from breaking onto the next line
  text-overflow: ellipsis; // Adds '...' if the text is too long
  overflow: hidden; // Ensures text that won't fit is clipped
  padding: 0 1rem; // Adds left and right padding
`;
