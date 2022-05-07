import type { ClientEvents } from 'discord.js'
import type { BotClient } from '../client'

export type EventName = string | symbol

export type EventCallback<TEvent extends EventName = EventName> =
  TEvent extends keyof ClientEvents
    ? (bot: BotClient, ...args: ClientEvents[TEvent]) => void
    : (bot: BotClient, ...args: any[]) => void

export interface BotEvent<TEvent extends EventName = EventName> {
  name: TEvent
  run: EventCallback<TEvent>
}

export function createEvent<TEvent extends EventName>(
  name: TEvent,
  run: EventCallback<TEvent>
): BotEvent<TEvent> {
  return { name, run }
}
