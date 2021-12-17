import axios from 'axios'

import config from '../../config'
import playersList from '../../database/playersList'

class GetMatchesController {
  async create(req, res) {
    const ids = playersList
      .map((item) => {
        return item.steam_id
      })
      .join(',')

    const steamProfileResponse = await axios.get(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.STEAM_KEY}&steamids=${ids}`
    )

    const namedPlayersList = steamProfileResponse.data.response.players.map(
      (item) => {
        const account_id = playersList.find(
          (element) => item.steamid === element.steam_id && element.account_id
        )

        return {
          name: item.personaname,
          steam_id: item.steamid,
          account_id: account_id.account_id,
        }
      }
    )

    const accountResponse = namedPlayersList.map(async (item) => {
      const { data } = await axios.get(
        `http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=${config.STEAM_KEY}&account_id=${item.account_id}&matches_requested=1`
      )

      if (data.result.statusDetail) return

      return { ...data.result, playerInfo: item }
    })

    const accountResponsePromise = await Promise.all(accountResponse)

    const matchResponse = accountResponsePromise.map(async (item) => {
      if (item !== undefined) {
        return await Promise.all(
          item.matches.map(async (match) => {
            const { data } = await axios.get(
              `https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v001/?key=${config.STEAM_KEY}&match_id=${match.match_id}`
            )

            return {
              info: data.result !== undefined && data.result,
              ...item.playerInfo,
            }
          })
        )
      }
    })

    const matchResponsePromise = await Promise.all(matchResponse)

    const matchResponseFilteredPromise = matchResponsePromise.filter(
      (item) => item !== undefined && { item }
    )

    const matchResponseReduced = matchResponseFilteredPromise.reduce(
      (acc, curVal) => acc.concat(curVal),
      []
    )

    return res.json(matchResponseReduced)
  }
}

export default GetMatchesController
