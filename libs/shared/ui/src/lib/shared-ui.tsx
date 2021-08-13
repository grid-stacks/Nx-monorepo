import HeaderTitle from './header-title/header-title';
import './shared-ui.module.css';
import TopicButton from './topic-button/topic-button';

/* eslint-disable-next-line */
export interface SharedUiProps {}

export function SharedUi(props: SharedUiProps) {
  return (
    <div>
      <h1>Welcome to SharedUi!</h1>
      <TopicButton variant="primary" handleClick={() => console.log("hello")}>Hello</TopicButton>
      <HeaderTitle />
    </div>
  );
}

export default SharedUi;
