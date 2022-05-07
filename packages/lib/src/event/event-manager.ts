import type { Client } from 'discord.js'
import { Collection } from 'discord.js'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { BotClient } from '../client'
import type { BotEvent, EventName } from './event'

export class EventManager {
  public readonly events: Collection<EventName, Set<BotEvent>> =
    new Collection()

  public constructor(private readonly client: Client) {
    this.client = client
  }

  public init(bot: BotClient) {
    for (const eventName of this.events.keys()) {
      console.log(eventName)
      this.client.on(eventName, this.eventCallback.bind(this, eventName, bot))
    }
  }

  public async loadEvents(path: string) {
    const files = await readdir(path)
    for (const file of files) {
      if (!file.endsWith('.js')) continue
      const eventModule = await import(resolve(path, file))
      this.registerEvent(eventModule.event)
    }
  }

  public registerEvent(event: BotEvent<EventName>) {
    const events = this.events.get(event.name)
    if (events) {
      events.add(event)
    } else {
      this.events.set(event.name, new Set([event]))
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
