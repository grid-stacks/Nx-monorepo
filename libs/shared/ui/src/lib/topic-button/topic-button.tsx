import './topic-button.module.css';

/* eslint-disable-next-line */
export interface TopicButtonProps {
  text: string;
}

export function TopicButton({text = "Hello"}: TopicButtonProps) {
  return (
    <div>
      <button>{text}</button>
    </div>
  );
}

export default TopicButton;
