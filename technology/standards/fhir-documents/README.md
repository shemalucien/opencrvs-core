# FHIR Documents

When we were looking for a Civil Registration data standard to use for OpenCRVS, we were inspired by FHIR, specifically:&#x20;

* The [FHIR Patient](https://www.hl7.org/fhir/patient.html) model contains a structure that supports basic requirements with flexibility. e.g. [HumanName](https://www.hl7.org/fhir/datatypes.html#HumanName): a property that can support any combination of given and family names, titles, prefixes and suffixes.
* [FHIR Locations](https://hl7.org/fhir/location.html) can cover administrative divisions as well as specific buildings where births and deaths occur, with an [Address](https://hl7.org/fhir/datatypes.html#Address) structure that can cater for structured and un-structured addresses. &#x20;
* The [FHIR Encounter](https://www.hl7.org/fhir/encounter.html) marks an event interaction between a Patient and a [Practitioner](https://www.hl7.org/fhir/practitioner.html) where [Observations](https://www.hl7.org/fhir/observation.html) are made. &#x20;
* [FHIR Documents](https://build.fhir.org/documents.html) can be used for required supporting document attachments
* [Tasks](https://build.fhir.org/task.html) can be created to audit interactions. &#x20;
* The [FHIR Bundle](https://hl7.org/fhir/bundle.html) allows a system to request all / or just a few of these connected resources into a single, customisable, person centric longitudinal record.

It seemed to us to be a small conceptual leap to equate these healthcare intended use-cases of FHIR to the civil registration context. &#x20;

Essentially we could equate Patient to Person, Healthcare Practitioner to a Civil Registration staff member, use Encounter to mark the event when the person interacts with a Registrar when making a declaration, and use Observation to mark the essential data points such as educational level, occupation whose codes are already provided by FHIR and extend upon them for our Civil Registration needs.

OpenCRVS' data model is therefore an extension to FHIR and we have yet to find any Civil Registration process that cannot be interpreted using FHIR.&#x20;

Rather than spend years co-creating an accepted global civil registration standard that doesn't currently exist, why not adopt an already long established and versioned standard that satisfies our requirements and make minor extensions to it?  Why not choose a standard that automatically interacts with healthcare providers where a large portion of frontline birth and death data may be sourced from?

The following pages describe how FHIR documents from OpenCRVS look and the extensions we have made.

The payload of the birth registration event webhook contains the [FHIR Composition](https://www.hl7.org/fhir/composition.html) id, that can be used to retrieve all subsequent details for the registration. So, subscribing to this webhook is good place to start to begin any integration and understanding of the FHIR Documents available.&#x20;

###
