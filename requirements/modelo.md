# Título

> ## Caso de sucesso

1. ✅ Valida se a requisição foi feita por um **usuário**
1. - [x] Recebe uma requisição do tipo **POST** na rota **/api/open-account**

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
1. - [x] Recebe uma requisição do tipo **POST** na rota **/api/open-account**

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
        [ ] usecase-repository-i
        - infra.repository-implementation
          [ ] usecase-repository-mongo
          [ ] usecase-repository-sql   
      - user-interface
          - Api.Controllers
              - controller-name           
                    [ ] controller
                    [ ] controller tests                    
                  - infra.factories
                    [ ] controller-factory
                    [ ] validation factory
                    [ ] validation factory test       