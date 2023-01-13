---
description: >-
  Perform an advanced search of civil registration records from a trusted,
  external e-Gov service
---

# Record Search clients

The Record Search client can perform an advanced search of civil registration records.  Use this to help support social protection systems, check the existence of civil registration records or check citizen demographics.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 17.17.45.png" alt=""><figcaption></figcaption></figure>

To stop abuse of such a powerful API, all results returned are audited as having been downloaded by the client.  System Administrators should be careful to ensure that citizen data is not exposed to untrustworthy individuals by using this API. &#x20;

{% hint style="danger" %}
All client behaviour is audited and is ultimately the personal responsibility of the National System Administrator of OpenCRVS that created the client.  Protect citizen data and do not expose it unnecessarily as you may be in breach of local laws.
{% endhint %}

{% hint style="info" %}
A daily limit of 2000 Record Search requests per client, per day is hardcoded into OpenCRVS Core.  Any subsequent requests will fail.
{% endhint %}

{% hint style="info" %}
You can use our [Postman collections](https://github.com/opencrvs/opencrvs-farajaland/tree/master/postman) to test Record Search API functionality. [Postman](https://www.postman.com/) is a tool you can download to test API access before building your integrations.
{% endhint %}



**Submitting a Record Search**

To submit an Record Search, your client must first request an [authorization token ](authentication-and-authorization.md)using your `client_id` and `client_secret`.



#### Record Search Requests

With the token as an authorization header, the following example request will submit a record search in GraphQL. GraphQL is the chosen protocol as this API re-uses the same **Advanced Search** GraphQL queries that are used buy the OpenCRVS GUI.

{% hint style="info" %}
You can browse to the [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/) using an authorization header to view the full documentation for the searchEvents GraphQL query.

https://gateway.your\_domain/graphql
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 17.33.01.png" alt=""><figcaption><p>The GraphQL Playground for OpenCRVS</p></figcaption></figure>

The GraphQL parameters are explained below. A full list of available Advanced Search GraphQL variables is also explained below.

```
POST https://gateway.<your_domain>/graphql
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "operationName": "searchEvents",
  "query": "query searchEvents($advancedSearchParameters: AdvancedSearchParametersInput!, $sort: String, $count: Int, $skip: Int) {\nsearchEvents(\n  advancedSearchParameters: $advancedSearchParameters\n  sort: $sort\n  count: $count\n  skip: $skip\n) {\n  totalItems\n  results {\n    id\n    type\n    registration {\n      status\n      contactNumber\n      trackingId\n      registrationNumber\n      registeredLocationId\n      duplicates\n      assignment {\n        userId\n        firstName\n        lastName\n        officeName\n        __typename\n      }\n      createdAt\n      modifiedAt\n      __typename\n    }\n    operationHistories {\n      operationType\n      operatedOn\n      operatorRole\n      operatorName {\n        firstNames\n        familyName\n        use\n        __typename\n      }\n      operatorOfficeName\n      operatorOfficeAlias\n      notificationFacilityName\n      notificationFacilityAlias\n      rejectReason\n      rejectComment\n      __typename\n    }\n    ... on BirthEventSearchSet {\n      dateOfBirth\n      childName {\n        firstNames\n        familyName\n        use\n        __typename\n      }\n      __typename\n    }\n    ... on DeathEventSearchSet {\n      dateOfDeath\n      deceasedName {\n        firstNames\n        familyName\n        use\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}}",  
  "variables": {"advancedSearchParameters": {
      "event": "birth",
      "registrationStatuses": ["REGISTERED"],
      "childGender": "male",
      "dateOfRegistrationEnd": "2022-12-31T23:59:59.999Z",
      "dateOfRegistrationStart": "2021-11-01T00:00:00.000Z",
      "declarationJurisdictionId": "576uyegf7 .... ", // A FHIR Location ID for an admin level
      "eventLocationId": "aaabuifr87h ...", // A FHIR Location ID for a health facility where the birth or death took place
      "fatherFirstNames": "Dad",
      "motherFirstNames": "Mom"
    },
    "count": 10,
    "skip": 0
  }
}

```

****

**GraphQL Parameters**

| Parameter                            | Description                                                                                                                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationName`                      | Must be "searchEvents"                                                                                                                                                                         |
| `query`                              | Use the exhaustive GraphQL syntax supplied or remove individual return parameters if you do not require that citizen information.  **Protect citizen's privacy!  Only request what you need.** |
| `variables.advancedSearchParameters` | A JSON object of optional search parameters listed below                                                                                                                                       |
| `count`                              | The number of records to be returned per page                                                                                                                                                  |
| `skip`                               | Pagination offset                                                                                                                                                                              |

****

**GraphQL variables.advancedSearchParameters object**

We recommend that you use the Advanced Search feature in the OpenCRVS application and monitor the GraphQL payload that is sent to the Gateway using the Chrome Developer Tools "Network" tab, in order to understand how these parameters are formatted.  The table below lists all possible parameters with a description and example where we feel further explanation is helpful.

| Parameter                 | Description                                                                                                                                                                                              | Example                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `event`                   | An enum for the registration event.  Can be "birth" or "death"                                                                                                                                           | `birth`                                                                     |
| `name`                    | A string that can be used to search ALL names.                                                                                                                                                           |                                                                             |
| `registrationStatuses`    | An array of possible application status enums.  [Possible statuses ](https://github.com/opencrvs/opencrvs-core/blob/7ae67062bba97313584ebe33515533627ca95a79/packages/client/src/utils/gateway.ts#L1819) | `["IN_PROGRESS", "REGISTERED"]`                                             |
| `dateOfEvent`             | The date of event.  YYYY-MM-DD                                                                                                                                                                           | <pre class="language-json"><code class="lang-json">2022-12-31
</code></pre> |
| `dateOfEventStart`        | If you dont know the date of event, you can enter a start and end date to search within a range.  YYYY-MM-DD                                                                                             |                                                                             |
| `dateOfEventEnd`          | As above                                                                                                                                                                                                 |                                                                             |
| `contactNumber`           | The informant's mobile phone number with country code                                                                                                                                                    |                                                                             |
| nationalId                | Any national id associated with any individual who has been involved in a registration event as a string                                                                                                 |                                                                             |
| registrationNumber        | An event registration number as a string                                                                                                                                                                 |                                                                             |
| trackingId                | An application tracking id as a string                                                                                                                                                                   |                                                                             |
| dateOfRegistration        | The date of registration.  YYYY-MM-DD                                                                                                                                                                    |                                                                             |
| `dateOfRegistrationStart` | If you dont know the date of registration, you can enter a start and end date to search within a range.  YYYY-MM-DD                                                                                      |                                                                             |
| `dateOfRegistrationEnd`   | As above                                                                                                                                                                                                 |                                                                             |
| declarationLocationId     |                                                                                                                                                                                                          |                                                                             |
| declarationJurisdictionId |                                                                                                                                                                                                          |                                                                             |
| eventLocationId           |                                                                                                                                                                                                          |                                                                             |
| eventCountry              |                                                                                                                                                                                                          |                                                                             |
| eventLocationLevel1       |                                                                                                                                                                                                          |                                                                             |
| eventLocationLevel2       |                                                                                                                                                                                                          |                                                                             |
| eventLocationLevel3       |                                                                                                                                                                                                          |                                                                             |
| eventLocationLevel4       |                                                                                                                                                                                                          |                                                                             |
| eventLocationLevel5       |                                                                                                                                                                                                          |                                                                             |
| childFirstNames           |                                                                                                                                                                                                          |                                                                             |
| childLastName             |                                                                                                                                                                                                          |                                                                             |
| childDoB                  |                                                                                                                                                                                                          |                                                                             |
| childDoBStart             |                                                                                                                                                                                                          |                                                                             |
| childDoBEnd               |                                                                                                                                                                                                          |                                                                             |
| childGender               |                                                                                                                                                                                                          |                                                                             |
| deceasedFirstNames        |                                                                                                                                                                                                          |                                                                             |
| deceasedFamilyName        |                                                                                                                                                                                                          |                                                                             |
| deceasedGender            |                                                                                                                                                                                                          |                                                                             |
| deceasedDoB               |                                                                                                                                                                                                          |                                                                             |
| deceasedDoBStart          |                                                                                                                                                                                                          |                                                                             |
| deceasedDoBEnd            |                                                                                                                                                                                                          |                                                                             |

Record Search Response
