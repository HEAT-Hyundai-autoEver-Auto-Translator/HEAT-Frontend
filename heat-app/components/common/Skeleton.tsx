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

/*
background: linear-gradient( 120deg, #3182ce 30%, #8ac0f3 38%, #8ac0f3 40%, #3182ce 48% );

linear-gradient()는 선형 그라디언트 배경 이미지를 생성하는 CSS 함수입니다.
120deg는 그라디언트의 방향을 설정합니다. 여기서는 120도의 각도로 설정되어 있습니다.
#3182ce 30%, #8ac0f3 38%, #8ac0f3 40%, #3182ce 48%는 색상의 전환을 설정합니다. #3182ce는 30% 지점에서 시작하여 38% 지점에서 #8ac0f3로 부드럽게 변합니다. 그 다음 다시 40% 지점에서 #8ac0f3에서 시작하여 48% 지점에서 #3182ce로 부드럽게 변화합니다.
*/
