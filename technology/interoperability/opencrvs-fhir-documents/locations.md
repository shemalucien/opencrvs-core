# Locations

### Getting the location data for FHIR Locations

You will find many [FHIR Location](https://www.hl7.org/fhir/location.html) ids throughout the resources, such as place of birth, patient addresses, places of registration etc. These return [FHIR Location](https://www.hl7.org/fhir/location.html) resources that refer either to either facilities with address and contact details, or administrative areas such as districts and states. [FHIR Locations](https://www.hl7.org/fhir/location.html) also contian multiple identifiers including an ID that should be defined by your government statistical department and aligns across all systems.

In OpenCRVS we extend [FHIR Locations](https://www.hl7.org/fhir/location.html) to include other statistical data related to calculating civil registration performance estimates such as the crude birth rate & populations for a location by year.

[FHIR Locations](https://www.hl7.org/fhir/location.html) are saved into OpenCRVS during configuration.

#### **URL**

```
GET http://openhim-core:5001/fhir/Location/43f37076-bf0e-46c6-97cb-4c2bd12dbdac
```

#### **Request headers**

```
Content-Type: application/json
Authorization: Bearer <token>
```

#### **Administrative area location payload, such as a state or district**

```
{
  "resourceType": "Location",
  "identifier": [
    {
      "system": "http://opencrvs.org/specs/id/statistical-code",
      "value": "ADMIN_STRUCTURE_QTtxiWj8ONP"
    },
    {
      "system": "http://opencrvs.org/specs/id/jurisdiction-type",
      "value": "DISTRICT"
    }
  ],
  "name": "Chembe District",
  "alias": ["Chembe District"],
  "description": "QTtxiWj8ONP",
  "status": "active",
  "mode": "instance",
  "partOf": { "reference": "Location/cd5e34cb-abe0-4900-9509-28f378b8d8e8" },
  "type": {
    "coding": [
      {
        "system": "http://opencrvs.org/specs/location-type",
        "code": "ADMIN_STRUCTURE"
      }
    ]
  },
  "physicalType": { "coding": [{ "code": "jdn", "display": "Jurisdiction" }] },
  "extension": [
    {
      "url": "http://hl7.org/fhir/StructureDefinition/location-boundary-geojson",
      "valueAttachment": {
        "contentType": "application/geo+json",
        "data": "<base64>"
      }
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-male-populations',
      valueString:
        '[{"2007":"1292568"},{"2008":"1250993"},{"2009":"1246376"},{"2010":"1279752"},{"2011":"1293470"},{"2012":"1291684"},{"2013":"1756173"},{"2014":"1788473"},{"2015":"1167891"},{"2016":"1225971"},{"2017":"1159078"}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-female-populations',
      valueString:
        '[{"2007":"1261767"},{"2008":"1221096"},{"2009":"1214677"},{"2010":"1240638"},{"2011":"1257481"},{"2012":"1241730"},{"2013":"1724403"},{"2014":"1758485"},{"2015":"1151860"},{"2016":"1228886"},{"2017":"1168980"}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-total-populations',
      valueString:
        '[{"2007":"2554927"},{"2008":"2472586"},{"2009":"2461610"},{"2010":"2520874"},{"2011":"2551523"},{"2012":"2533688"},{"2013":"3480570"},{"2014":"3546954"},{"2015":"2319748"},{"2016":"2454857"},{"2017":"2328051"}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-male-female-ratios',
      valueString:
        '[{"2007":"102.4"},{"2008":"102.4"},{"2009":"102.6"},{"2010":"103.2"},{"2011":"102.9"},{"2012":"104"},{"2013":"101.8"},{"2014":"101.7"},{"2015":"101.4"},{"2016":"99.8"},{"2017":"99.2"}]'
    },
    {
      url: 'http://opencrvs.org/specs/id/statistics-crude-birth-rates',
      valueString:
        '[{"2007":"19.6"},{"2008":"19.4"},{"2009":"19"},{"2010":"18.5"},{"2011":"15.8"},{"2012":"20"},{"2013":"20.1"},{"2014":"18.7"},{"2015":"23.2"},{"2016":"19.1"},{"2017":"22.3"}]'
    }
  ],
  "meta": {
    "lastUpdated": "2020-06-15T11:42:03.726+00:00",
    "versionId": "688b4a56-b8a6-47c1-b635-91a501a58e39"
  },
  "id": "6885f574-eb70-46dd-ab89-acc9982bd63e"
}
```

#### **Facility location payload such as a civil registration office or hospital**

```
{
  "resourceType": "Location",
  "identifier": [
    {
      "system": "http://opencrvs.org/specs/id/internal-id",
      "value": "CRVS_OFFICE_o8B4Up9xxJI"
    }
  ],
  "name": "Lusaka DNRPC District Office",
  "alias": ["Lusaka DNRPC District Office"],
  "status": "active",
  "mode": "instance",
  "partOf": { "reference": "Location/43f37076-bf0e-46c6-97cb-4c2bd12dbdac" },
  "type": {
    "coding": [
      {
        "system": "http://opencrvs.org/specs/location-type",
        "code": "CRVS_OFFICE"
      }
    ]
  },
  "physicalType": { "coding": [{ "code": "bu", "display": "Building" }] },
  "telecom": [],
  "address": {
    "line": [],
    "district": "Lusaka District",
    "state": "Lusaka Province"
  },
  "meta": {
    "lastUpdated": "2020-06-15T11:42:09.114+00:00",
    "versionId": "0e9a6805-fdf7-453d-9473-d1eeb2d56ac0"
  },
  "id": "531e9275-40e4-4ab5-a12c-6fa74d7b5b61"
}
```

\
