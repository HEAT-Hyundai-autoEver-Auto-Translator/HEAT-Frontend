import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
type ButtonProps = {
  bgColor?: string;
  fontColor?: string;
  hoverColor?: string;
  size: 'lg' | 'sm' | 'xl' | 'xs' | 'xxs';
  fontWeight?: 'bold' | 'normal';
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export const ButtonBase = styled.button<ButtonProps>`
  all: unset;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '40rem';
      case 'sm':
        return '20rem';
      case 'xl':
        return '60rem';
      case 'xs':
        return '10rem';
      case 'xxs':
        return '6.5rem';
      default:
        return '20rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '6rem';
      case 'sm':
        return '4rem';
      case 'xl':
        return '9rem';
      case 'xs':
        return '3rem';
      case 'xxs':
        return '2rem';
      default:
        return '3rem';
    }
  }};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '8px';
      case 'xxs':
        return '7px';
      default:
        return '10px';
    }
  }};
  border: none;
  font-size: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '2rem';
      case 'sm':
        return '2rem';
      case 'xl':
        return '3rem';
      case 'xs':
        return '1.5rem';
      case 'xxs':
        return '1rem';
      default:
        return '1rem';
    }
  }};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ fontColor }) => fontColor || 'black'};
  transition: all 0.1s ease-in-out;

  --fillColor: ${({ bgColor }) => bgColor || 'gray'};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#003F7F'};
    --fillColor: ${({ hoverColor }) => hoverColor || '#003F7F'};
  }

  &:active {
    transform: scale(0.95);
  }

  &:active:after {
    transform: scale(1);
  }

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: ${({ size }) => {
      switch (size) {
        case 'lg':
          return '20rem';
        case 'sm':
          return '10rem';
        case 'xl':
          return '30rem';
        case 'xs':
          return '7rem';
        case 'xxs':
          return '7.5rem';
        default:
          return '10rem';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'lg':
          return '3rem';
        case 'sm':
          return '2rem';
        case 'xl':
          return '4.5rem';
        case 'xs':
          return '2rem';
        case 'xxs':
          return '1.5rem';
        default:
          return '1.5rem';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'lg':
          return '1rem';
        case 'sm':
          return '0.75rem';
        case 'xl':
          return '1.5rem';
        case 'xs':
          return '0.5rem';
        case 'xxs':
          return '0.5rem';
        default:
          return '0.5rem';
      }
    }};
    border-radius: ${({ size }) => (size === 'xxs' ? '3.5px' : '5px')};
  }
`;

export const Button = (props: ButtonProps) => {
  const theme = useTheme();
  return (
    <ButtonBase
      bgColor={theme.colors.primary.semi_light}
      fontColor={theme.colors.mono.white}
      hoverColor={theme.colors.primary.semi_dark}
      type={props.type || 'button'}
      {...props}
    >
      {props.children}
    </ButtonBase>
  );
};

// import { keyframes, useTheme } from '@emotion/react';
// import styled from '@emotion/styled';
// import React, { MouseEventHandler, useEffect, useState } from 'react';
// type ButtonProps = {
//   bgColor?: string;
//   fontColor?: string;
//   hoverColor?: string;
//   size: 'lg' | 'sm' | 'xl' | 'xs' | 'xxs';
//   fontWeight?: 'bold' | 'normal';
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   children: React.ReactNode;
//   type?: 'button' | 'submit' | 'reset';
//   confirm?: boolean;
// };

// export const ButtonBase = styled.button<ButtonProps>`
//   all: unset;
//   display: flex;
//   cursor: pointer;
//   align-items: center;
//   justify-content: center;
//   width: ${({ size }) => {
//     switch (size) {
//       case 'lg':
//         return '40rem';
//       case 'sm':
//         return '20rem';
//       case 'xl':
//         return '60rem';
//       case 'xs':
//         return '10rem';
//       case 'xxs':
//         return '6.5rem';
//       default:
//         return '20rem';
//     }
//   }};
//   height: ${({ size }) => {
//     switch (size) {
//       case 'lg':
//         return '6rem';
//       case 'sm':
//         return '4rem';
//       case 'xl':
//         return '9rem';
//       case 'xs':
//         return '3rem';
//       case 'xxs':
//         return '2rem';
//       default:
//         return '3rem';
//     }
//   }};
//   background-color: ${({ bgColor }) => bgColor || 'white'};
//   border-radius: ${({ size }) => {
//     switch (size) {
//       case 'xs':
//         return '8px';
//       case 'xxs':
//         return '7px';
//       default:
//         return '10px';
//     }
//   }};
//   border: none;
//   font-size: ${({ size }) => {
//     switch (size) {
//       case 'lg':
//         return '2rem';
//       case 'sm':
//         return '2rem';
//       case 'xl':
//         return '3rem';
//       case 'xs':
//         return '1.5rem';
//       case 'xxs':
//         return '1rem';
//       default:
//         return '1rem';
//     }
//   }};
//   font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
//   color: ${({ fontColor }) => fontColor || 'black'};
//   transition: all 0.1s ease-in-out;

//   --fillColor: ${({ bgColor }) => bgColor || 'gray'};

//   &:hover {
//     background-color: ${({ hoverColor }) => hoverColor || '#003F7F'};
//     --fillColor: ${({ hoverColor }) => hoverColor || '#003F7F'};
//   }

//   &:active {
//     transform: scale(0.95);
//   }

//   &:active:after {
//     transform: scale(1);
//   }

//   @media (max-width: ${({ theme }) => theme.Media.mobile}) {
//     width: ${({ size }) => {
//       switch (size) {
//         case 'lg':
//           return '20rem';
//         case 'sm':
//           return '10rem';
//         case 'xl':
//           return '30rem';
//         case 'xs':
//           return '7rem';
//         case 'xxs':
//           return '7.5rem';
//         default:
//           return '10rem';
//       }
//     }};
//     height: ${({ size }) => {
//       switch (size) {
//         case 'lg':
//           return '3rem';
//         case 'sm':
//           return '2rem';
//         case 'xl':
//           return '4.5rem';
//         case 'xs':
//           return '2rem';
//         case 'xxs':
//           return '1.5rem';
//         default:
//           return '1.5rem';
//       }
//     }};
//     font-size: ${({ size }) => {
//       switch (size) {
//         case 'lg':
//           return '1rem';
//         case 'sm':
//           return '0.75rem';
//         case 'xl':
//           return '1.5rem';
//         case 'xs':
//           return '0.5rem';
//         case 'xxs':
//           return '0.5rem';
//         default:
//           return '0.5rem';
//       }
//     }};
//     border-radius: ${({ size }) => (size === 'xxs' ? '3.5px' : '5px')};
//   }
// `;

// const progressAnimation = keyframes`
//   0% { stroke-dashoffset: 100; }
//   100% { stroke-dashoffset: 0; }
// `;

// const CircularProgress = styled.svg<ButtonProps & { time: number }>`
//   position: relative;
//   margin-left: 5px;
//   // Update the width and height to be responsive to 'size'
//   width: ${({ size }) => {
//     switch (size) {
//       case 'lg':
//         return '30px';
//       case 'sm':
//         return '20px';
//       case 'xl':
//         return '40px';
//       case 'xs':
//         return '15px';
//       case 'xxs':
//         return '10px';
//       default:
//         return '20px';
//     }
//   }};
//   height: ${({ size }) => {
//     switch (size) {
//       case 'lg':
//         return '30px';
//       case 'sm':
//         return '20px';
//       case 'xl':
//         return '40px';
//       case 'xs':
//         return '15px';
//       case 'xxs':
//         return '10px';
//       default:
//         return '20px';
//     }
//   }};

//   circle {
//     fill: none;
//     stroke: white;
//     stroke-width: 3;
//     stroke-dasharray: 100;
//     stroke-dashoffset: 0;
//     stroke-linecap: round;
//     // animation: ${progressAnimation} 5s linear forwards;
//     animation: ${progressAnimation} ${({ time }) => time}s linear forwards;
//   }
// `;

// const loadProgress = keyframes`
//   0% {
//     width: 100%;
//   }
//   100% {
//     width: 0%;
//   }
// `;

// const LoadingBar = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   height: 2px; // Change the thickness of the loading bar here
//   background: grey;
//   animation: ${loadProgress} 5s linear forwards;
// `;

// export const Button = (props: ButtonProps) => {
//   const theme = useTheme();
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [isCountdownActive, setIsCountdownActive] = useState(false);

//   const time = 5;
//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;
//     if (isConfirming) {
//       timeoutId = setTimeout(() => {
//         setIsConfirming(false);
//         setIsCountdownActive(false);
//       }, time * 1000);
//     }
//     return () => clearTimeout(timeoutId);
//   }, [isConfirming]);

//   const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     if (props.confirm) {
//       if (!isConfirming) {
//         setIsConfirming(true);
//         setIsCountdownActive(true);
//       } else {
//         props.onClick && props.onClick(event); // submit form only in confirm state
//         setIsConfirming(false);
//         setIsCountdownActive(false);
//       }
//     } else {
//       props.onClick && props.onClick(event);
//     }
//   };
//   return (
//     <ButtonBase
//       // Add display flex and align items
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//       onClick={event => handleButtonClick(event)}
//       bgColor={theme.colors.primary.semi_light}
//       fontColor={theme.colors.mono.white}
//       hoverColor={theme.colors.primary.semi_dark}
//       type={props.type || 'button'}
//       {...props}
//     >
//       {isConfirming ? 'Confirm' : props.children}

//       {isCountdownActive && (
//         // Pass down 'size' to CircularProgress
//         <CircularProgress size={props.size} viewBox="0 0 36 36" time={time}>
//           <circle r="16" cx="18" cy="18" />
//         </CircularProgress>
//       )}
//     </ButtonBase>
//   );
//   // return (
//   //   <ButtonBase
//   //     // Add relative position to allow absolute positioning of children
//   //     style={{ position: 'relative' }}
//   //     onClick={handleButtonClick}
//   //     bgColor={theme.colors.primary.semi_light}
//   //     fontColor={theme.colors.mono.white}
//   //     hoverColor={theme.colors.primary.semi_dark}
//   //     type={props.type || 'button'}
//   //     {...props}
//   //   >
//   //     {isCountdownActive && <LoadingBar />}
//   //     {isConfirming ? 'Confirm' : props.children}
//   //   </ButtonBase>
//   // );
// };
