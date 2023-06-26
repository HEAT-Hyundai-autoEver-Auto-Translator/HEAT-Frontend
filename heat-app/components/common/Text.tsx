import styled from '@emotion/styled';

type TextProps = Partial<{
  fontSize: string;
  fontWeight: number;
  color: string;
  selectable?: boolean;
}>;

export const Text = styled.p<TextProps>`
  font-size: ${({ theme, fontSize = theme.fonts.size.body }) => fontSize};
  font-weight: ${({ theme, fontWeight = theme.fonts.weight.regular }) =>
    fontWeight};
  color: ${({ color = 'inherit' }) => color};
  line-height: 1.5;
  user-select: ${({ selectable = false }) =>
    selectable ? 'auto' : 'none'}; // 텍스트 드래그 제한
`;
