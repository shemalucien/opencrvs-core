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

| Parameter                            | Description                                                                                                                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationName`                      | Must be "searchEvents"                                                                                                                                                                         |
| `query`                              | Use the exhaustive GraphQL syntax supplied or remove individual return parameters if you do not require that citizen information.  **Protect citizen's privacy!  Only request what you need.** |
| `variables.advancedSearchParameters` | A JSON object of optional search parameters listed below                                                                                                                                       |
| `count`                              | The number of records to be returned per page                                                                                                                                                  |
| `skip`                               | Pagination offset                                                                                                                                                                              |



**GraphQL variables.advancedSearchParameters object**

We recommend that you use the Advanced Search feature in the OpenCRVS application and monitor the GraphQL payload that is sent to the Gateway using the Chrome Developer Tools "Network" tab, in order to understand how these parameters are formatted.  The table below lists all possible parameters with a description and example where we feel further explanation is helpful.

| Parameter                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `event`                     | An enum for the registration event.  Can be "birth" or "death"                                                                                                                                                                                                                                                                                                                                                                                                                                           | `birth`                                                                     |
| `name`                      | A string that can be used to search ALL names.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                             |
| `registrationStatuses`      | An array of possible application status enums.  [Possible statuses ](https://github.com/opencrvs/opencrvs-core/blob/7ae67062bba97313584ebe33515533627ca95a79/packages/client/src/utils/gateway.ts#L1819)                                                                                                                                                                                                                                                                                                 | `["IN_PROGRESS", "REGISTERED"]`                                             |
| `dateOfEvent`               | The date of event.  YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <pre class="language-json"><code class="lang-json">2022-12-31
</code></pre> |
| `dateOfEventStart`          | If you dont know the date of event, you can enter a start and end date to search within a range.  YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                             |                                                                             |
| `dateOfEventEnd`            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| `contactNumber`             | The informant's mobile phone number with country code                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                             |
| `nationalId`                | Any national id associated with any individual who has been involved in a registration event as a string                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| `registrationNumber`        | An event registration number as a string                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| `trackingId`                | An application tracking id as a string                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                             |
| `dateOfRegistration`        | The date of registration.  YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                             |
| `dateOfRegistrationStart`   | If you dont know the date of registration, you can enter a start and end date to search within a range.  YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                      |                                                                             |
| `dateOfRegistrationEnd`     | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| `declarationLocationId`     | A FHIR Location uuid for the **a registration office.** You can search all registrations that were made in an office.  You retrieve these ids using our open [Location API](location-api.md). Your offices are customised for your country needs in [this step.](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.3-set-up-cr-offices-and-health-facilities/)                                                                                                                   | `031dc5a6-ea63-47e6-a818-191cc12a9b92`                                      |
| `declarationJurisdictionId` | A FHIR Location uuid for the **immediate administrative level parent, such as a district or state, that the office is partOf.** You can retrieve these ids using our open [Location API](location-api.md). Your offices are customised for your country needs in [this step.](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.3-set-up-cr-offices-and-health-facilities/)                                                                                                      | `031dc5a6-ea63-47e6-a818-191cc12a9b92`                                      |
| `eventLocationId`           | When searching by the hospital location in which an event took place, this is a FHIR Location uuid for a **facility that is already in the OpenCRVS database to track places of births or deaths in health institutions.** You can retrieve these ids using our open [Location API](location-api.md). Your health facilities are customised for your country needs in [this step.](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.3-set-up-cr-offices-and-health-facilities/) | `031dc5a6-ea63-47e6-a818-191cc12a9b92`                                      |
| `eventCountry`              | When searching for the administrative location in which an event took place e.g. place of birth, then this is an [alpha 3 country code ](https://www.iban.com/country-codes)for the country.                                                                                                                                                                                                                                                                                                             |                                                                             |
| eventLocationLevel1         | When searching for the administrative location in which an event took place e.g. place of birth, then this is a FHIR Location uuid for the **locationLevel1 if applicable, technically expressed in FHIR as a "state".** You can retrieve these ids using our open [Location API](location-api.md).  Your location levels are customised for your country needs in [this step](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.2-set-up-administrative-address-divisions/).    | `031dc5a6-ea63-47e6-a818-191cc12a9b92`                                      |
| eventLocationLevel2         | When searching for the administrative location in which an event took place e.g. place of birth, then this is a FHIR Location uuid for the **locationLevel2 if applicable, technically expressed in FHIR as a "district".** You can retrieve these ids using our open [Location API](location-api.md).  Your location levels are customised for your country needs in [this step](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.2-set-up-administrative-address-divisions/). | `031dc5a6-ea63-47e6-a818-191cc12a9b92`                                      |
| eventLocationLevel3         | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| eventLocationLevel4         | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| eventLocationLevel5         | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| childFirstNames             | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| childLastName               | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| childDoB                    | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| childDoBStart               | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| childDoBEnd                 | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| childGender                 | A string. Can be "male", "female" or "unknown"                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                             |
| deceasedFirstNames          | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| deceasedFamilyName          | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| deceasedGender              | A string. Can be "male", "female" or "unknown"                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                             |
| deceasedDoB                 | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| deceasedDoBStart            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| deceasedDoBEnd              | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| deceasedIdentifier          | A string used to search by National ID, or event registration number such as BRN / DRN                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                             |
| motherFirstNames            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| motherFamilyName            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| motherDoB                   | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| motherDoBStart              | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| motherDoBEnd                | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| motherIdentifier            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| fatherFirstNames            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| fatherFamilyName            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| fatherDoB                   | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| fatherDoBStart              | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| fatherDoBEnd                | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| fatherIdentifier            | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| informantFirstNames         | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| informantFamilyName         | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| informantDoB                | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| informantDoBStart           | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| informantDoBEnd             | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |
| informantIdentifier         | As above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                             |



**Record Search Response**

The response from a record search is not FHIR, but an Elasticsearch response.  The audit experience is explained below the example payload.

```
{
  "data": {
    "searchEvents": {
      "totalItems": 3,
      "results": [
        {
          "id": "cb813494-9339-48dd-85a1-156278436f30",
          "type": "Birth",
          "registration": {
            "status": "CERTIFIED",
            "contactNumber": "+260760001907",
            "trackingId": "BHKTHM7",
            "registrationNumber": "2023BHKTHM7",
            "registeredLocationId": "712502d2-5ea2-49d9-86df-a7d61f3f351f",
            "duplicates": null,
            "assignment": null,
            "createdAt": "1673047650433",
            "modifiedAt": null,
            "__typename": "RegistrationSearchSet"
          },
          "operationHistories": [ ... ],
          "dateOfBirth": "2022-10-26",
          "childName": [
            {
              "firstNames": "Santiago",
              "familyName": "Schmeler",
              "use": "en",
              "__typename": "HumanName"
            },
            {
              "firstNames": "",
              "familyName": null,
              "use": "fr",
              "__typename": "HumanName"
            }
          ],
          "__typename": "BirthEventSearchSet"
        },
        {
          "id": "b2fd5270-49c1-4227-8625-d874b6eef25d",
          "type": "Birth",
          "registration": {
            "status": "CERTIFIED",
            "contactNumber": "+260754288799",
            "trackingId": "BBPX0DM",
            "registrationNumber": "2023BBPX0DM",
            "registeredLocationId": "712502d2-5ea2-49d9-86df-a7d61f3f351f",
            "duplicates": null,
            "assignment": null,
            "createdAt": "1673048958068",
            "modifiedAt": null,
            "__typename": "RegistrationSearchSet"
          },
          "operationHistories": [ ... ],
          "dateOfBirth": "2022-08-31",
          "childName": [
            {
              "firstNames": "Price",
              "familyName": "Lind",
              "use": "en",
              "__typename": "HumanName"
            },
            {
              "firstNames": "",
              "familyName": null,
              "use": "fr",
              "__typename": "HumanName"
            }
          ],
          "__typename": "BirthEventSearchSet"
        },
        {
          "id": "a7c641cb-9671-4715-a1a4-ecee08def9b0",
          "type": "Birth",
          "registration": {
            "status": "CERTIFIED",
            "contactNumber": "+260751978586",
            "trackingId": "BXZJNML",
            "registrationNumber": "2023BXZJNML",
            "registeredLocationId": "712502d2-5ea2-49d9-86df-a7d61f3f351f",
            "duplicates": null,
            "assignment": null,
            "createdAt": "1673062235276",
            "modifiedAt": null,
            "__typename": "RegistrationSearchSet"
          },
          "operationHistories": [ ... ],
          "dateOfBirth": "2021-12-11",
          "childName": [
            {
              "firstNames": "Nash",
              "familyName": "Cruickshank",
              "use": "en",
              "__typename": "HumanName"
            },
            {
              "firstNames": "",
              "familyName": null,
              "use": "fr",
              "__typename": "HumanName"
            }
          ],
          "__typename": "BirthEventSearchSet"
        }
      ],
      "__typename": "EventSearchResultSet"
    }
  }
}
```

After a search has completed and if you search for any record returned, you will see that in Record Audit, an entry shows that this client has accessed the personally identifiable citizen data on the record.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-16 at 11.49.25.png" alt=""><figcaption></figcaption></figure>
