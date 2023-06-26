import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px; //원하는 크기로 변경 가능
  height: 100px; //원하는 크기로 변경 가능
  position: relative;
  background-color: #f3f3f3;
`;

interface AvatarProps {
  src: string | null;
  alt: string | undefined;
}

const Avatar = ({ src, alt }: AvatarProps) => {
  const defaultAvatar = '/default-avatar.png'; // Default avatar image path
  return (
    <AvatarWrapper>
      <Image
        width="100"
        height="100"
        src={src || defaultAvatar}
        alt={alt || 'avatar'}
      />
    </AvatarWrapper>
  );
};

export default Avatar;
