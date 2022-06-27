# OpenCRVS FHIR Documents

At OpenCRVS we have utilised the data model standards of FHIR and extended upon them with extra codes and extensions to suit the Civil Registration context. When we were looking for a Civil Registration data standard, we were inspired by FHIR, specifically:&#x20;

The FHIR Patient model contains a structure that supports a person-centric  longitudinal record to be created tracking vital statistics and flexible data points such as HumanName (supporting every possible combination of given and family names)

FHIR Locations can cover administrative divisions as well as specific buildings where births and deaths occur, with an Address structure that can cater for structured and un-structured addresses. &#x20;

The FHIR Encounter marks an event interaction between a Patient and a Healthcare Practitioner where Observations are made. &#x20;

FHIR Documents can be used for required supporting document attachments

Tasks can be created to audit interactions. &#x20;

The FHIR Document Bundle allows a system to request all of these connected documents into a single Document.

It seemed to us to be a small conceptual leap to equate these healthcare intended use-cases of FHIR to the civil registration context.  Essentially we could equate Patient to Person, Healthcare Practitioner to a Civil Registration staff member, use Encounter to mark the event when the person interacts with a Registrar when making a declaration, and use Observation to mark the essential data points such as educational level, occupation whose codes are already provided by FHIR and extend upon them for our Civil Registration needs.

OpenCRVS' data model is therefore an extension to FHIR and we have yet to find any Civil Registration process that cannot be interpreted using FHIR. Rather than spend years co-creating an accepted global civil registration standard that doesn't currently exist, why not adopt an already long established and versioned standard that satisfies our requirements and make minor extensions to it?  Why not choose a standard that automatically interacts with healthcare providers where a large portion of frontline birth and death data may be sourced from?

The following pages describe how FHIR documents from OpenCRVS look and the extensions we have made.

The payload of the birth registration event webhook contains the [FHIR Composition](https://www.hl7.org/fhir/composition.html) id, that can be used to retrieve all subsequent details for the registration. So, subscribing to this webhook is good place to start to begin any integration and understanding of the FHIR Documents available.&#x20;

###
