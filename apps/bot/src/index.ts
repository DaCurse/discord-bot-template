import { Client } from 'discord.js'
import dotenv from 'dotenv'
import { BotClient, EventManager } from 'lib'
import { readdirSync } from 'node:fs'
import path from 'node:path'

dotenv.config()

const client = new Client({ intents: [] })
const eventManager = new EventManager(client)
console.log(readdirSync(path.join(__dirname, 'events')))

async function bootstrap() {
  await eventManager.loadEvents(path.join(__dirname, 'events'))
  const bot = new BotClient(client, eventManager)
  bot.init(process.env.DISCORD_TOKEN)
}

bootstrap()
