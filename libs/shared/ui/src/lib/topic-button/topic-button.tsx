import { HTMLAttributes, ReactNode } from 'react';
import './topic-button.module.css';

/* eslint-disable-next-line */
export interface TopicButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "primary" | "secondary";
  handleClick: () => void;
  disabled?: boolean;
}

export function TopicButton({children, variant, handleClick, disabled = false}: TopicButtonProps) {
  return (
    <div>
      <button onClick={handleClick} disabled={disabled}>{children}</button> <span>{variant}</span>
    </div>
  );
}

export default TopicButton;
