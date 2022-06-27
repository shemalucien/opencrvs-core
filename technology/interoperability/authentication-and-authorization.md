# Authentication and authorization

You can either use the OpenHIM GUI to create an exposed channel and configure authentication using [OpenHIM documentation](http://openhim.org/docs/configuration/authentication), or alternatively your mediator can be registered as an authorized system client.

To set up a system client with the right permissions there is no GUI, your system administrator is required to:

1. SSH into the OpenCRVS manager node and register a new system client. Described below.
2. Securely host the system `client_id`, `client_secret` and `sha_secret`, returned in the registration process, as environment variables or secrets that your mediator or webhook subscriber service has secure access to.

Your mediator microservice is then required to:

1. Authenticate and request an access token. Described below.
2. Develop a mediator or webhook subscriber to perform your required business functions. We expose some OpenCRVS events as Webhooks which can be a good way to interact immediately if the supported events are of interest to you.

#### Register a system client

Using a valid National System Administrator JWT token returned during OpenCRVS client authentication, SSH into your manager instance and run the following commands to register a new client.

Find a running auth service Docker container ID. NOTE: You may need to connect to a worker node if auth is not running on the manager.

```
docker ps -a
```

```
docker exec <Insert auth service container id on node> \
wget -S --header="Authorization: Bearer <Insert your valid system administrator JWT here>" \
--header='Accept-Charset: UTF-8' --header='Content-Type: application/json' \
--post-data ‘{"scope":"NATIONAL_ID"}' \
-O - http://user-mgnt:3030/registerSystemClient
```

**Request payload**

Example json

```
{
    "scope": "NATIONAL_ID",
}
```

| Parameter | Sample value  | Description                                                                                                                                               |
| --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scope`   | `NATIONAL_ID` | <p>Available integration scopes currently include: <strong>NATIONAL_ID</strong> </p><p><strong>HEALTH</strong>  <strong>EXTERNAL_VALIDATION</strong>.</p> |

#### **Request Response**

The command will return the following details:

```
{
    "client_id": "2fd153ab-86c8-45fb-990d-721140e46061",
    "client_secret": "8636abe2-affb-4238-8bff-200ed3652d1e",
    "sha_secret": "d04aec67-1ef4-467a-a5a8-fa5c89ad71ce"
}
```

These are your authentication, and webhook payload verification details for your API and should be stored securely in line with your organisation's security policies and never exposed in code repositories.

| Parameter       | Sample value                           | Description                                                                  |
| --------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| `client_id`     | `2fd153ab-86c8-45fb-990d-721140e46061` | The client id used in the authentication process for system clients.         |
| `client_secret` | `8636abe2-affb-4238-8bff-200ed3652d1e` | The client secret used in the authentication process for system clients.     |
| `sha_secret`    | `d04aec67-1ef4-467a-a5a8-fa5c89ad71ce` | The **SHA1** signature used when verifying that a webhook payload is genuine |

#### Deactivate a system client

Using a valid system administrator JWT token returned during OpenCRVS client authentication, SSH into your manager instance and run the following commands to deactivate an existing client:

Find a running auth service Docker container ID. NOTE: You may need to connect to a worker node if auth is not running on the manager.

```
docker ps -a
```

Run the following command replacing the client\_id with the client\_id you wish to deactivate. You can browse the **user-mgnt > systems** collection in Mongo to find the client details.

```
docker exec <Insert auth service container id on node> \
wget -S --header="Authorization: Bearer <Insert your valid JWT here>" \
--header='Accept-Charset: UTF-8' --header='Content-Type: application/json' \
--post-data '{"client_id":"2fd153ab-86c8-45fb-990d-721140e46061"}' \
-O - http://user-mgnt:3030/deactivateSystemClient
```

#### Reactivate a deactivated system client

Using a valid system administrator JWT token returned during OpenCRVS client authentication, SSH into your manager instance and run the following commands to reactivate a previously deactivated client:

Find a running auth service Docker container ID. NOTE: You may need to connect to a worker node if auth is not running on the manager.

```
docker ps -a
```

Run the following command replacing the client\_id with the client\_id you wish to reactivate. You can browse the **user-mgnt > systems** collection in Mongo to find the client details.

```
docker exec <Insert auth service container id on node> \
wget -S --header="Authorization: Bearer <Insert your valid JWT here>" \
--header='Accept-Charset: UTF-8' --header='Content-Type: application/json' \
--post-data '{"client_id":"2fd153ab-86c8-45fb-990d-721140e46061"}' \
-O - http://user-mgnt:3030/reactivateSystemClient
```

#### Request an access token

**URL**

```
POST https://auth.<your-open-crvs-host.com>/authenticateSystemClient
```

#### **Request payload**

Example json

```
{
    "client_id": "2fd153ab-86c8-45fb-990d-721140e46061",
    "client_secret": "8636abe2-affb-4238-8bff-200ed3652d1e"
}
```

| Parameter       | Sample value                           | Description                                                              |
| --------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| `client_id`     | `2fd153ab-86c8-45fb-990d-721140e46061` | The client id used in the authentication process for system clients.     |
| `client_secret` | `8636abe2-affb-4238-8bff-200ed3652d1e` | The client secret used in the authentication process for system clients. |

#### **Request Response**

```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6Ikp...",
}
```

The token is a [JWT](https://jwt.io/) containing with the following structure and must be included as an `Authorization: Bearer <token>` in all future requests:

#### **Token Header**

| Parameter | Sample value | Description                 |
| --------- | ------------ | --------------------------- |
| `alg`     | `RS256`      | Signing algorithm.          |
| `typ`     | `JWT`        | This value is always `JWT`. |

#### **Token Payload**

| Parameter | Sample value                 | Description                                                                                                                                                                                                                                |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `scope`   | `['health']`                 | An array of OpenCRVS roles for authorization permissions to access. These are defined as a feature of the OpenCRVS core. Approved scopes are `health`, `nationalId`, `ageCheck`. If you require a new scope, please open a feature request |
| `iat`     | `1593712289`                 | When the JWT was created.                                                                                                                                                                                                                  |
| `exp`     | `1594317089`                 | When the JWT expires - For System clients this is set to 10 minutes by default, but this is configurable in the resources package.                                                                                                         |
| `aud`     | `['opencrvs.auth']`          | An array of services that will respond to this JWT.                                                                                                                                                                                        |
| `iss`     | `'opencrvs.auth'`            | The issuing service of the JWT.                                                                                                                                                                                                            |
| `sub`     | `'5ee75eb2104ccf88d9ac0c3d'` | Equal to the user or system id.                                                                                                                                                                                                            |
