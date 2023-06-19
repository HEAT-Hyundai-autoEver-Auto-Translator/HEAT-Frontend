import styled from "@emotion/styled";

type DividerProps = Partial<{
  orientation: "horizontal" | "vertical";
  color: string;
  thickness: string;
}>;

export const Divider = styled.div<DividerProps>`
  width: ${({ orientation = "horizontal" }) =>
    orientation === "horizontal" ? "80%" : "auto"};
  height: ${({ orientation = "horizontal" }) =>
    orientation === "vertical" ? "80%" : "auto"};
  border-top: ${({
    orientation = "horizontal",
    theme,
    color = theme.colors.mono.gray100,
    thickness = "0.1rem",
  }) => (orientation === "horizontal" ? `${thickness} solid ${color}` : 0)};
  border-left: ${({
    orientation = "horizontal",
    theme,
    color = theme.colors.mono.gray100,
    thickness = "0.1rem",
  }) => (orientation === "vertical" ? `${thickness} solid ${color}` : 0)};
`;

/**
 * 6/20
 * div의 border를 이용하여 구현한 Divider
 * orientation: horizontal | vertical
 * color: 색상
 * thickness: 두께
 * 수직 방향일 경우 left border를 사용하고 수평 방향일 경우 top border를 사용한다.
 * 기본값은 수평 방향이며, 색상은 theme.colors.mono.gray100, 두께는 0.1rem이다.
 *
 */
