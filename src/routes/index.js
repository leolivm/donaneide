import { Router } from 'express'

import GetMatchesController from '../bot/controllers/GetMatchesController'

const routes = Router()

const getMatchesController = new GetMatchesController()

routes.use('/', getMatchesController.create)

export default routes
