import styled from '@emotion/styled';
import Image from 'next/image';

const AvatarWrapper = styled.div<{ size: string }>`
  border-radius: 50%;
  overflow: hidden;
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  position: relative;
`;

const getSize = (size: string): number => {
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
}

const Avatar = ({ src, alt, size }: AvatarProps) => {
  const defaultAvatar = '/default-avatar.png'; // Default avatar image path
  return (
    <AvatarWrapper size={size}>
      <Image
        width={getSize(size)}
        height={getSize(size)}
        src={src || defaultAvatar}
        alt={alt || 'avatar'}
      />
    </AvatarWrapper>
  );
};

export default Avatar;
