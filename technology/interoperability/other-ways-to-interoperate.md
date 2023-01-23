---
description: Direct interoperability with OpenHIM
---

# Other ways to interoperate

It is possible to expose the interoperability layer: [OpenHIM](http://openhim.org/docs/introduction/about) for direct integration with OpenCRVS' Hearth database.

{% hint style="warning" %}
Exposing OpenHIM for API access bypasses the auditing capabilities that are native to OpenCRVS. You must consider the risk and develop your own audit trail to track custom API access to citizen data should you expose OpenHIM. OpenHIM's logging history is configured to refresh after 30 days.  You should fully understand [OpenHIM](http://openhim.org/docs/introduction/about) before proceeding.
{% endhint %}

{% hint style="danger" %}
**Before exposing OpenHIM, consider getting in touch with us at** [**team@opencrvs.org**](mailto:team@opencrvs.org) **in order to request an API feature.  We could develop a client for you that protects citizen data with a native OpenCRVS audit trail.**
{% endhint %}

#### Expose OpenHIM via a Traefik whitelist

In order to expose OpenHIM to be accessible on the public internet, you must comment in [these lines in the docker-compose.deploy.yml file.](https://github.com/opencrvs/opencrvs-core/blob/ced5cf02ebe66994e0151b4cedf17c5091dce74e/docker-compose.deploy.yml#L844)

You must enter a comma separated list of trusted IP addresses to the whitelist property.

You need to create a [DNS](../../setup/3.-installation/3.3-set-up-a-server-hosted-environment/3.3.5-setup-dns-a-records.md) record to expose the _api.\<your-domain>_ endpoint to OpenHIM.

Now you can create your own microservice [Mediator](http://openhim.org/docs/dev-guide/developing-mediators/) and register it with OpenHIM following the [OpenHIM documentation.](http://openhim.org/docs/dev-guide/developing-mediators/)



#### What are OpenHIM Mediators?

[Mediators](http://openhim.org/docs/dev-guide/developing-mediators/) are separate microservices that run independently to OpenCRVS and perform additional mediation tasks for a particular use case. The common tasks within a mediator are as follows:

* **Message format adaptation** - this is the transformation of messages received in a certain format into another format (eg. HL7 v2 to HL7 v3 or MHD to XDS.b).
* **Message orchestration** - this is the execution of a business function that may need to call out to one or more other service endpoint on other systems. (eg. Enriching a message with a client’s unique identifier retrieved from a client registry then sending the enriched message to a shared health record).

Mediators can be built using any platform that is desired (some good options are pure Java using our mediator engine, Node.js, Apache Camel, Mule ESB, or any language or platform that is a good fit for your needs). The only restriction is that the mediator MUST communicate with the OpenHIM-core in a particular way.

Mediators must register themselves with the OpenHIM-core, accept request from the OpenHIM-core and return a specialised response to the OpenHIM-core to explain what that mediator did.

If you are interested in developing your own mediators, read the [OpenHIM Documentation](http://openhim.org/docs/dev-guide/developing-mediators/)

### Security guidance

{% hint style="warning" %}
**OpenCRVS FHIR Resources contain sensitive patient data.** When you are writing your mediator, it is your responsibility as an OpenCRVS implementor in your nation to ensure that you security check the accessing client. The following steps are essential:
{% endhint %}

#### Mediator authorisation to OpenCRVS data

1. The mediator's exposed client endpoints must be protected by SSL so that data is encrypted in transit.
2. The endpoints must enforce JWT authentication.
3. The endpoints must check the scope of the JWT before permitting any further requests for business functions you feel are relevant to that scope.
4. Once the mediator has been written, tested and peer reviewed, it must be penetration tested by an equivalent independent, [CREST](https://www.crest-approved.org/) equivalent certified penetration testing organisation before deployment.
