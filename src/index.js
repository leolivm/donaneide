import 'dotenv/config'
import { Client, Intents } from 'discord.js'

import SendGossipController from './controllers/SendGossipController'
import GetMatchesController from './controllers/GetMatchesController'
import SendEmbedMessage from './controllers/SendEmbedMessage'
import ButtonsController from './controllers/ButtonsController'

import config from './config'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', async () => {
  SendGossipController()

  const matches = await GetMatchesController()

  client.channels.fetch(config.CHANNEL).then((channel) => {
    SendEmbedMessage(matches, channel)
  })
})

client.on('messageCreate', (msg) => {
  if (msg.content.startsWith('!')) {
    if (msg.content.substring(1) === 'fofoquinha') {
      ButtonsController(msg)
    }
  }
})

client.login(config.TOKEN)

export { client }
