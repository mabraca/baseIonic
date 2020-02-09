# Test


## Providers

The Super Starter comes with some basic implementations of common providers.

### User

The `User` provider is used to authenticate users through its
`login(accountInfo)` and `signup(accountInfo)` methods, which perform `POST`
requests to an API endpoint.

### Api

The `Api` provider is a simple CRUD frontend to an API (get/post/put/patch/delete)
