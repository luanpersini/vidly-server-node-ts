# Add Genre

Create and persist a new **genre**.

## Success

1. - [ ] Receive a **POST** request on route **/api/add-genre**
2. - [ ] **Check** if there is already an genre with the given name
3. - [ ] Create the new **genre** 
4. - [ ] Return **200** with the created genre data
<br/>

## Exceptions

1. - [ ] Return error **404** if the api dosent exist
2. - [ ] Return error **403** if there is already an genre with the given name 
3. - [ ] Return error **500** if something fail while trying to create the new genre

- infra
  - Server
    - config
      - routes
        [x] component-name  
- core
  - components
    - component-name
      - domain
        [x] models (entities, aggregates e value objects)
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