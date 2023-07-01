import styled from '@emotion/styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay } from '@/../components/common/Overlay';

type CenterProps = Partial<{
  w: string;
  h: string;
}>;

const Center = styled.div<CenterProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ w = 'auto' }) => w};
  height: ${({ h = 'auto' }) => h};
`;

type ModalType = {
  isOpen: boolean;
  padding?: string;
  toggle: () => void;
};
//children은 모달 안에 들어갈 내용
type ModalProps = ModalType & React.PropsWithChildren;

interface ModalViewProps {
  padding?: string;
}
const ModalView = styled.div<ModalViewProps>`
  display: flex;
  padding: ${({ padding }) => padding || '4rem'};
  border-radius: ${({ theme }) => theme.radius.md};
  // background-color: ${({ theme }) => theme.colors.mono.white};
  background-color: white;
`;

// https://velog.io/@sunohvoiin/ReactCSS-%EB%AA%A8%EB%8B%AC%EC%B0%BD%EC%9D%B4-%EC%97%B4%EB%A0%A4%EC%9E%88%EC%9D%84-%EB%95%8C-body-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%B0%A9%EC%A7%80%ED%95%98%EA%B8%B0
const preventScroll = () => {
  const currentScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
  document.body.style.overflowY = 'scroll';
  return currentScrollY;
};

const allowScroll = (prevScrollY: number) => {
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, prevScrollY);
};

/**
 * Modal 컴포넌트는 `isOpen`이 true일 때 제공된 내용(`children`)을 가진 대화형 오버레이를 표시합니다.
 * 또한, 모달이 열려있을 때 본문 스크롤을 막고, 모달이 닫힐 때 스크롤을 다시 허용하는 기능도 처리합니다.
 *
 * @param isOpen - 모달이 열려있는지 여부를 나타내는 boolean 값입니다.
 * @param toggle - 모달 상태를 전환하는 함수입니다.
 * @param children - 모달 내에서 표시될 내용입니다.
 */
export const Modal = ({ isOpen, toggle, padding, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => allowScroll(prevScrollY);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <>
          {createPortal(
            <Overlay onClick={toggle}>
              <Center w="100%" h="100%">
                {/* e.stopPropagation() 은 클릭 이벤트가 부모 요소로 전파되는 것을 막아준다. */}
                <ModalView
                  role="dialog"
                  padding={padding}
                  onClick={e => e.stopPropagation()}
                >
                  {children}
                </ModalView>
              </Center>
            </Overlay>,
            document.getElementById('modal') as HTMLElement,
          )}
        </>
      ) : null}
    </>
  );
};

/**
 * createPortal 은 리액트에서 제공하는 API로, 리액트 컴포넌트를 DOM의 특정 위치에 렌더링할 때 사용한다.
 * 첫 번째 인자로는 렌더링할 리액트 컴포넌트를 전달하고, 두 번째 인자로는 컴포넌트를 렌더링할 DOM 요소를 전달한다.
 * 이렇게 하면 리액트 컴포넌트를 렌더링할 때 일반적인 방식으로는 불가능한 다른 DOM에 렌더링할 수 있다.
 */

/**
 * role="dialog" 는 모달이 대화 상자임을 나타내는 역할을 한다.
 * 모달은 대화 상자이기 때문에 모달이 열릴 때는 모달 외부의 요소를 클릭해도 모달이 닫히지 않아야 한다.
 * 따라서 모달 외부의 요소를 클릭했을 때 모달이 닫히지 않도록 onClick 이벤트를 설정해야 한다.
 * 이때, 모달 외부의 요소를 클릭했을 때 모달이 닫히지 않도록 하기 위해서는 모달 외부의 요소에 onClick 이벤트를 설정하고,
 * 이벤트 객체의 stopPropagation() 메서드를 호출해야 한다.
 * stopPropagation() 메서드는 이벤트가 부모 요소로 전파되는 것을 막아준다.
 */
