import type { Awaitable, Client, ClientEvents } from 'discord.js'
import type { EventCallback, EventManager } from '../event'

export class BotClient {
  constructor(
    public readonly discordClient: Client,
    private readonly eventManager: EventManager
  ) {
    this.discordClient = discordClient
    this.eventManager = eventManager
  }

  public init(token?: string) {
    this.eventManager.init(this)
    this.discordClient.login(token)
  }

  public on<TEvent extends string | symbol>(
    event: Exclude<TEvent, keyof ClientEvents>,
    listener: EventCallback
  ): this
  public on<TEvent extends keyof ClientEvents>(
    event: TEvent,
    listener: EventCallback<TEvent>
  ): this

  public on(
    event: string | symbol,
    listener: (...args: any[]) => Awaitable<void>
  ) {
    this.eventManager.registerEvent({ name: event, run: listener })
    return this
  }
}
