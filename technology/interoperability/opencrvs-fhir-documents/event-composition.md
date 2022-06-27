# Event Composition

The FHIR Composition id is a powerful identifier and should only be accessible by approved government systems, such as those using `health` or `nationalId` JWT scopes. If you are proposing a new webhook in a feature request, consider the `resourceType` that your service requires, based on the explanation of the FHIR resources in the rest of this page. You should not need to expose the composition id in your mediator if your client service doesnt require it.

The FHIR Composition id is a powerful identifier and should only be accessible by approved government systems, such as those using `health` or `nationalId` JWT scopes. If you are proposing a new webhook in a feature request, consider the `resourceType` that your service requires, based on the explanation of the FHIR resources in the rest of this page. You should not need to expose the composition id in your mediator if your client service doesnt require it.

| Parameter             | Sample value                           | Description                                                                                                                                                                                               |
| --------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target.id`           | `bab755e0-7bbd-4d90-b155-352ffa283467` | The unique `id` for the [FHIR resource](https://www.hl7.org/fhir/resource.html) target that this webhook refers to.                                                                                       |
| `target.resourceType` | `Composition`                          | The [FHIR resource](https://www.hl7.org/fhir/resource.html) type associated with the target `id` of this webhook, e.g. `Composition` for a [FHIR Composition](https://www.hl7.org/fhir/composition.html). |

#### **URL**

You can request the composition payload via the OpenHIM core using an [authentication token](https://github.com/opencrvs/opencrvs.github.io/blob/master/website/docs/technology/technicalInteroperability) and Composition `id`.

```
GET http://openhim-core:5001/fhir/Composition/<target.id>
```

NOTE: If the webhook returned a different resourceType, you could do this:

```
GET http://openhim-core:5001/fhir/<target.resourceType>/<target.id>
```

#### **Request headers**

```
Content-Type: application/json
Authorization: Bearer <token>
```

#### **Composition payload**

```
{
  "identifier": { "system": "urn:ietf:rfc:3986", "value": "BKBQMCD" },
  "resourceType": "Composition",
  "status": "preliminary",
  "type": {
    "coding": [
      { "system": "http://opencrvs.org/doc-types", "code": "birth-application" }
    ],
    "text": "Birth Application"
  },
  "class": {
    "coding": [
      { "system": "http://opencrvs.org/doc-classes", "code": "crvs-document" }
    ],
    "text": "CRVS Document"
  },
  "title": "Birth Application",
  "section": [
    {
      "title": "Birth encounter",
      "code": {
        "coding": [
          {
            "system": "http://opencrvs.org/specs/sections",
            "code": "birth-encounter"
          }
        ],
        "text": "Birth encounter"
      },
      "entry": [
        { "reference": "Encounter/af7be33b-3e0c-4012-b894-c32d4bcc5100" }
      ]
    },
    {
      "title": "Child details",
      "code": {
        "coding": [
          {
            "system": "http://opencrvs.org/doc-sections",
            "code": "child-details"
          }
        ],
        "text": "Child details"
      },
      "entry": [{ "reference": "Patient/0a92c057-e1a6-476f-918b-7e98cb7479b8" }]
    },
    {
      "title": "Mother's details",
      "code": {
        "coding": [
          {
            "system": "http://opencrvs.org/doc-sections",
            "code": "mother-details"
          }
        ],
        "text": "Mother's details"
      },
      "entry": [{ "reference": "Patient/5e22eea3-2e61-4dc1-8047-e216b3334c2e" }]
    },
    {
      "title": "Father's details",
      "code": {
        "coding": [
          {
            "system": "http://opencrvs.org/doc-sections",
            "code": "father-details"
          }
        ],
        "text": "Father's details"
      },
      "entry": [{ "reference": "Patient/5e22eea3-2e61-4dc1-8047-e216b3334c2e" }]
    },
     {
        "title": "Informant's details",
        "code": {
            "coding": {
            "system": "http://opencrvs.org/specs/sections",
            "code": "informant-details"
            },
            "text": "Informant's details"
        },
        "text": "",
        "entry": [
            {
            "reference": "Patient/47a090fa-e7bf-457f-98a6-8f2eb60fef32"
            }
        ]
    },
    {
        "title": "Supporting documents",
        "code": {
            "coding": {
            "system": "http://opencrvs.org/specs/sections",
            "code": "supporting-documents"
            },
            "text": "Supporting documents"
        },
        "text": "",
        "entry": [
            {
            "reference": "DocumentReference/11d2b8fc-f875-49cc-96e6-2447ebfc8fc6"
            }
        ]
    },
    {
        "title": "Certificates",
        "code": {
            "coding": {
            "system": "http://opencrvs.org/specs/sections",
            "code": "certificates"
            },
            "text": "Certificates"
        },
        "text": "",
        "entry": [
            {
            "reference": "DocumentReference/301ef878-1f94-4979-b660-7ad926dd1941"
            }
        ]
    }

  ],
  "subject": {},
  "date": "2020-07-02T15:28:34.813Z",
  "author": [],
  "meta": {
    "lastUpdated": "2020-07-02T15:28:35.392+00:00",
    "versionId": "de12d2df-fac3-4f84-bc85-b665ba12b02f"
  },
  "id": "bab755e0-7bbd-4d90-b155-352ffa283467"
}
```

#### **Key payload parameters**

| Parameter          | Sample value                           | Description                                                                                                                                                                                                                                             |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `bab755e0-7bbd-4d90-b155-352ffa283467` | The unique `id` for the [FHIR Composition](https://www.hl7.org/fhir/composition.html).                                                                                                                                                                  |
| `identifier.value` | `BKBQMCD`                              | The customer facing OpenCRVS `tracking id` for the event application.                                                                                                                                                                                   |
| `resourceType`     | `Composition`                          | The [FHIR resource](https://www.hl7.org/fhir/resource.html) type associated.                                                                                                                                                                            |
| `section`          | `[{ ... code.coding[0].code }]`        | An array of [FHIR Composition sections](https://www.hl7.org/fhir/composition-definitions.html#Composition.section) that can be filtered by code to find the appropriate resource entry [reference](https://www.hl7.org/fhir/references.html#Reference). |

The relevant birth registration composition section codes are:

| Section                | Code                   | Entry [reference](https://www.hl7.org/fhir/references.html#Reference)                                                                                                                                   |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Encounter`            | `birth-encounter`      | The [FHIR encounter](https://www.hl7.org/fhir/encounter.html) is a resource encompassing the lifecycle of the event registration process                                                                |
| `Child`                | `child-details`        | The [FHIR patient](https://www.hl7.org/fhir/patient.html) resource for the child                                                                                                                        |
| `Mother`               | `mother-details`       | The [FHIR patient](https://www.hl7.org/fhir/patient.html) resource for the mother                                                                                                                       |
| `Father`               | `father-details`       | The [FHIR patient](https://www.hl7.org/fhir/patient.html) resource for the father                                                                                                                       |
| `Informant`            | `informant-details`    | The [FHIR patient](https://www.hl7.org/fhir/patient.html) resource for the informant - in case the child was registered by someone other than a parent such as a legal guardian, or a self-registration |
| `Supporting documents` | `supporting-documents` | An array of [FHIR DocumentReference](https://www.hl7.org/fhir/documentreference.html) resources for all the uploaded supporting documents to validate the registration                                  |
| `Certificates`         | `certificates`         | An array of [FHIR DocumentReference](https://www.hl7.org/fhir/documentreference.html) resources for all birth certificates generated and printed                                                        |

###
