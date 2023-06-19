import styled from "@emotion/styled";

export const Spacer = styled.div`
  flex: 1;
`;

//6/19
//https://velog.io/@mooongs/flex1의-의미
// flex: 1;는 flex-grow: 1;, flex-shrink: 1; 그리고 flex-basis: 0;의 축약 형태입니다. 각 속성에 대해 간략히 설명하면:

// flex-grow: Flex 아이템이 공간이 충분할 때 컨테이너 내에서 얼마나 커질 수 있는지 결정합니다. 모든 아이템의 flex-grow 값이 같다면, 모든 아이템은 같은 양의 여유 공간을 가집니다.
// flex-shrink: Flex 아이템이 공간이 부족할 때 컨테이너 내에서 얼마나 줄어들 수 있는지 결정합니다. 모든 아이템의 flex-shrink 값이 같다면, 모든 아이템은 같은 양의 공간을 점유하려고 줄어듭니다.
// flex-basis: Flex 아이템의 초기 크기를 결정합니다. 0은 아이템이 시작할 때 아무런 공간도 차지하지 않는다는 것을 의미합니다.
// 따라서, Spacer 컴포넌트는 Flexbox 레이아웃 내에서 남은 공간을 다른 컴포넌트들과 균등하게 점유하려고 합니다. 다른 아이템들 사이에 Spacer 컴포넌트를 넣으면, 그 컴포넌트는 아이템들 사이에 공간을 만들어내는 역할을 합니다. 이를 통해 간격을 만들거나, 아이템들을 컨테이너의 양 끝으로 밀어내는 등의 레이아웃을 구성할 수 있습니다.
// 결론 : 크기는 0 인데 다른 애들과 균등하게 줄어들며(flex-grow가 1로 같음) 반대로 flex-grow는 1이어서(디폴트값 0) 남은 공간을 잡아먹는 것이다.
