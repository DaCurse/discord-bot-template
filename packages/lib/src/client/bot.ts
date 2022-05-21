import type { Client } from 'discord.js'
import { EventManager } from '../event'

export class BotClient {
  public readonly events: EventManager

  constructor(public readonly discordClient: Client<true>) {
    this.discordClient = discordClient
    this.events = new EventManager()
  }

  public async init(token?: string) {
    this.events.init(this)
    await this.discordClient.login(token)
  }
}
