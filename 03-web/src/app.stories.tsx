import { ComponentStory, ComponentMeta } from '@storybook/react'

import { App } from './app'

export default {
  title: 'App',
  component: App,
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => <App {...args} />

export const Default = Template.bind({})
