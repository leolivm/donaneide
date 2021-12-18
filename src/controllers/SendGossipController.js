import config from '../config'
import { client } from '..'
import { gossipMessages } from '../views/gossipMessages'

const SendGossipController = () => {
  client.channels.fetch(config.CHANNEL).then((channel) => {
    const randomMessage = Math.floor(Math.random() * gossipMessages.length)

    channel.send(gossipMessages[randomMessage])
  })

  setTimeout(SendGossipController, config.time)
}

export default SendGossipController
