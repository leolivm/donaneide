import { MessageEmbed } from 'discord.js'

const SendEmbedMessage = (matches, channel) => {
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
            item.deaths > 10 ? (item.deaths > 15 ? 'LEOZOU' : 'rsrsrs') : '👍🏻',
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
}

export default SendEmbedMessage
