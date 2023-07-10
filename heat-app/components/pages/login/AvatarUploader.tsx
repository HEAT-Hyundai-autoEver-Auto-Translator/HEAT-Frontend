import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from 'components/common/Avatar';
import { Button } from 'components/common/Button';
import { HStack, VStack } from 'components/common/Stack';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  language: string;
  avatar: FileList | string;
};

export interface AvatarUploaderProps {
  alt?: string;
  control: Control<FormValues>;
  defaultAvatar?: string;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const AvatarUploader = ({
  control,
  alt,
  selectedFile,
  defaultAvatar,
  setSelectedFile,
}: AvatarUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    defaultAvatar || null,
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  console.log(defaultAvatar);
  return (
    <div style={{ width: '100%' }}>
      <HStack spacing="2rem" w="100%" style={{ marginBottom: '3rem' }}>
        <Avatar size={isMobile ? 'md' : 'lg'} src={selectedImage} alt={alt} />
        <Controller
          name="avatar"
          control={control}
          defaultValue={undefined}
          render={({ field }) => {
            const handleImageUpload = (
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
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

              //미리보기 부분
              setFileName(file.name);
              const reader = new FileReader();
              reader.onloadend = () => {
                setSelectedImage(reader.result as string);
              };
              reader.readAsDataURL(file);
              // Update the file field
              field.onChange(event);

              //업로드 부분
              setSelectedFile(file);
            };
            return (
              <>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload} // Call our custom handleImageUpload function
                />
                <VStack style={{ alignItems: 'flex-start' }} spacing="1rem">
                  <Button
                    size={isMobile ? 'xxs' : 'xs'}
                    type="button"
                    onClick={() => {
                      const elem = document.getElementById('fileInput');
                      if (elem) elem.click();
                    }}
                  >
                    Select Image
                  </Button>
                  <FileNameBox>
                    <FileName>{fileName}</FileName>
                  </FileNameBox>
                </VStack>
              </>
            );
          }}
        />
      </HStack>
    </div>
  );
};

export default AvatarUploader;

const FileNameBox = styled.div`
  width: 28rem;
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

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 10rem;
    height: 2rem;
  }
`;

const FileName = styled.span`
  white-space: nowrap; // Prevents the text from breaking onto the next line
  text-overflow: ellipsis; // Adds '...' if the text is too long
  overflow: hidden; // Ensures text that won't fit is clipped
  padding: 0 1rem; // Adds left and right padding
`;
