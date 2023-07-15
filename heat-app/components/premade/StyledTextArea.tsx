import styled from '@emotion/styled';

export const StyledTextarea = styled.textarea<TextareaProps>`
  resize: none;
  width: 100%;
  height: 100%;
  padding: 15px;
  font-size: ${({ fontSize }) => fontSize || '3rem'};
  border-radius: 10px;
  border: 1px solid ${({ borderColor }) => borderColor || 'transparent'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  color: ${({ color }) => color || 'black'};
  overflow-y: auto;

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.mono.input_gray};
    margin: 10px;
    border-radius: 10px;
  }

  ::placeholder {
    color: ${({ placeholderColor }) => placeholderColor || 'gray'};
  }

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    padding: 12px;
    font-size: ${({ mobileFontSize }) => mobileFontSize || '1.5rem'};
  }
`;

export type TextareaProps = {
  bgColor?: string;
  borderColor?: string;
  color?: string;
  placeholder?: string;
  placeholderColor?: string;
  fontSize?: string;
  mobileFontSize?: string;
  value?: string;

  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Move this here
};

export const Textarea = ({
  bgColor,
  borderColor,
  color,
  placeholder,
  placeholderColor,
  textareaRef,
  value,
  fontSize,
  mobileFontSize,
  onChange,
}: TextareaProps & {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}) => {
  return (
    <StyledTextarea
      ref={textareaRef}
      bgColor={bgColor}
      borderColor={borderColor}
      color={color}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      fontSize={fontSize}
      mobileFontSize={mobileFontSize}
      value={value}
      onChange={onChange}
    />
  );
};
