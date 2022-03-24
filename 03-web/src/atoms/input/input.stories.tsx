import { ComponentMeta, ComponentStory } from '@storybook/react'

import Input from '.'

export default {
  title: 'Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Input',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Input',
  disabled: true,
}

export const Required = Template.bind({})
Required.args = {
  label: 'Input',
  required: true,
  error: 'This field is required',
}

export const WithMask = Template.bind({})
WithMask.args = {
  label: 'Input',
  pattern: '\d{2}/\d{2}/\d{4}',
  inputMode: 'numeric',
  mask: (value) =>
    value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
}
