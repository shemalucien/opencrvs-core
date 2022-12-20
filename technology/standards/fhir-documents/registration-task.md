# Registration Task

### Requesting FHIR Task for a birth event containing the Birth Registration Number

The FHIR Task [FHIR Bundle](https://www.hl7.org/fhir/bundle.html) contains valuable audit information regarding the event. It contains the generated **Birth Registration Number** from the event which is later saved into the Patient's identifiers.

#### **URL**

To request the FHIR Task [FHIR Bundle](https://www.hl7.org/fhir/bundle.html) associated with the event use the Composition `id`:

```
http://localhost:3447/fhir/Task?focus=Composition/bab755e0-7bbd-4d90-b155-352ffa283467
```

#### **Request headers**

```
Content-Type: application/json
Authorization: Bearer <token>
```

Multiple FHIR task Resources are returned in a [FHIR Bundle](https://www.hl7.org/fhir/bundle.html) containing an `entry` array.

#### **Task payload**

```
{
  "resourceType": "Bundle",
  "id": "f249714e-006a-49ca-82d4-5ff4e4dbbd79",
  "meta": { "lastUpdated": "2020-07-04T11:32:45.914+00:00" },
  "type": "searchset",
  "total": 1,
  "link": [
    {
      "relation": "self",
      "url": "http://localhost:3447/fhir/Task?focus=Composition/bab755e0-7bbd-4d90-b155-352ffa283467"
    }
  ],
  "entry": [
    {
      "fullUrl": "http://localhost:3447/fhir/Task/b4ff04b3-7ba2-4d8f-8c8b-757f7153eb11/_history/eb02643d-f3e2-44c8-a295-c0727764a5ce",
      "resource": {
        "resourceType": "Task",
        "status": "requested",
        "code": {
          "coding": [
            { "system": "http://opencrvs.org/specs/types", "code": "BIRTH" }
          ]
        },
        "focus": {
          "reference": "Composition/bab755e0-7bbd-4d90-b155-352ffa283467"
        },
        "id": "b4ff04b3-7ba2-4d8f-8c8b-757f7153eb11",
        "identifier": [
          {
            "system": "http://opencrvs.org/specs/id/draft-id",
            "value": "bab755e0-7bbd-4d90-b155-352ffa283467"
          },
          {
            "system": "http://opencrvs.org/specs/id/birth-tracking-id",
            "value": "BKXA8V2"
          },
          {
            "system": "http://opencrvs.org/specs/id/birth-registration-number",
            "value": "2020BKXA8V2"
          }
        ],
        "extension": [
          {
            "url": "http://opencrvs.org/specs/extension/contact-person",
            "valueString": "FATHER"
          },
          {
            "url": "http://opencrvs.org/specs/extension/contact-relationship",
            "valueString": ""
          },
          {
            "url": "http://opencrvs.org/specs/extension/contact-person-phone-number",
            "valueString": "+260734576343"
          },
          {
            "url": "http://opencrvs.org/specs/extension/timeLoggedMS",
            "valueInteger": 490
          },
          {
            "url": "http://opencrvs.org/specs/extension/regLastLocation",
            "valueReference": {
              "reference": "Location/43f37076-bf0e-46c6-97cb-4c2bd12dbdac"
            }
          },
          {
            "url": "http://opencrvs.org/specs/extension/regLastOffice",
            "valueReference": {
              "reference": "Location/531e9275-40e4-4ab5-a12c-6fa74d7b5b61"
            }
          },
          {
            "url": "http://opencrvs.org/specs/extension/regLastUser",
            "valueReference": {
              "reference": "Practitioner/23919090-f59c-4185-b256-69faf8b519d5"
            }
          }
        ],
        "lastModified": "2020-07-04T10:15:03.225Z",
        "businessStatus": {
          "coding": [
            {
              "system": "http://opencrvs.org/specs/reg-status",
              "code": "REGISTERED"
            }
          ]
        },
        "meta": {
          "lastUpdated": "2020-07-04T10:15:03.420+00:00",
          "versionId": "eb02643d-f3e2-44c8-a295-c0727764a5ce"
        }
      },
      "request": {
        "method": "PUT",
        "url": "Task/b4ff04b3-7ba2-4d8f-8c8b-757f7153eb11"
      }
    }
  ]
}
```

#### **Key bundle entries**

| Entry            | Sample value                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `identifier`     | `[{"system": "http://opencrvs.org/specs/id/birth-registration-number","value": "2020BKXA8V2"}]`                  | The Birth Registration Number.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `extension`      | `[{"url": "http://opencrvs.org/specs/extension/contact-person-phone-number","valueString": "+260734576343"} ...` | The extensions contain contact details for the event. `regLastLocation` contains a [FHIR Location](https://www.hl7.org/fhir/location.html) reference for the administrative area where the birth was registered. `regLastOffice` contains a [FHIR Location](https://www.hl7.org/fhir/location.html) reference for the civil registration office where the birth was registered. `regLastUser` contains a FHIR Practitioner reference for the civil registration officer who registered the event. |
| `businessStatus` | `{"coding": [{"system": "http://opencrvs.org/specs/reg-status","code": "REGISTERED"}]}`                          | The `businessStatus` code will be either `REGISTERED` or `CERTIFIED` for a valid registration.                                                                                                                                                                                                                                                                                                                                                                                                    |

###
