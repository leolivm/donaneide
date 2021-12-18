import axios from 'axios'
import { isYesterday, format } from 'date-fns'

import config from '../config'
import heroes from '../database/heroes'
import playersList from '../database/playersList'

import { Capitalize } from '../utils/Capitalize'

const GetMatchesController = async () => {
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
      `http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=${config.STEAM_KEY}&account_id=${item.account_id}&matches_requested=2`
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
            ...data.result,
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

  const formattedPlayers = matchResponseReduced.map((item) => {
    // const yesterday = isYesterday(item.start_time * 1000)

    // if (yesterday) {
    const findedPlayers = item.players.map((player) => {
      if (
        String(player.account_id) === item.account_id &&
        item.game_mode === 22
      ) {
        const final = item.picks_bans.map((pick) => {
          if (player.hero_id === pick.hero_id) {
            const findHero = heroes.map((hero) => {
              if (hero.id === pick.hero_id) return hero.name
            })

            const filteredHeroes = findHero.filter((hero) => {
              return hero !== undefined
            })

            return {
              name: item.name,
              win: item.radiant_win ? (pick.team === 0 ? true : false) : true,
              kills: player.kills,
              deaths: player.deaths,
              assists: player.assists,
              hero: Capitalize(filteredHeroes[0].replaceAll('_', ' ')),
              date: format(item.start_time * 1000, 'dd/MM/yyyy'),
            }
          }
        })

        const filteredFinal = final.filter((filtered) => {
          return filtered !== undefined
        })

        return filteredFinal
      }
    })

    const findedPlayersReduced = findedPlayers.reduce(
      (acc, curVal) => acc.concat(curVal),
      []
    )

    return findedPlayersReduced
    // }
  })

  const filteredPlayersReduced = formattedPlayers.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  )

  const filteredPlayers = filteredPlayersReduced.filter((item) => {
    return item !== undefined
  })

  return filteredPlayers
}

export default GetMatchesController
