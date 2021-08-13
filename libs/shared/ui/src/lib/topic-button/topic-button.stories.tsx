import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions"
import { TopicButton, TopicButtonProps } from './topic-button';

export default {
  component: TopicButton,
  title: 'TopicButton',
  argTypes: { handleClick: { action: 'clicked' } },
} as Meta;

const PrimaryTemplate: Story<TopicButtonProps> = (args) => <TopicButton {...args} />;
export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  variant: "primary",
  children: "Hello",
};

const SecondaryTemplate: Story<TopicButtonProps> = (args) => <TopicButton {...args} />;
export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Hello",
  handleClick: action('secondary clicked')
};
