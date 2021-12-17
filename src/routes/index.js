import { Router } from 'express'
import axios from 'axios'

import config from '../config'

const routes = Router()

routes.use('/', async (req, res) => {
  const { data } = await axios.get(
    `https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v001/?key=${config.STEAM_KEY}&match_id=6320609816`
  )

  return res.json({ data })
})

export default routes
