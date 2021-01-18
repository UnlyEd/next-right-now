import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import LegalContent, { Props } from '@/common/components/dataDisplay/LegalContent';

export default {
  title: 'Next Right Now/Layout/LegalContent',
  component: LegalContent,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  const { content } = props;

  return (
    <LegalContent {...props}>
      {content}
    </LegalContent>
  );
};

export const DynamicExample: Story<Props> = Template.bind({});
DynamicExample.args = {
  content: `# This is a legal content component

You can use it to build pages (terms, privacy, etc.) using Markdown.

**Awesome markdown** we love it!

> It's easy to write those pages using _markdown_.

---

You can even use <Tooltip text="React components are whitelisted in Markdown.tsx"><Btn mode="primary-reverse" isTransparent="true">*whitelisted*</Btn></Tooltip> React components here!

<Tooltip text="I don't do anything but I'm pretty, am I not? You need to write custom components when using buttons, because you can't write JS inside Markdown (e.g: SendEmail)"><Btn>A themed button</Btn></Tooltip>
`,
};
