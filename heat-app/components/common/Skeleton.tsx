import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const load = keyframes`
  100% {
    background-position: -100% 0;
  }
`;

interface SkeletonProps {
  height?: string;
  width?: string;
}
export const Skeleton = styled.div<SkeletonProps>`
  background-color: #ddd; // 스켈레톤의 배경색 설정
  width: ${({ width = '100%' }) => width}; // 스켈레톤의 넓이 설정
  height: ${({ height = '5rem' }) => height}; // 스켈레톤의 높이 설정
  border-radius: 4px; // 스켈레톤의 모서리 둥글게 설정
  margin-bottom: 1rem; // 스켈레톤 간격 설정

  // 스켈레톤 로딩 애니메이션 설정
  animation: pulse 2s infinite ease-in-out;

  // 애니메이션 키 프레임 정의
  background: linear-gradient(
    120deg,
    #3182ce 30%,
    #8ac0f3 38%,
    #8ac0f3 40%,
    #3182ce 48%
  );
  border-radius: 1rem;
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: ${load} 2s infinite;
`;

// const Flex = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   text-align: justify;

//   @media (max-width: 767.98px) {
//     display: grid;
//   }
// `;

// const Item = styled.div`
//   padding: 2rem;
// `;

// const ItemImg = styled.div`
//   position: relative;
//   width: 320px;
//   height: 180px;
// `;

// // 스켈레톤 메인 컨테이너
// const SkeletonLoading = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: var(--bg-color);

//   & * {
//     background: linear-gradient(
//       120deg,
//       #e5e5e5 30%,
//       #f0f0f0 38%,
//       #f0f0f0 40%,
//       #e5e5e5 48%
//     );
//     border-radius: 1rem;
//     background-size: 200% 100%;
//     background-position: 100% 0;
//     animation: ${load} 1s infinite;
//   }
// `;

// // 스켈레톤 이미지
// const SkeletonImg = styled.div`
//   width: 100%;
//   height: 100%;
// `;

// const SkeletonPan = styled.div`
//   width: 100%;
//   height: 20%;
// `;
// // 스켈레톤 텍스트
// const SkeletonText = styled.div`
//   margin-bottom: 0.5rem;
//   height: 1rem;

//   &:nth-child(1) {
//     width: 50%;
//     height: 1.5rem;
//   }

//   &:nth-child(2) {
//     width: 20%;
//     height: 0.8rem;
//   }

//   &:last-child {
//     width: 80%;
//   }
// `;
// export const Skeleton = () => {
//   return (
//     <Flex>
//       <Item>
//         <ItemImg>
//           <SkeletonLoading>
//             {/* <SkeletonImg /> */}
//             <SkeletonPan />
//             {/* <SkeletonText />
//             <SkeletonText />
//             <SkeletonText /> */}
//           </SkeletonLoading>
//         </ItemImg>
//       </Item>
//     </Flex>
//   );
// };
