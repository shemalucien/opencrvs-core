---
description: An introduction describing how OpenCRVS interoperates
---

# Interoperability

OpenCRVS has been technically architected from conception to interoperate with other e-Gov systems in a standardised, safe and secure way. &#x20;

We have demonstrated how easy it is to interoperate with OpenCRVS in the past by:&#x20;

a) being a core collaborator of the [G2PConnect](https://g2pconnect.global/) initiative.

b) installing a permanent installation of an OpenCRVS and National ID integration with [MOSIP](https://mosip.io/) at the MOSIP Experience Center in Bangalore, India.

c) integrating with [DHIS2](https://dhis2.org/) to standardise birth and death notifications from a hospital setting for civil registration using [FHIR](https://www.hl7.org/fhir/overview.html).

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-10 at 16.46.06.png" alt=""><figcaption><p>Using the OpenCRVS v1.2.* Integrations GUI to configure a webhook client</p></figcaption></figure>

As of OpenCRVS v1.2.\* we now provide a simple GUI to set up, enable and disable integrating clients that generates and refreshes API keys. &#x20;

There are 4 common interoperability use cases you can easily take advantage of using our new GUI and specific API Gateway endpoints in JSON and GraphQL.

1. **Event Notification**: Allow any other service to POST full or partial civil registration event applications to OpenCRVS - referred to in civil registration nomenclature as a "notification".  Most commonly these are submitted by hospitals, but you could also use this functionality to enable application submission from a social protection system or a public portal.
2. **National ID**: Ensure a National ID system is notified by a webhook whenever an event (birth or death) is registered in OpenCRVS.  Use this to create or deactivate National ID numbers, or use it to authenticate citizens before allowing them to register an event.
3. **Record Search**: Allow any other service to perform an advanced search of civil registration records.  Use this to help support social protection systems, check the existence of civil registration records or check citizen demographics.
4. **Webhook**: Allow any other system to subscribe to event in OpenCRVS and retrieve a customisable payload of registration data.  Allow any system to react immediately when a birth or death is registered.

The following sections will describe step-by-step instructions regarding how to configure these integrations as well as show you how you can expose OpenHIM to have full interoperability control over OpenCRVS.&#x20;



**Other ways to interoperate**

OpenCRVS' database layer for all registration data is expressed in JSON as [FHIR](https://hl7.org/FHIR/) in MongoDB and exposed via a FHIR database server called [Hearth](https://github.com/opencrvs/hearth).  This means that our schema is automatically thoroughly documented in the HL7 FHIR specification.  We have made some customisations to support the civil registration context hat are documented in the [standards](../standards/) section. We knew how important it would be for health institutions to be able to send us birth and death notifications from the beginning, hence our early adoption of FHIR as our interoperability standard.  This also makes it easy for interoperating systems to understand our data.

We expose some FHIR APIs directly via our API Gateway, specifically for performing CRUD actions on [FHIR Locations](https://build.fhir.org/location.html) which we use for administrative structure, civil registration and health office buildings where registrations occur.  When OpenCRVS is running you can view [Swagger](https://swagger.io/) documentation in this Gateway.

OpenCRVS stack includes [OpenHIM](http://openhim.org/).  The Open Health Information Mediator is a middleware component designed to ease interoperability between disparate information systems. Both OpenHIM and Hearth are OpenSource projects developed by [Jembi Health Systems](https://www.jembi.org/).  It is possible to expose direct access to OpenHIM in OpenCRVS Core, should you wish to interoperate with it.





