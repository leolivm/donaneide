import 'dotenv/config'
import { Client, Intents } from 'discord.js'

import SendGossipController from './controllers/SendGossipController'
import GetMatchesController from './controllers/GetMatchesController'
import config from './config'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', async () => {
  SendGossipController()

  const data = await GetMatchesController()

  console.log(data)
})

client.login(config.TOKEN)

export { client }
