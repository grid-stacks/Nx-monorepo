import './shared-ui.module.css';
import TopicButton from './topic-button/topic-button';

/* eslint-disable-next-line */
export interface SharedUiProps {}

export function SharedUi(props: SharedUiProps) {
  return (
    <div>
      <h1>Welcome to SharedUi!</h1>
      <TopicButton text="Hello" />
    </div>
  );
}

export default SharedUi;
