import { Client, Intents } from 'discord.js'

import config from '../config'
import SendGossipController from './controllers/SendGossipController'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', () => {
  SendGossipController()
})

client.login(config.TOKEN)

export { client }
