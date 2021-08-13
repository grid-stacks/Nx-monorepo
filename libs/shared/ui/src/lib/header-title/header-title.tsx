import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeaderTitleProps {}

const StyledHeaderTitle = styled.div`
  color: pink;
`;

export function HeaderTitle(props: HeaderTitleProps) {
  return (
    <StyledHeaderTitle>
      <h1>Welcome to HeaderTitle!</h1>
    </StyledHeaderTitle>
  );
}

export default HeaderTitle;
