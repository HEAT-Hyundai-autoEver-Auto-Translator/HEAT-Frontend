import styled from '@emotion/styled';

type OverlayProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
} & React.PropsWithChildren;

export const Overlay = ({ onClick, children }: OverlayProps) => {
  return <OverlayLayout onClick={onClick}>{children}</OverlayLayout>;
};

const OverlayLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;
