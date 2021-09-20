# Load Genres

Load all persisted **genres**.

## Success

1. - [x] Receive a **GET** request on route **/api/load-genres**
2. - [x] Return **Ok** with the genres data
<br/>

## Exceptions

1. - [x] Return **Unexpected Error** if something fails while trying to create the new genre

- infra
  - Server
    - config
      - routes
        [x] component-name  
        [x] component-name integration test
- core
  - components
    - component-name
      - domain
        [x] models (entities, aggregates e value objects)        
      - usecase-name
        [x] usecase interface
        [x] usecase implementation
        [x] usecase test
        [x] infra.usecase-name.factory
      - repositories
        [x] component-repository-i
        - infra.repository-implementation
          [x] component-mongo-repository     
          [x] component-mongo-repository test     
      - user-interface
          - Api.Controllers
              - controller-name           
                    [x] controller
                    [x] controller test                    
                  - infra.factories
                    [x] controller-factory                 