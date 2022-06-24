# Standards

At OpenCRVS we are obsessed with conforming to standards.  We want to make implementers lives as easy as possible, so we have no intention of re-inventing the wheel when we dont have to.  We have stood on the shoulders of giants before us to develop OpenCRVS in the friendliest way that we could.



Data

By using [FHIR](https://hl7.org/FHIR/) as a standard for our NoSQL datastore [Hearth](https://github.com/jembi/hearth) and interoperability layer [OpenHIM](http://openhim.org/), OpenCRVS seamlessly connects civil registration to health services and other systems. We can receive birth and death notifications from the hospital setting and expose registration events to any other technical system, such as National ID, via our FHIR standard API gateways.

[FHIR](https://hl7.org/FHIR/) was created by [Health Level Seven International (HL7)](http://hl7.org/) a not-for-profit, ANSI-accredited standards developing organization dedicated to providing a comprehensive framework and related standards for the exchange, integration, sharing and retrieval of electronic health information that supports clinical practice and the management, delivery and evaluation of health services.



Interoperability

Systems can interoperate with OpenCRVS using FHIR or via Webhooks which follow [WebSub](https://www.w3.org/TR/websub/) standards.





Authentication

Our applications are protected by [2-Factor Authentication](https://en.wikipedia.org/wiki/Multi-factor\_authentication) utilising [OAuth JWT best practices](https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html).&#x20;
