---
description: >-
  Submitting full or partial event applications into OpenCRVS from an external
  service such as a health institution or public portal.
---

# Event Notification clients

An Event Notification client can submit full or partial birth or death applications into an OpenCRVS' office "In Progress" or "Ready For Review" workqueue. Usually these clients are Hospitals, but technically these clients could be any system and the "Health system" label on the workqueue tab could be content managed accordingly.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 15.39.53.png" alt=""><figcaption><p>An Event Notification in the OpenCRVS In Progress view</p></figcaption></figure>

When Event Notifications are received in OpenCRVS, they are audited accordingly as being received from one of your automated clients.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 15.40.23.png" alt=""><figcaption><p>Record Audit view for an Event Notification</p></figcaption></figure>

{% hint style="info" %}
You can use our [Postman collections](https://github.com/opencrvs/opencrvs-farajaland/tree/master/postman) to test Event Notification API functionality. [Postman](https://www.postman.com/) is a tool you can download to test API access before building your integrations.
{% endhint %}



**Submitting an Event Notification**

To submit an Event Notification, your client must first request an [authorization token ](authentication-and-authorization.md)using your `client_id` and `client_secret`.



#### Event Notification Requests

With the token as an authorization header, the following request will submit a minimal birth declaration in [FHIR](https://www.hl7.org/fhir/overview.html).  To learn more about our FHIR standard, read the [standards](../standards/) section. &#x20;

Parameters in handlebars must be substituted with specific data that requires further explanation below.  Other data is given as an example, but you can refer to our [standards](../standards/) to set the values correctly depending on the birth or death.

Refer to our [Postman collections](https://github.com/opencrvs/opencrvs-farajaland/tree/master/postman) to see a payload for a full birth declaration, minimal and full death declaration.

```
  POST https://gateway.<your_domain>/notification
  Content-Type: application/json
  Authorization: Bearer {{token}}
  
  {
    "resourceType": "Bundle",
    "type": "document",
    "meta": {
        "lastUpdated": "2022-08-14T14:43:47.000Z"
    },
    "entry": [
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "identifier": {
                    "system": "urn:ietf:rfc:3986",
                    "value": "{{uuid}}"
                },
                "resourceType": "Composition",
                "status": "final",
                "type": {
                    "coding": [
                        {
                            "system": "http://opencrvs.org/doc-types",
                            "code": "birth-notification"
                        }
                    ],
                    "text": "Birth Notification"
                },
                "class": {
                    "coding": [
                        {
                            "system": "http://opencrvs.org/specs/classes",
                            "code": "crvs-document"
                        }
                    ],
                    "text": "CRVS Document"
                },
                "subject": {
                    "reference": "urn:uuid:{{uuid}}"
                },
                "date": "2022-08-14T14:43:47.000Z",
                "author": [],
                "title": "Birth Notification",
                "section": [
                    {
                        "title": "Child details",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://opencrvs.org/specs/sections",
                                    "code": "child-details"
                                }
                            ],
                            "text": "Child details"
                        },
                        "entry": [
                            {
                                "reference": "urn:uuid:{{uuid}}"
                            }
                        ]
                    },
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
                            {
                                "reference": "urn:uuid:{{uuid}}"
                            }
                        ]
                    },
                    {
                        "title": "Mother's details",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://opencrvs.org/specs/sections",
                                    "code": "mother-details"
                                }
                            ],
                            "text": "Mother's details"
                        },
                        "entry": [
                            {
                                "reference": "urn:uuid:{{uuid}}"
                            }
                        ]
                    },
                    {
                        "title": "Informant's details",
                        "code": {
                            "coding": [
                                {
                                    "system": "http://opencrvs.org/specs/sections",
                                    "code": "informant-details"
                                }
                            ],
                            "text": "Informant's details"
                        },
                        "entry": [
                            {
                                "reference": "urn:uuid:{{uuid}}"
                            }
                        ]
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
                        "entry": [
                            {
                                "reference": "urn:uuid:{{uuid}}"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Task",
                "status": "draft",
                "intent": "unknown",
                "identifier": [],
                "code": {
                    "coding": [
                        {
                            "system": "http://opencrvs.org/specs/types",
                            "code": "BIRTH"
                        }
                    ]
                },
                "focus": {
                    "reference": "urn:uuid:{{uuid}}"
                },
                "extension": [
                    {
                        "url": "http://opencrvs.org/specs/extension/contact-person",
                        "valueString": "MOTHER"
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/contact-person-phone-number",
                        "valueString": "+260759205190"
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/timeLoggedMS",
                        "valueInteger": 0
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/in-complete-fields",
                        "valueString": "N/A"
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/regLastLocation",
                        "valueReference": {
                            "reference": "Location/{{officeLocationId}}"
                        }
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/regLastOffice",
                        "valueReference": {
                            "reference": "Location/{{officeId}}"
                        }
                    }
                ]
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Patient",
                "active": true,
                "name": [
                    {
                        "use": "en",
                        "family": [
                            "Tatke"
                        ],
                        "given": [
                            "Harney"
                        ]
                    }
                ],
                "gender": "male",
                "birthDate": "2022-06-29",
                "deceasedBoolean": false,
                "multipleBirthBoolean": false
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Patient",
                "active": true,
                "identifier": [
                    {
                        "use": "official",
                        "type": "NATIONAL_ID",
                        "value": "3624667568"
                    }
                ],
                "name": [
                    {
                        "use": "en",
                        "family": [
                            "Ratke"
                        ],
                        "given": [
                            "Mom"
                        ]
                    }
                ],
                "gender": "female",
                "telecom": [
                    {
                        "use": "mobile",
                        "system": "phone",
                        "value": "+260759205190"
                    }
                ],
                "birthDate": "2002-06-29",
                "deceasedBoolean": false,
                "multipleBirthInteger": 2,
                "maritalStatus": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/StructureDefinition/marital-status",
                            "code": "M"
                        }
                    ],
                    "text": "MARRIED"
                },
                "address": [
                    {
                        "type": "PRIMARY_ADDRESS",
                        "line": [
                            "12",
                            "Usual Street",
                            "Usual Residental Area",
                            "",
                            "",
                            "URBAN"
                        ],
                        "city": "Meghanland",
                        "district": "{{districtId}}",
                        "state": "{{stateId}}",
                        "postalCode": "52275",
                        "country": "{{countryCode}}"
                    }
                ],
                "extension": [
                    {
                        "url": "http://opencrvs.org/specs/extension/patient-occupation",
                        "valueString": "Housewife"
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/patient-nationality",
                        "extension": [
                            {
                                "url": "code",
                                "valueCodeableConcept": {
                                    "coding": [
                                        {
                                            "system": "urn:iso:std:iso:3166",
                                            "code": "{{countryCode}}"
                                        }
                                    ]
                                }
                            },
                            {
                                "url": "period",
                                "valuePeriod": {
                                    "start": "",
                                    "end": ""
                                }
                            }
                        ]
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/educational-attainment",
                        "valueString": "POST_SECONDARY_ISCED_4"
                    }
                ]
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "RelatedPerson",
                "relationship": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype",
                            "code": "MOTHER"
                        }
                    ]
                },
                "patient": {
                    "reference": "urn:uuid:{{uuid}}"
                }
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Patient",
                "active": true,
                "identifier": [
                    {
                        "use": "official",
                        "type": "NATIONAL_ID",
                        "value": "6848901132"
                    }
                ],
                "name": [
                    {
                        "use": "en",
                        "family": [
                            "Ratke"
                        ],
                        "given": [
                            "Dad"
                        ]
                    }
                ],
                "gender": "male",
                "telecom": [
                    {
                        "use": "mobile",
                        "system": "phone",
                        "value": "+260759205190"
                    }
                ],
                "birthDate": "2002-06-29",
                "deceasedBoolean": false,
                "multipleBirthInteger": 2,
                "maritalStatus": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/StructureDefinition/marital-status",
                            "code": "M"
                        }
                    ],
                    "text": "MARRIED"
                },
                "address": [
                    {
                        "type": "PRIMARY_ADDRESS",
                        "line": [
                            "12",
                            "Usual Street",
                            "Usual Residental Area",
                            "",
                            "",
                            "URBAN"
                        ],
                        "city": "Madgeland",
                        "district": "{{districtId}}",
                        "state": "{{stateId}}",
                        "postalCode": "52275",
                        "country": "{{countryCode}}"
                    }
                ],
                "extension": [
                    {
                        "url": "http://opencrvs.org/specs/extension/patient-occupation",
                        "valueString": "Businessman"
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/patient-nationality",
                        "extension": [
                            {
                                "url": "code",
                                "valueCodeableConcept": {
                                    "coding": [
                                        {
                                            "system": "urn:iso:std:iso:3166",
                                            "code": "FAR"
                                        }
                                    ]
                                }
                            },
                            {
                                "url": "period",
                                "valuePeriod": {
                                    "start": "",
                                    "end": ""
                                }
                            }
                        ]
                    },
                    {
                        "url": "http://opencrvs.org/specs/extension/educational-attainment",
                        "valueString": "POST_SECONDARY_ISCED_4"
                    }
                ]
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Encounter",
                "status": "finished",
                "location": [
                    {
                        "location": {
                            "reference": "Location/{{facilityId}}"
                        }
                    }
                ]
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Observation",
                "status": "final",
                "context": {
                    "reference": "urn:uuid:{{uuid}}"
                },
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://hl7.org/fhir/observation-category",
                                "code": "procedure",
                                "display": "Procedure"
                            }
                        ]
                    }
                ],
                "code": {
                    "coding": [
                        {
                            "system": "http://loinc.org",
                            "code": "57722-1",
                            "display": "Birth plurality of Pregnancy"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": "SINGLE"
                }
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Observation",
                "status": "final",
                "context": {
                    "reference": "urn:uuid:{{uuid}}"
                },
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://hl7.org/fhir/observation-category",
                                "code": "vital-signs",
                                "display": "Vital Signs"
                            }
                        ]
                    }
                ],
                "code": {
                    "coding": [
                        {
                            "system": "http://loinc.org",
                            "code": "3141-9",
                            "display": "Body weight Measured"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 4,
                    "unit": "kg",
                    "system": "http://unitsofmeasure.org",
                    "code": "kg"
                }
            }
        },
        {
            "fullUrl": "urn:uuid:{{uuid}}",
            "resource": {
                "resourceType": "Observation",
                "status": "final",
                "context": {
                    "reference": "urn:uuid:{{uuid}}"
                },
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://hl7.org/fhir/observation-category",
                                "code": "procedure",
                                "display": "Procedure"
                            }
                        ]
                    }
                ],
                "code": {
                    "coding": [
                        {
                            "system": "http://loinc.org",
                            "code": "73764-3",
                            "display": "Birth attendant title"
                        }
                    ]
                },
                "valueString": "PHYSICIAN"
            }
        }
    ]
}
```

| Parameter                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <pre><code>token
</code></pre>            | An [authorization token](authentication-and-authorization.md)                                                                                                                                                                                                                                                                                                                                                                          |
| <pre><code>uuid
</code></pre>             | A random [universally unique identifier](https://en.wikipedia.org/wiki/Universally\_unique\_identifier)                                                                                                                                                                                                                                                                                                                                |
| <pre><code>officeId
</code></pre>         | A FHIR Location uuid for a **Civil Registration Office that you wish this notification to arrive in the jurisdiction / workqueue of**. You can retrieve these ids using our open [Location API](fhir-location-rest-api.md).  Your offices are customised for your country needs in [this step.](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.3-set-up-cr-offices-and-health-facilities/)                  |
| <pre><code>officeLocationId
</code></pre> | A FHIR Location uuid for the **immediate administrative level parent, such as a district or state, that the office is partOf.** You can retrieve these ids using our open [Location API](fhir-location-rest-api.md). Your offices are customised for your country needs in [this step.](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.3-set-up-cr-offices-and-health-facilities/)                          |
| <pre><code>districtId
</code></pre>       | If you are submitting addresses, then this is an optional FHIR Location uuid for the **locationLevel2, technically expressed as a "district".** You can retrieve these ids using our open [Location API](fhir-location-rest-api.md).  Your location levels are customised for your country needs in [this step](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.2-set-up-administrative-address-divisions/). |
| <pre><code>stateId
</code></pre>          | If you are submitting addresses, then this is an optional FHIR Location uuid for the **locationLevel1, technically expressed as a "state".** You can retrieve these ids using our open [Location API](fhir-location-rest-api.md). Your location levels are customised for your country needs in [this step](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.2-set-up-administrative-address-divisions/).     |
| <pre><code>facilityId
</code></pre>       | A FHIR Location id for a **facility that is already in the OpenCRVS database to track places of births or deaths in health institutions.** You can retrieve these ids using our open [Location API](fhir-location-rest-api.md). Your health facilities are customised for your country needs in [this step.](../../setup/3.-installation/3.2-set-up-your-own-country-configuration/3.2.3-set-up-cr-offices-and-health-facilities/)     |
| <pre><code>countryCode
</code></pre>      | The [Alpha-3 country code](https://www.iban.com/country-codes) for the address. E.G. **UGD** for Uganda, **FAR** for our fictional country Farajaland.                                                                                                                                                                                                                                                                                 |



#### Event Notification Response

If the notification has been successfully processed by OpenCRVS, you will receive a **200 OK** response and the following payload back.  For each successfully saved FHIR resource, you will receive a location.

If the request fails, you will receive a **500** Error and you must check the payload you are sending for errors. &#x20;

```
{
    "resourceType": "Bundle",
    "entry": [
        {
            "response": {
                "status": "201",
                "location": "/fhir/Composition/727efd99-4b1a-4c67-8ae0-91003a09170d/_history/533ad880-ba9d-4426-9ad5-ab3ad79180d8"
            }
        },
        {
            "response": {
                "status": "201",
                "location": "/fhir/Task/f444833b-4b96-44cb-bf9c-370ddaa411ed/_history/be3b22f6-97eb-4aac-bee9-bb8bd8ce57aa"
            }
        },
        {
            "response": {
                "status": "201",
                "location": "/fhir/Patient/b85c716b-16b3-4d1f-93bf-d46f4182f9e3/_history/06e0e369-4f41-4c33-9cbb-56093ea9c135"
            }
        },
        {
            "response": {
                "status": "201",
                "location": "/fhir/Patient/c4e7ba36-36ad-4708-9925-6e5e00a140f8/_history/dece69d4-c4a7-4ebf-87f2-11e8f3862348"
            }
        },
        {
            "response": {
                "status": "201",
                "location": "/fhir/RelatedPerson/455517a9-ce05-404d-993d-1faaf852621c/_history/75d7b6b6-488e-48a9-87dc-29d21aca5735"
            }
        },
        {
            "response": {
                "status": "201",
                "location": "/fhir/Patient/bfa19fde-6305-441d-80c3-fcccb62e6cc4/_history/a80d5adc-2a2c-4c87-8bd5-69c35c2efdf3"
            }
        },
        {
            "response": {
                "status": "201",
                "location": "/fhir/Encounter/b644f0b7-1f49-4e0d-88b4-b4196ae65f65/_history/bde7a831-75a3-4456-9e32-af765bf14ad5"
            }
        }
    ],
    "type": "transaction-response"
}
```
