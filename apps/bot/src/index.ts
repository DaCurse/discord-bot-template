import { Client } from 'discord.js'
import dotenv from 'dotenv'
import { BotClient, EventManager } from 'lib'
import path from 'node:path'

dotenv.config()

const client = new Client({ intents: [] })

async function bootstrap() {
  const eventManager = new EventManager()
  const bot = new BotClient(client, eventManager)
  await bot.events.loadEvents(path.join(__dirname, 'events'))
  await bot.init(process.env.DISCORD_TOKEN)
}

bootstrap()
