/**
 * @deprecated
 * 셀렉트를 커스텀하게 사용하기 위해 만든 컴포넌트
 * 그러나 태생이 셀렉트에 기반하기때문에 브라우저 기본 스타일을 제거하는 것이 불가능하다.
 * 따라서 셀렉트를 커스텀하게 사용하고 싶다면, 셀렉트를 직접 만들어서 사용하는 것이 좋다.
 * -> components/common/DropDown.tsx 를 제작하여 사용했음.
 */
// import { useTheme } from '@emotion/react';
// import styled from '@emotion/styled';
// import { Select } from 'components/common/Select';
// import React, { SelectHTMLAttributes, forwardRef, useState } from 'react';
// import ArrowDownIcon from 'public/ArrowDownIcon.svg';
// import { HStack } from 'components/common/Stack';

// interface StyledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
//   inputSize?: 'xl' | 'lg' | 'sm';
//   placeholder?: string;
// }

// const SelectWrapper = styled.div`
//   position: relative;
//   display: inline-block;
//   width: 100%;
// `;

// export const StyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>(
//   ({ placeholder, children, ...rest }, ref) => {
//     const theme = useTheme();

//     return (
//       <SelectWrapper>
//         <Select
//           ref={ref}
//           inputSize="xl"
//           fontColor={rest.value === '' ? 'gray' : theme.colors.mono.black}
//           bgColor={theme.colors.mono.input_gray}
//           paddingLeft="2.5rem"
//           paddingRight="2.5rem"
//           {...rest}
//         >
//           {children}
//         </Select>
//         {/* <StyledArrowDownIcon src="/path/to/your/icon.png" /> */}
//       </SelectWrapper>
//     );
//   },
// );

// const StyledArrowDownIcon = styled(ArrowDownIcon)`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   transform: translateY(-50%);
// `;
