---
description: >-
  This section outlines the process to setup and deploy OpenCRVS on a remote
  server environment for Staging (developer testing), Quality Assurance or live
  Production use.
---

# 3.7 Set-up a server-hosted environment

First you need to provision 1, 3 or 5 Ubuntu servers, with an additional, optional backup server that have internet connectivity, in a secure location with cooling and uninterrupted power supply.  We recommend a minimum of a [Tier 2](https://en.wikipedia.org/wiki/Data\_center#Data\_center\_levels\_and\_tiers) data centre.

#### Decide on the size of your deployment

OpenCRVS supports deployments to 1 server, but this is only recommended for a testing, staging or a QA environment.

Alternatively, OpenCRVS supports deployments to 3 servers in a load balanced cluster.  This approach also provisions Mongo replica sets for managing a production database at a normal scale.

Finally, OpenCRVS supports deployments to 5 servers in a load balanced cluster.  This approach also provisions Mongo replica sets for managing a production database at a large scale.

If you wish to enable an automated backup from production onto another server, you will need an additional backup server.

Take note of all generated IP addresses and server hostnames.

