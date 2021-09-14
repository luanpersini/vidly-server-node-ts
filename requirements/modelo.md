# Título

> ## Caso de sucesso
✅ ⛔️
1. - [ ] Receive a **POST** request on route **/api/add-genre**

> ## Exceções

1. - [ ] Return **BadRequest** if validation returns an error

- infra
  - Server
    - config
      - routes
        [ ] component-name  
- core
  - components
    - component-name
      - domain
        [ ] models (entities, aggregates e value objects)
        [ ] services
      - usecase-name
        [ ] usecase interface
        [ ] usecase implementation
        [ ] usecase test
        [ ] infra.usecase-name.factory
      - repositories
        [ ] component-repository-i
        - infra.repository-implementation
          [ ] component-repository-mongo
          [ ] component-repository-sql    
      - user-interface.api.controllers
              - controller-name           
                    [ ] controller
                    [ ] controller test              
                  - infra.factories
                    [ ] controller-factory
                    [ ] validation factory
                    [ ] validation factory test       