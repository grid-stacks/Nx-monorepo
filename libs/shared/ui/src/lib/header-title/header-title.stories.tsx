import { Story, Meta } from '@storybook/react';
import { HeaderTitle, HeaderTitleProps } from './header-title';

export default {
  component: HeaderTitle,
  title: 'HeaderTitle',
} as Meta;

const Template: Story<HeaderTitleProps> = (args) => <HeaderTitle {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
