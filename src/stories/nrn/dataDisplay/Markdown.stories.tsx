import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Markdown, { Props } from '@/common/components/dataDisplay/Markdown';

export default {
  title: 'Next Right Now/Data display/Markdown',
  component: Markdown,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  const { text } = props;

  return (
    <Markdown {...props}>
      {text}
    </Markdown>
  );
};

export const DynamicExample: Story<Props> = Template.bind({});
DynamicExample.args = {
  text: `
# This is a Markdown component

You can use it to build content using Markdown.

**Awesome markdown** we love it!

> It's easy to write content using _markdown_.

---

# Using markdownOptions.disableParsingRawHTML = true

You can even use <Tooltip text="React components are whitelisted in Markdown.tsx"><Btn mode="primary-reverse" isTransparent="true">*whitelisted*</Btn></Tooltip> React components here!

<Tooltip text="I don't do anything but I'm pretty, am I not? You need to write custom components when using buttons, because you can't write JS inside Markdown (e.g: SendEmail)"><Btn>A themed button</Btn></Tooltip>
`,
  markdownOptions: {
    disableParsingRawHTML: false,
  },
};
