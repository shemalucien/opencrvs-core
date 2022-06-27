# Interoperability

{% hint style="success" %}
OpenCRVS provides flexible interoperability options via OpenHIM, FHIR and a Webhooks microservice
{% endhint %}

Choose how you would like to interoperate with OpenCRVS:

1. OpenHIM tracks and exposes events and documents as [FHIR](https://hl7.org/FHIR/).  You can access these events directly via authenticated API integrations to OpenHIM
2. Subscribe to the OpenCRVS **Webhooks** microservice. &#x20;

You perform any data manipulation or conversion that you may need using small custom microservices called **Mediators**.

### **MOSIP Example**

A technical proof of concept mediator that exposes civil registration events via a Webhook to the [MOSIP - the Modular Open Source Identity Platform](https://www.mosip.io/) is documented on MOSIP's documentation website [here](https://docs.mosip.io/1.2.0/integrations/mosip-opencrvs-integration).

This integration represents A FHIR-standardised approach to ensuring that a birth registration directly creates a National ID number with optional biometrics. This interoperability ensures that the legal identity established at birth is then utilised as a foundational identity to access other services (e.g. health, education, financial inclusion, passport, mobile phone etc.) and to ensure that we leave no one behind.



****
