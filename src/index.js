import 'dotenv/config'
import { Client, Intents, MessageEmbed } from 'discord.js'

import SendGossipController from './controllers/SendGossipController'
import GetMatchesController from './controllers/GetMatchesController'
import config from './config'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', async () => {
  SendGossipController()

  const matches = await GetMatchesController()

  client.channels.fetch(config.CHANNEL).then((channel) => {
    matches.map((item) => {
      const embed = new MessageEmbed()
        .setColor(`${item.win ? '#00B13E' : '#DD0000'}`)
        .setTitle(`${item.name}`)
        .setAuthor(
          `${item.win ? 'Zé fofoquinha news 👀' : 'Zé fofoquinha news 👁👁'}`
        )
        .setDescription(
          `${item.win ? 'ganhou ✅' : 'PERDEUUUU que peninha 🤣 ❌'}`
        )
        .setThumbnail(
          'https://gartic.com.br/imgs/mural/su/supersiniistro/dota2.png'
        )
        .addFields(
          {
            name:
              item.deaths > 10
                ? item.deaths > 15
                  ? `${item.kills}/leo`
                  : 'kkkkkkkkkk'
                : 'ebaa',
            value:
              item.deaths > 10
                ? item.deaths > 15
                  ? 'LEOZOU'
                  : 'rsrsrs'
                : '👍🏻',
          },
          {
            name: `${item.kills}/${item.deaths}/${item.assists}`,
            value: 'de frag',
          },
          {
            name: `${item.hero}`,
            value: 'herói',
            inline: true,
          }
        )
        .setFooter(
          `${item.date}`,
          'https://gartic.com.br/imgs/mural/su/supersiniistro/dota2.png'
        )

      channel.send({ embeds: [embed] })
    })
  })
})

client.login(config.TOKEN)

export { client }
