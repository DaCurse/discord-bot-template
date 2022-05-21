import type { Awaitable, ClientEvents } from 'discord.js'
import { Collection } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import type { BotClient } from '../client'
import type { BotEvent, EventCallback, EventName } from './event'

export interface EventManagerOptions {
  allowedExtensions: string[]
}

export class EventManager {
  private static readonly defaultOptions: EventManagerOptions = {
    allowedExtensions: ['.js', '.ts'],
  }
  public readonly events: Collection<EventName, Set<BotEvent>> =
    new Collection()
  private readonly options: EventManagerOptions

  public constructor(options?: EventManagerOptions) {
    this.options = { ...new.target.defaultOptions, ...options }
  }

  public init(bot: BotClient) {
    for (const eventName of this.events.keys()) {
      bot.discordClient.on(
        eventName,
        this.eventCallback.bind(this, eventName, bot)
      )
    }
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
    const events = this.events.get(event)
    if (events) {
      events.add({ name: event, run: listener })
    } else {
      this.events.set(event, new Set([{ name: event, run: listener }]))
    }
    return this
  }

  public async loadEvents(path: string) {
    for (const file of await readdir(path)) {
      const isAllowedExtension = this.options.allowedExtensions.some(
        ext => ext.toLowerCase() === extname(file).toLowerCase()
      )
      if (!isAllowedExtension) continue

      const eventModule = await import(resolve(path, file))
      this.on(eventModule.event.name, eventModule.event.run)
    }
  }

  private eventCallback(name: EventName, bot: BotClient, ...args: any[]) {
    const events = this.events.get(name)
    if (!events) return
    for (const event of events) {
      event.run.apply(null, [bot, ...args])
    }
  }
}
