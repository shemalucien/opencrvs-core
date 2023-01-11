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

**GraphQL Parameters**

| Parameter       | Description                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationName` | Must be "searchEvents"                                                                                                                                                                         |
| `query`         | Use the exhaustive GraphQL syntax supplied or remove individual return parameters if you do not require that citizen information.  **Protect citizen's privacy!  Only request what you need.** |
| `variables`     | A JSON object of optional GraphQL variables listed below                                                                                                                                       |
| `count`         | The number of records to be returned per page                                                                                                                                                  |
| `skip`          | Pagination offset                                                                                                                                                                              |

Advanced Search variables



Record Search Response
