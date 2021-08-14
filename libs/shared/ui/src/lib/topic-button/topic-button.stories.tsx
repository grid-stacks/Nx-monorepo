import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions"
import { TopicButton, TopicButtonProps } from './topic-button';

export default {
  component: TopicButton,
  title: 'TopicButton',
  argTypes: { handleClick: { action: 'clicked' } },
} as Meta;

const Template: Story<TopicButtonProps> = (args) => <TopicButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Hello",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Hello",
  handleClick: action('secondary clicked')
};
