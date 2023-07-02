import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

interface AvatarWrapperProps {
  size: string;
  onClick?: (e: React.MouseEvent) => void;
}
const AvatarWrapper = styled.div<AvatarWrapperProps>`
  border-radius: 50%;
  overflow: hidden;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  width: ${({ size }) => getSizeWrapper(size)};
  height: ${({ size }) => getSizeWrapper(size)};
  position: relative;
`;

const getSizeWrapper = (size: string): string => {
  switch (size) {
    case 'sm':
      return '50px';
    case 'md':
      return '75px';
    case 'lg':
    default:
      return '100px';
  }
};

const getSizeImage = (size: string): number => {
  switch (size) {
    case 'sm':
      return 50;
    case 'md':
      return 75;
    case 'lg':
    default:
      return 100;
  }
};

interface AvatarProps {
  src: string | null;
  alt?: string;
  size: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent) => void;
}

const Avatar = ({ src, alt, size, onClick }: AvatarProps) => {
  const defaultAvatar = '/default-avatar.png'; // Default avatar image path
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <AvatarWrapper size={size} onClick={onClick}>
      <Image
        width={getSizeImage(size)}
        height={getSizeImage(size)}
        src={src || defaultAvatar}
        alt={alt || 'avatar'}
        onDragStart={handleDragStart}
      />
    </AvatarWrapper>
  );
};

export default Avatar;
