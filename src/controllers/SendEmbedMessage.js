import { MessageEmbed } from 'discord.js'

const SendEmbedMessage = (matches, channel) => {
  matches.map((item) => {
    const embed = new MessageEmbed()
      .setColor(`${item.win ? '#00B13E' : '#DD0000'}`)
      .setTitle(`${item.name}`)
      .setAuthor(
        `${item.win ? 'ZΓ© fofoquinha news π' : 'ZΓ© fofoquinha news ππ'}`
      )
      .setDescription(
        `${item.win ? 'ganhou β' : 'PERDEUUUU que peninha π€£ β'}`
      )
      .setThumbnail(
        'https://gartic.com.br/imgs/mural/su/supersiniistro/dota2.png'
      )
      .addFields(
        {
          name: !item.win
            ? item.deaths > 15
              ? `${item.kills}/leo`
              : 'kkkkkkkkkk'
            : 'ebaa',
          value: !item.win
            ? item.deaths >= 15
              ? '***LEOZOU......***'
              : 'rsrsrs'
            : 'ππ»',
        },
        {
          name: `${item.kills}/${item.deaths}/${item.assists}`,
          value: 'de frag',
        },
        {
          name: `${item.hero}`,
          value: 'herΓ³i',
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
