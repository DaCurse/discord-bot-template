import type { BotEvent } from 'lib'

export const event: BotEvent<'ready'> = {
  name: 'ready',
  async run(bot) {
    console.log('ready', bot.discordClient.user.tag)
  },
}
