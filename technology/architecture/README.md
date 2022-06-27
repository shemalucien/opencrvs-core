# Architecture

The technical architecture of OpenCRVS was designed to conform to the [Open Health Information Exchange (OpenHIE) architectural standard](https://ohie.org/) and interoperate using [HL7 (Fast Healthcare Interoperability Resources) or FHIR](https://www.hl7.org/fhir/). FHIR is a global standard application programming interface or (API) for exchanging electronic health records.

By following the OpenHIE framework, OpenCRVS seamlessly connects civil registration to health services and other systems. Firstly, by utilising the OpenHIE interoperability reference middleware [OpenHIM](http://openhim.org/), a FHIR standard enterprise service bus; and secondly, by using a scalable, modular, NoSQL FHIR datastore, called [Hearth](https://github.com/opencrvs/hearth).

We use OpenHIM to receive birth and death notifications from a hospital setting, and expose registration events to any other technical system via an API gateway e.g. [MOSIP foundational national ID](https://mosip.io/), or [DHIS2 health Information Management](https://dhis2.org/).

OpenCRVS business functions are designed using modular, event-driven [microservices](https://en.wikipedia.org/wiki/Microservices). Each micro service and every OpenCRVS component is independently scalable in private or public cloud, in large or small data centres, and easy to manage, load balance and network using included [Docker Swarm](https://docs.docker.com/engine/swarm/) configurations.

OpenCRVS builds on these sound principles by additionally providing:

* Easy country configuration via simple csv files and a configuration UI.
* Standards-based multi-language content management.
* A market-leading, powerful search and de-duplication engine powered by [ElasticSearch](https://www.elastic.co/).
* Real-time performance analytics powered by the time-series database [Influx](https://www.influxdata.com/).
* Increased performance by the use of [GraphQL](https://graphql.org/), reducing HTTP requests between client and server.
* An automated continuous integration, delivery and testing suite.
* A single JS, [TypeScript](https://www.typescriptlang.org/) codebase for backend, desktop and mobile using [Progressive Web Application](https://web.dev/progressive-web-apps/) technology for offline and low-connectivity access.
* External server and application health monitoring using [Kibana](https://www.elastic.co/kibana/)
* Automatic [LetsEncrypt](https://letsencrypt.org/) SSL configuration
* SMS 2-Factor Authentication with well defined user role authorization privileges

OpenCRVS is a full-stack that is designed to give you the lowest possible ["total cost of ownership"](https://en.wikipedia.org/wiki/Total\_cost\_of\_ownership).

Our international development teams work in an Agile way, in tandem with local development resources and human-centred designers, following the [Scrum](https://www.atlassian.com/agile/scrum) methodology, to rapidly design, build, deploy, test and maintain OpenCRVS releases.

{% embed url="https://www.figma.com/file/1WohPWFe53VH7zO7yILJDx/Architecture?node-id=0:1" %}

{% file src="../../.gitbook/assets/Application services and network diagram.png" %}

### Open source dependencies

The following dependencies are automatically provisioned alongside the OpenCRVS Core in [docker](https://www.docker.com/) containers in a Docker Swarm on Ubuntu.

#### Docker Swarm

[Docker Swarm](https://docs.docker.com/engine/swarm/) was chosen by our architects in 2018 for it's lack of requirement of other essential dependencies, it's close alignment with Docker and it's simplicity in terms of installation and monitoring on a [Tier 2 private data centre](https://en.wikipedia.org/wiki/Data\_center), on bare metal servers with headless [Ubuntu OS](https://en.wikipedia.org/wiki/Ubuntu). Why not use AWS, public cloud SaaS or serverless you might be thinking?

* Many countries may be located far from a high-quality data-centre above Tier 2.&#x20;
* Many countries may not legally support international data storage of citizen data on a public cloud. Getting the legal approval for external storage of citizen data requires regulatory change which can take a considerable amount of time.&#x20;
* Because some countries may not be able to maintain complex software independently, we are considering a SaaS solution, provided enough countries get regulatory approval.  Over time, this situation appears to be slowly evolving and we are monitoring it closely.

Previously unskilled system administrators can quickly up-skill in the techniques of private cloud infrastructure management using Docker Swarm. We wanted to democratise containerisation benefits for all countries.

#### **Is there a plan for Kubernetes?**

We are working on a [Kubernetes](https://kubernetes.io/) migration now that Kubernetes has become a more mature, easier to use and configure solution, thanks to dependencies like Helm and other plugins increasing popularity since 2018. In the meantime, Docker Swarm makes it easy to commence containerised microservice package distribution privately,  automatically configures a "round robin" load balanced cluster, and provides Service Discovery out-the-box.

###

![](https://static.wixstatic.com/media/93440e\_d04078ae922a4126b8e9dd3f96066505\~mv2.png/v1/fill/w\_136,h\_39,al\_c,q\_80,usm\_0.66\_1.00\_0.01/FHIR\_Foundation.webp)

**Hearth MongoDB Database layer**

In order to support configuration for limitless country scale, OpenCRVS was designed for [NoSQL](https://en.wikipedia.org/wiki/NoSQL), built on [MongoDB](https://www.mongodb.com/), and aligned to a globally recognised healthcare standard.

Massively scalable and extensible, [Hearth](https://github.com/opencrvs/hearth) is an OpenSource NoSQL database server originally built by the OpenCRVS founding member [Jembi Health Systems](https://www.jembi.org/), using interoperable [Health Level 7](https://www.hl7.org) [FHIR](https://www.hl7.org/fhir/) v4 ([ANSI](https://www.ansi.org/) Accredited, Fast Healthcare Interoperability Resources) as standard.

We extended [FHIR](https://www.hl7.org/fhir/) to support the civil registration context. Our civil registration FHIR standard is described [here](../interoperability/opencrvs-fhir-documents.md).



![](https://static.wixstatic.com/media/93440e\_21c72b72ff3a405596448e33f80a719c\~mv2\_d\_3422\_1781\_s\_2.png/v1/fill/w\_136,h\_70,al\_c,q\_80,usm\_0.66\_1.00\_0.01/Elasticsearch-Logo-Color-V.webp)

**ElasticSearch**

OpenCRVS uses [ElasticSearch](https://www.elastic.co/), an industry standard, NoSQL document orientated, real-time de-duplication & search engine. Lightning fast, intelligent civil registration record returns are possible, even with imprecise “fuzzy” search parameters.

De-duplication management to ensure data integrity is essential to any civil registration system. A fast search engine lowers operational costs and improves the user experience for frontline staff.

ElasticSearch is also used with [Kibana](https://www.elastic.co/kibana) for application and server health monitoring.\
\


![](https://static.wixstatic.com/media/93440e\_7ae07f5f77c6407080656fff4e0cdcd3\~mv2.jpg/v1/fill/w\_134,h\_26,al\_c,q\_80,usm\_0.66\_1.00\_0.01/influxdata-2.webp)

**InfluxData**

The hyper-efficient [Influx](https://www.influxdata.com) "time series database" is used in our stack for "big data" performance insights. Millisecond level query times facilitate civil registration statistical queries over years of data, disaggregated by gender, location and configurable operational and statistical parameters.\
\


![](https://static.wixstatic.com/media/93440e\_bdd011d5e3744e7b84684e6789c1f5c7\~mv2.png/v1/fill/w\_136,h\_40,al\_c,q\_80,usm\_0.66\_1.00\_0.01/openhim-logo-green.webp)

**OpenHIM enterprise service bus, interoperability Layer**

The [OpenHIM (Health Information Mediator)](https://github.com/jembi/openhim-core-js) is a NodeJS enterprise service bus designed to ease interoperability between OpenCRVS and external systems such as Health & National ID. It provides external access to the system via secure APIs. OpenHIM channels and governs internal transactions, routing, orchestrating and translating requests into [FHIR](https://www.hl7.org/fhir/) between services and the database layer.

### OpenCRVS packages

The core of OpenCRVS is a monorepo organised using [Lerna](https://github.com/lerna/lerna). Each package reports unit test coverage in [Jest](https://jestjs.io/). Following the [microservice](https://en.wikipedia.org/wiki/Microservices), 1 service per container model, every package is independently scalable in a single [docker](https://www.docker.com/) container.



![](<../../.gitbook/assets/image (10).png>)  ![](<../../.gitbook/assets/image (1).png>)  ![](<../../.gitbook/assets/image (17).png>)\


#### Microservice business layer packages

The OpenCRVS microservice architecture enables continuous evolution of its business requirements.

The microservices are written in [TypeScript](https://github.com/microsoft/TypeScript) (a strictly typed superset of JavaScript that compiles to JavaScript) and NodeJS using the [HapiJS](https://github.com/hapijs/hapi) framework.

Each microservice in OpenCRVS has no knowledge of other services or business requirements in the application, and each exposes it’s capabilities via [JWT](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/) secured APIs.

* [auth](https://github.com/opencrvs/opencrvs-core/tree/master/packages/auth) - the authentication microservice for OpenCRVS, [JWT](https://jwt.io/) token generation and management in [Redis](https://www.redislabs.com/). Our client applications are protected by SMS [2-Factor Authentication](https://en.wikipedia.org/wiki/Multi-factor\_authentication). Our apps and microservices utilise [OAuth best practices](https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html) for JWT tokens.
* [commons](https://github.com/opencrvs/opencrvs-core/tree/master/packages/commons) - a shared library package that all microservices use in order to validate JWTs
* [config](https://github.com/opencrvs/opencrvs-core/tree/master/packages/config) - an application configuration microservice to power a configuration GUI for forms, application settings and certificates
* [gateway](https://github.com/opencrvs/opencrvs-core/tree/master/packages/gateway) - the [GraphQL](https://graphql.org/) and [Apollo](https://www.apollographql.com/) API gateway for the OpenCRVS client.  [GraphQL](https://graphql.org/) allows OpenCRVS to perform much faster and more responsively in remote areas by drastically reducing the number of HTTP requests that are required in order to render a view in the presentation layer.  The OpenCRVS GraphQL Gateway is a JWT protected [Apollo](https://www.apollographql.com/) server that requests and resolves [FHIR](https://www.hl7.org/fhir/) resources from [Hearth](https://github.com/jembi/hearth) via [OpenHIM](https://github.com/jembi/openhim-core-js) into GraphQL, for easy consumption in the client applications.



![](https://static.wixstatic.com/media/93440e\_d1ec46ba4c2d4c1dbb6afe6b9b7143de\~mv2.png/v1/fill/w\_133,h\_40,al\_c,q\_80,usm\_0.66\_1.00\_0.01/graphql.webp)

* [metrics](https://github.com/opencrvs/opencrvs-core/tree/master/packages/metrics) - the civil registration metrics and analytics microservice using the [Influx](https://www.influxdata.com) time series database.
* [notification](https://github.com/opencrvs/opencrvs-core/tree/master/packages/notification) - the microservice that manages SMS communications from OpenCRVS, communicating with a choice of 2 3rd party SMS Gateways.
* [search](https://github.com/opencrvs/opencrvs-core/tree/master/packages/search) - the search microservice for OpenCRVS using [ElasticSearch](https://www.elastic.co/)
* [user-mgnt](https://github.com/opencrvs/opencrvs-core/tree/master/packages/user-mgnt) - the user management microservice for the OpenCRVS client. User permissions and roles can be centrally managed, supporting IT organisations that conform to [ISO27001](https://www.iso.org/isoiec-27001-information-security.html) certification.
* [workflow](https://github.com/opencrvs/opencrvs-core/tree/master/packages/workflow) - the OpenCRVS business process orchestration microservice, mediating civil registration vital event status and audit updates.

#### Client application packages

![](https://static.wixstatic.com/media/93440e\_50ed7c9e719e44daa7ca7d3e183f4071\~mv2.png/v1/fill/w\_121,h\_55,al\_c,q\_80,usm\_0.66\_1.00\_0.01/react.webp)

* [login](https://github.com/opencrvs/opencrvs-core/tree/master/packages/login) - the login UI client built in [React](https://reactjs.org/).
* [client](https://github.com/opencrvs/opencrvs-core/tree/master/packages/client) - the OpenCRVS UI client for civil registration built in [React](https://reactjs.org/).\


![](https://static.wixstatic.com/media/93440e\_8452ed95c717459e86c95ed0e17378ad\~mv2.png/v1/fill/w\_136,h\_70,al\_c,q\_80,usm\_0.66\_1.00\_0.01/PWA-Progressive-Web-App-Logo.webp)

Using an Android [progressive web application](https://developers.google.com/web/progressive-web-apps) for our client applications means that we can take advantage of offline functionality and native mobile features using [Workbox](https://developers.google.com/web/tools/workbox), without the overhead of maintaining multiple web and mobile codebases and respective App/Play Store releases.

In remote areas, registrars can save a configurable number of registrations offline on their mobile phone, using [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB\_API).

Client [npm](https://www.npmjs.com/) dependencies and enablers include:

* Easy build configuration with [create-react-app](https://github.com/facebook/create-react-app), [craco](https://github.com/gsoft-inc/craco), [typrescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
* Multi-lingual content management support using [Format JS](https://github.com/formatjs/react-intl)
* ES6 JS component styling using [styled-components](https://styled-components.com/)
* Fully configurable, high performance form management using [formik](https://github.com/jaredpalmer/formik)
* Pure JavaScript, client side, offline PDF certificate generation using [pdfmake](http://pdfmake.org/)
* Read-only application state management using [redux](https://github.com/reduxjs/redux)
* Unit tests coverage with [Jest](https://jestjs.io/) & [Enzyme](https://airbnb.io/enzyme/) UI component tests.

#### Support packages

* [integration](https://github.com/opencrvs/opencrvs-core/tree/master/packages/integration) - performance tests for OpenCRVS using the [K6](https://k6.io/) framework.
* [components](https://github.com/opencrvs/opencrvs-core/tree/master/packages/components) - a UI component library package for the clients using [React Storybook](https://storybook.js.org/)

#### Automated testing support

OpenCRVS Core displays [Codecov](https://about.codecov.io/) enforced 80% unit testing coverage on git.  We supply example e2e UI test scripts using [Cypress](https://www.cypress.io/) and cover the main registration business functionality in those tests.

Because the OpenCRVS Form UI is configurable to your country, the end-to-end testing scripts are located in the [example country configuration server for Farajaland](https://github.com/opencrvs/opencrvs-farajaland/tree/master/cypress) so you can custmise them depending on the structure of your published form.
