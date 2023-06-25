import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px; //원하는 크기로 변경 가능
  height: 100px; //원하는 크기로 변경 가능
  position: relative;
`;

interface AvatarProps {
  src: string | null;
  alt: string | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  const defaultAvatar = '/default-avatar.png'; // Default avatar image path
  return (
    <AvatarWrapper>
      <Image
        src={src || defaultAvatar}
        alt={alt || 'avatar'}
        layout="fill"
        objectFit="cover"
      />
    </AvatarWrapper>
  );
};

export default Avatar;
