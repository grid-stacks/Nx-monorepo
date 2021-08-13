import { HTMLAttributes, ReactNode } from 'react';
import './topic-button.module.css';

/* eslint-disable-next-line */
export interface TopicButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "primary" | "secondary";
  handleClick: () => void;
}

export function TopicButton({children, variant, handleClick}: TopicButtonProps) {
  return (
    <div>
      <button onClick={handleClick}>{children}</button> <span>{variant}</span>
    </div>
  );
}

export default TopicButton;
