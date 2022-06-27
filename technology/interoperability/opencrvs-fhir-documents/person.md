# Person

### Requesting the FHIR Patient data for individiuals associated with the event

The [FHIR patient](https://www.hl7.org/fhir/patient.html) resource contains all names, addresses, contact details, gender details and other information. It also contains an array of identifiers for which the created National ID, alongside other IDs such as Social Security or Birth Registration Number can be stored.

For standardised addresses ie: states, districts and other administrative structure levels, configurable [FHIR Location](https://www.hl7.org/fhir/location.html) resources can be loaded into OpenCRVS and referred to by their resource `id` in the address. You can read more about [FHIR Locations](https://www.hl7.org/fhir/location.html) in later sections below.

**YOUR MEDIATOR MUST FOLLOW THE SECURITY GUIDANCE ABOVE, BEFORE PERMITTING ACCESS TO SENSITIVE, IDENTIFIABLE PATIENT DATA**

**URL**

You can request all resources via OpenHIM in subsequent individual requests following this example URL for a Patient, to retrieve the details of the mother. So the format is **your-openhim-core-url** / **resourceType** / **id** :

```
GET http://openhim-core:5001/fhir/Patient/0a92c057-e1a6-476f-918b-7e98cb7479b8
```

Created from the previous composition like this:

```
GET http://openhim-core:5001/fhir/<section[0].entry[0].reference>
```

**Request headers**

```
Content-Type: application/json
Authorization: Bearer <token>
```

**Patient payload**

```
{
  "resourceType": "Patient",
  "active": true,
  "id": "5e22eea3-2e61-4dc1-8047-e216b3334c2e",
  "identifier": [
    { "value": "123456789", "type": "NATIONAL_ID" },
    { "value": "123456789", "type": "SOCIAL_SECURITY_NO" }
  ],
  "name": [{ "use": "en", "given": ["Fahmida"], "family": ["Hossein"] }],
  "birthDate": "1971-10-23",
  "maritalStatus": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/StructureDefinition/marital-status",
        "code": "M"
      }
    ],
    "text": "MARRIED"
  },
  "extension": [
    {
      "url": "http://opencrvs.org/specs/extension/patient-occupation",
      "valueString": "Lawyer"
    },
    {
      "url": "http://hl7.org/fhir/StructureDefinition/patient-nationality",
      "extension": [
        {
          "url": "code",
          "valueCodeableConcept": {
            "coding": [{ "system": "urn:iso:std:iso:3166", "code": "ZMB" }]
          }
        },
        { "url": "period", "valuePeriod": { "start": "", "end": "" } }
      ]
    },
    {
      "url": "http://opencrvs.org/specs/extension/educational-attainment",
      "valueString": "PRIMARY_ISCED_1"
    }
  ],
  "address": [
    {
      "type": "PERMANENT",
      "line": [
        "40",
        "My street",
        "My residential area",
        "My city",
        "",
        "",
        "URBAN"
      ],
      "district": "6885f574-eb70-46dd-ab89-acc9982bd63e",
      "state": "cd5e34cb-abe0-4900-9509-28f378b8d8e8",
      "country": "ZMB"
    }
  ],
  "meta": {
    "lastUpdated": "2020-07-04T10:15:03.286+00:00",
    "versionId": "cf6bb775-f37e-43c5-ae16-a981a0c637d1"
  }
}
```

**Key payload parameters**

| Parameter       | Sample value                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `identifier`    | `[{ value: "123456789", type: "NATIONAL_ID" }]`                                                                                                          | An aray of identifiers for the patient.                                                                                                                                                                                                                                                                               |
| `name`          | `[{ "use": "en", "given": ["Fahmida"], "family": ["Hossein"] }]`                                                                                         | The `name` prop is extremely flexible for any language and name structure.                                                                                                                                                                                                                                            |
| `extension`     | `[{ "url": "http://hl7.org ... ", "extension": ["url": "code", "valueCodeableConcept": {}], "valueString": "" }]`                                        | Extensions are common in FHIR and refer to standardised codes, such as ICD codes, OpenCRVS concepts, or can be custom values.                                                                                                                                                                                         |
| `birthDate`     | `YYYY-MM-DD`                                                                                                                                             | The registered date of birth of the individual                                                                                                                                                                                                                                                                        |
| `maritalStatus` | `{"coding": [{"system": "http://hl7.org/fhir/StructureDefinition/marital-status","code": "M"}],"text": "MARRIED"}`                                       | The `maritalStatus` again is set using standardised codes browsable on the url supplied.                                                                                                                                                                                                                              |
| `address`       | `[{"type": "PERMANENT", line: [], "district": "6885f574-eb70-46dd-ab89-acc9982bd63e","state": "cd5e34cb-abe0-4900-9509-28f378b8d8e8","country": "ZMB"}]` | The `address` type can be `PERMANENT` and `CURRENT` both or either may be required depending on civil registration legislation in the country. Address lines, districts and states can be set to [FHIR Location](https://www.hl7.org/fhir/location.html) ids (explained below) to ensure statistical standardisation. |

**Identifier parameters**

| Identifier                  | Value      |
| --------------------------- | ---------- |
| `PASSPORT`                  | `PASSPORT` |
| `NATIONAL_ID`               | `PASSPORT` |
| `DRIVING_LICENSE`           | `PASSPORT` |
| `BIRTH_REGISTRATION_NUMBER` | `PASSPORT` |
| `DEATH_REGISTRATION_NUMBER` | `PASSPORT` |
| `REFUGEE_NUMBER`            | `PASSPORT` |
| `ALIEN_NUMBER`              | `PASSPORT` |
| `OTHER`                     | `PASSPORT` |
| `SOCIAL_SECURITY_NO`        | `PASSPORT` |

###
