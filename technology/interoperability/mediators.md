# Mediators

[Mediators](http://openhim.org/docs/dev-guide/developing-mediators/) are separate micro services that run independently to OpenCRVS and perform additional mediation tasks for a particular use case. The common tasks within a mediator are as follows:

* **Message format adaptation** - this is the transformation of messages received in a certain format into another format (eg. HL7 v2 to HL7 v3 or MHD to XDS.b).
* **Message orchestration** - this is the execution of a business function that may need to call out to one or more other service endpoint on other systems. (eg. Enriching a message with a client’s unique identifier retrieved from a client registry then sending the enriched message to a shared health record).

Mediators can be built using any platform that is desired (some good options are pure Java using our mediator engine, Node.js, Apache Camel, Mule ESB, or any language or platform that is a good fit for your needs). The only restriction is that the mediator MUST communicate with the OpenHIM-core in a particular way.

Mediators must register themselves with the OpenHIM-core, accept request from the OpenHIM-core and return a specialised response to the OpenHIM-core to explain what that mediator did.

If you are interested in developing your own mediators, read the [OpenHIM Documentation](http://openhim.org/docs/dev-guide/developing-mediators/)

### Security guidance: Mediator authorization to OpenCRVS data

**OpenCRVS FHIR Resources contain sensitive patient data.** When you are writing your mediator, it is your responsibility as an OpenCRVS implementor in your nation to ensure that you security check the accessing client. The following steps are essential:

1. The mediator's exposed client endpoints must be protected by SSL so that data is encrypted in transit.
2. The endpoints must enforce JWT authentication.
3. The endpoints must check the scope of the JWT before permitting any further requests for business functions you feel are relevant to that scope.
4. Once the mediator has been written, tested and peer reviewed, it must be penetration tested by an equivalent independent, [CREST](https://www.crest-approved.org/) equivalent certified penetration testing organisation before deployment.
