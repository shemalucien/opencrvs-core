# 3.2.3 Set up CR offices and Health facilities

The next step is to prepare csv files to import into OpenCRVS all of the offices where civil registration staff work and all of the health facilities where births and deaths can occur in a medical setting.

The facilities you create are saved into OpenCRVS as [FHIR Locations](https://www.hl7.org/fhir/location.html).

CRVS\_OFFICE is an important location saved into [FHIR](https://build.fhir.org/location.html) to map registrations to a specific office. All civil registration employees have a CRVS\_OFFICE where they work, and every CRVS\_OFFICE is part of a second-level administrative division, ie a "district".  The CRVS\_OFFICE location provides a way for Local or National System Administrators to manage staff access and for OpenCRVS to record an audit trail of all staff interactions with registrations. &#x20;

* The CRVS\_OFFICE is also recorded as the registration location for all vital events on the printed certificate.
* HEALTH\_FACILITY is also an important location saved into [FHIR](https://build.fhir.org/location.html) to map places of birth and death that do not occur in a private home or other location to a specific health institution in your country.&#x20;
* This HEALTH\_FACILITY is also part of a second-level administrative division, ie a "district", and additionally printed as the place of birth or place of death on a printed certificate.

{% hint style="info" %}
Note: So that Field Agents can register births and deaths offline, all the health facilities are saved onto the user's mobile when installing OpenCRVS.  This can represent the largest initial application load as there may be over a thousand health facilities.
{% endhint %}

