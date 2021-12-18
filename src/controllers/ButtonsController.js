import { MessageActionRow, MessageButton } from 'discord.js'

import { client } from '..'
import { Capitalize } from '../utils/Capitalize'

const ButtonsController = (msg) => {
  const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('leo').setLabel('Leo').setStyle('PRIMARY'),
    new MessageButton()
      .setCustomId('76561198094036203')
      .setLabel('Neguim')
      .setStyle('PRIMARY'),
    new MessageButton()
      .setCustomId('leandro')
      .setLabel('Leandro')
      .setStyle('PRIMARY'),
    new MessageButton()
      .setCustomId('mattos')
      .setLabel('Mattos')
      .setStyle('PRIMARY')
  )

  msg.channel.send({ content: 'Escolha um jogador', components: [row] })

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton) {
      interaction.reply({
        content: `Irei buscar a última partida do ${Capitalize(
          interaction.customId
        )} 🙈🙊`,
      })
    }
  })
}

export default ButtonsController
