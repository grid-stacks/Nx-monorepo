import { Story, Meta } from '@storybook/react';
import { InputControl, InputControlProps } from './input-control';

export default {
  component: InputControl,
  title: 'InputControl',
} as Meta;

const Template: Story<InputControlProps> = (args) => <InputControl {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
