# Standards

At OpenCRVS we are obsessed with conforming to good, existing standards.  We want to make implementers' lives as easy as possible, so we have no intention of re-inventing the wheel when we don't have to.&#x20;

#### **Data**

By using [FHIR](https://hl7.org/FHIR/) as a standard for our NoSQL datastore, [Hearth](https://github.com/jembi/hearth) and the [OpenHIE](https://ohie.org/) standard interoperability layer [OpenHIM](http://openhim.org/), OpenCRVS seamlessly connects civil registration to health services and other systems. We can receive birth and death notifications from the hospital setting and expose registration events to any other technical system, such as National ID, via our FHIR standard API gateways.

[FHIR](https://hl7.org/FHIR/) was created by [Health Level Seven International (HL7)](http://hl7.org/), a not-for-profit, ANSI-accredited, standards organization dedicated to providing a comprehensive framework and related standards for the exchange, integration, sharing and retrieval of electronic health information that supports clinical practice and the management, delivery and evaluation of health services.

We have extended FHIR's model to include custom codes and extensions that assist the Civil Registration context.  To understand more about how and why we use FHIR, click [here](interoperability/opencrvs-fhir-documents.md).

#### **Interoperability**

Systems can interoperate with OpenCRVS using FHIR or via Webhooks which follow [WebSub](https://www.w3.org/TR/websub/) process and standards. Our friends at MOSIP have demonstrated [ease of integration with OpenCRVS](https://docs.mosip.io/1.2.0/integrations/mosip-opencrvs-integration) using these methods.

#### **Internationalisation**

OpenCRVS uses industry-wide i18n [JSON](https://en.wikipedia.org/wiki/JSON) standards, the [unicode ICU Message Syntax](https://unicode-org.github.io/icu/userguide/format\_parse/messages/),  [ISO 639-1](https://en.wikipedia.org/wiki/List\_of\_ISO\_639-1\_codes) language codes and [ISO 3166 Alpha 3 country codes ](https://www.iban.com/country-codes)to make localisation a breeze and integrate seamlessly with enterprise level content management systems such as [Transifex](https://www.transifex.com/) or [Contentful](https://www.contentful.com/).

#### **Authentication**

Our applications are protected by [2-Factor Authentication](https://en.wikipedia.org/wiki/Multi-factor\_authentication) utilising [OAuth JWT best practices](https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html). You can read more about our security standards in the next section.
