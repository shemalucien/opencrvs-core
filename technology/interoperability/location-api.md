---
description: >-
  Create, read, update or archive administrative areas, civil registration
  offices or health facilities using FHIR.
---

# FHIR Location REST API

### Why use the FHIR Location REST API?



You need access to the FHIR Location API for 3 important reasons...

#### 1. Using the FHIR Location API for clients

This API will help you configure integrating clients to understand the relationship to places referenced by [FHIR Location](https://build.fhir.org/location.html) ids in payloads such as "Place of birth", "Place of registration", or "Jurisdiction" such as [Webhooks](webhooks.md) and [National ID](national-id-client.md) clients.

For an [Event Notification](event-notification-clients.md) client, you must submit the correct FHIR Location id for the health facility that OpenCRVS understands in order to correctly track the place of birth.

For a [Record Search](record-search-clients.md) client, you need the correct FHIR Location id when performing advanced searches depending on your parameters.

{% hint style="info" %}
All FHIR objects such as Location are ["FHIR Resources"](https://hl7.org/fhir/resource.html) and have a unique uuid: [**"id"**](https://hl7.org/fhir/resource-definitions.html#Resource.id) property that never changes.
{% endhint %}

**2. Changing administrative areas, civil registration offices or facilities**

During the configuration step of OpenCRVS you import all administrative areas, civil registration offices and health facilities in CSV files.  But over the years of operation, changes occur to your infrastructure and jurisdictional operations.&#x20;

Sometimes you may wish to add a new office or health facility.

Sometimes you may wish to change the name of an area or health facility.

Sometimes a location may no longer be in use and you want it to not appear as a valid place of birth or death, or a valid area in an address in new event declaration forms.

{% hint style="warning" %}
Note, in OpenCRVS a FHIR Location cannot be deleted entirely, only archived.  This is to protect the integrity of any older event registrations where the historical name of the facility or administrative area must be always remembered.  That can only be changed via the [correct record](../../product-specifications/core-functions/7.-correct-record.md) procedure.
{% endhint %}

**3. Updating population and crude-birth-rate statistics to power the registration "completion rate" performance**

During the configuration step of OpenCRVS you import all administrative areas with [statistics](../../product-specifications/core-functions/9.-vital-statistics-export.md) that are used to calculate changing [**completeness rates**](https://www.vitalstrategies.org/wp-content/uploads/Estimating-Completeness-of-Birth-and-Death-Registration.pdf) over time.  This calculation depends upon the yearly population of that area and its associated, and ever changing, "crude birth rate".  These values are collected by statistical departments in government.  To provide accurate performance analytics, the previous year's statistics should be added via this API on a yearly basis.



### Using the FHIR Location REST API

{% hint style="info" %}
You can use our [Postman collections](https://github.com/opencrvs/opencrvs-farajaland/tree/master/postman) to test FHIR Location API functionality. [Postman](https://www.postman.com/) is a tool you can download to test API access before building your integrations.
{% endhint %}

A simple test harness for the FHIR Location API is also available in [Swagger](https://swagger.io/) at the following URL:

```
https://gateway.<your-domain>/documentation
```

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-19 at 16.57.25.png" alt=""><figcaption></figcaption></figure>

#### Reading FHIR Locations

Send a **GET** request with **Content-Type: application/json** headers to:

<pre><code><strong>Get ALL locations:
</strong><strong>
</strong><strong>https://gateway.&#x3C;your-domain>/location
</strong>
or, get a single location:

https://gateway.&#x3C;your-domain>/location/{{FHIR Location id}}
</code></pre>

{% hint style="warning" %}
Getting all FHIR Locations or getting a single FHIR Location by its id, can be performed by any client, publicly on the internet with no authorization headers necessary.  If you wish to whitelist access for whatever reason, you can do so via Traefik in Docker compose files.
{% endhint %}

You can also use the FHIR API URL parameters to search using [**FHIR identifiers**](https://build.fhir.org/datatypes.html#Identifier) or other FHIR properties such as [**type**](https://build.fhir.org/datatypes-definitions.html#Identifier.type). &#x20;

By adding the FHIR **status=active** property, you can filter out any deactivated locations that are no longer in use.

```
Get ALL administrative areas by FHIR type and status:

location?type=ADMIN_STRUCTURE&_count=0&status=active

Get ALL office locations by FHIR type and status:

location?type=CRVS_OFFICE&_count=0&status=active

Get ALL health facilities by FHIR type and status:

location?type=HEALTH_FACILITY&_count=0&status=active

Get a single location by FHIR identifier:

https://gateway.<your-domain>/location?identifier=ADMIN_STRUCTURE_{{statisticalID}}
https://gateway.<your-domain>/location?identifier=HEALTH_FACILITY_{{statisticalID}}
https://gateway.<your-domain>/location?identifier=CRVS_OFFICE_{{statisticalID}}
```

{% hint style="info" %}
**statisticalID** is the **adminPCode** or **custom id** you set when importing administrative areas or facility CSVs respectively.  We call that a statisticalID because it is generally used by statistics departments in government as opposed to a FHIR id.
{% endhint %}



#### Authorization to create, update and archive a FHIR Location

{% hint style="danger" %}
Only a National System Administrator's JWT token can be used to perform these actions as they are potentially destructive and can affect business operations.  **An Interoperability client does not have permission.**
{% endhint %}

To retrieve a National System Administrators JWT token, login as the national system administrator.  In our example, this is the user **j.campbell**.

In **Chrome**, right click anywhere on the page, choose **"Inspect"**, and open **"Chrome Developer Tools."**

Open the **"Application"** tab and expand **"Local Storage"**.

The JWT is the value for the key **"opencrvs"**

**Double click inside the value** and type **Ctrl+A** to select all, then **Ctrl+C** to copy the JWT into your clipboard.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-19 at 17.41.39.png" alt=""><figcaption></figcaption></figure>

**Create a FHIR Location**

Send a **POST** request with **Content-Type: application/json** , and **Authorization: Bearer \<National System Administrators JWT>** headers to the following endpoint with the JSON payload appropriate to your location type:



**Administrative area**

```
POST https://gateway.<your_domain>/location
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "statisticalID": "TEST_LOCATION",
  "name": "My name",
  "alias": "My alias", // used for a different character set in localisation e.g. Arabic
  "partOf": "Location/0",
  "code": "ADMIN_STRUCTURE",
  "jurisdictionType": "STATE",
  "statistics": [
    {
      "year": 0,
      "male_population": 0,
      "female_population": 0,
      "population": 0,
      "crude_birth_rate": 0
    }
  ]
}

```

****

**Civil registration office**

```
POST https://gateway.<your_domain>/location
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "statisticalID": "TEST_OFFICE_LOCATION",
  "name": "My office",
  "alias": "My office alias", // used for a different character set in localisation e.g. Arabic
  "partOf": "Location/0",
  "code": "CRVS_OFFICE"
}

```



**Health facility**

```
POST https://gateway.<your_domain>/location
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "statisticalID": "TEST_HEALTH_LOCATION",
  "name": "My hospital",
  "alias": "My hospital alias", // used for a different character set in localisation e.g. Arabic
  "partOf": "Location/0",
  "code": "HEALTH_FACILITY"
}
```



**Update or Archive a FHIR Location**

Send a **PUT** request with **Content-Type: application/json** , and **Authorization: Bearer \<National System Administrators JWT>** headers to the following endpoint with the JSON payload appropriate to your location type:

{% hint style="info" %}
To archive a location, set the status prop to **"inactive"**
{% endhint %}

{% hint style="info" %}
To reinstate a location, set the status prop to **"active"**
{% endhint %}

**Administrative area**

```
PUT https://gateway.<your_domain>/location
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "name": "My new name",
  "alias": "My new alias",
  "status": "active",
  "statistics": 
    {
      "year": 0,
      "male_population": 0,
      "female_population": 0,
      "population": 0,
      "crude_birth_rate": 0
    }
  
}
```

**Civil registration office / Health facility**

```
PUT https://gateway.<your_domain>/location
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "name": "My new name",
  "alias": "My new alias",
  "status": "active"
}
```
