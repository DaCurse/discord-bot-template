import { createEvent } from 'lib'

export const event = createEvent('ready', (bot, client) => {
  console.log(client.user.tag)
})
