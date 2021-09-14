# Add Genre

Create and persist a new **genre**.

## Success

1. - [ ] Receive a **POST** request on route **/api/add-genre**
2. - [ ] **Validate** the requested data
3. - [ ] Create the new **genre** 
4. - [ ] Return **Ok** with the created genre data
<br/>

## Exceptions

1. - [ ] Return **NotFound** if the api dosent exist
2. - [ ] Return **BadRequest** if validation returns an error
3. - [ ] Return **Forbidden** if there is already an genre with the given name 
4. - [ ] Return **Unexpected Error** if something fail while trying to create the new genre

- infra
  - Server
    - config
      - routes
        [x] component-name  
        [ ] component-name integration test
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
          [x] component-repository-mongo     
          [ ] component-repository-mongo test     
      - user-interface
          - Api.Controllers
              - controller-name           
                    [x] controller
                    [x] controller test                    
                  - infra.factories
                    [ ] controller-factory
                    [ ] validationSchema inside controller-factory                     