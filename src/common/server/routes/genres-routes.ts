import { AddGenreController } from '@genres/user-interface.api.controllers/add-genre/add-genre-controller'
import { Router } from 'express'
import { makeAddGenreController } from '@/core/components/genres/user-interface.api.controllers/add-genre/infra.factories/add-genre-controller-factory'
import { routeAdapter } from '@/infra/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/add-genre', routeAdapter(makeAddGenreController()))
}
