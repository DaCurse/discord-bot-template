import type { Client } from 'discord.js'
import type { EventManager } from '../event'

export class BotClient {
  constructor(
    public readonly discordClient: Client<true>,
    public readonly events: EventManager
  ) {
    this.discordClient = discordClient
    this.events = events
  }

  public async init(token?: string) {
    this.events.init(this)
    await this.discordClient.login(token)
  }
}
