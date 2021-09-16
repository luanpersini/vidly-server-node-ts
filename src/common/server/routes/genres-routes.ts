import { Router } from 'express'
import { makeAddGenreController } from '@genres/user-interface.api.controllers/add-genre/infra.add-genre-controller-factory'
import { routeAdapter } from '@/infra/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/add-genre', routeAdapter(makeAddGenreController()))
}
