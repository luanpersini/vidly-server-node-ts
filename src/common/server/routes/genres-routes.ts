import { AddGenreController } from '@/core/components/genres/user-interface/ui.api.controllers/add-genre/add-genre-controller'
import { Router } from 'express'
import { routeAdapter } from '@/infra/adapters/express-route-adapter'

const controller = new AddGenreController()
export default (router: Router): void => {
  router.get('/add-genre', routeAdapter(controller))
}
