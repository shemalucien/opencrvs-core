# Security

**We treat the security of OpenCRVS and the personally identifiable citizen data it stores with utmost care.**

Every release of the OpenCRVS application and infrastructure has been security penetration tested by an independent, [CREST](https://www.crest-approved.org/) and [CyberEssentials](https://www.ncsc.gov.uk/cyberessentials/overview) certified 3rd party to UK government standards. &#x20;

The latest penetration test of OpenCRVS was performed by the consultancy [GoFore](https://gofore.com/) - [NORAD's](https://www.norad.no/) preferred security testing provider.  Gofore Plc conducts security assessments for public and private organisations in the form of white hat penetration testing (aka ethical hacking) to simulate an adversary attacking the system and identifying vulnerabilities that may be exploited to compromise data confidentiality, integrity and availability.

Gofore pentesters utilise proven pentesting methods of code review, automated enumeration scans via the public internet, fuzzing with diverse input, and manual tests. The security assessment was conducted in two rounds, first to identify and report vulnerabilities, and then reassessed to ensure reported vulnerabilities were resolved.

GoFore said of OpenCRVS ...

_"Already from the results of the first assessment, it was evident that the OpenCRVS web application had a good security posture. The web application security fundamentals were sound."_



**Some key security points we are proud of**

Our mobile application and microservices are secure, protected by [2-Factor Authentication](https://en.wikipedia.org/wiki/Multi-factor\_authentication) utilising [OAuth JWT best practices](https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html).  2FA codes are sent to the user's mobile device in order log in.  These codes time out after 5 minutes preventing brute force attack and ensuring only authenticated users with access to authenticated hardware can access OpenCRVS.

User types and access controls are managed in order to segregate personally identifiable data to only to the users who need it. These user types can be set up in the Team GUI accessible by National and Local System Administrators.  Every access to a specific declaration or registration is audited in order to track who viewed the data thus protecting citizen rights.

All OpenCRVS data is encrypted in transit and at rest. OpenCRVS includes daily, automated, external back up as a configurable option in our [Ansible](https://www.ansible.com/) script.  The Ansible script automatically provisions a secure firewall to OpenCRVS on each node.

OpenCRVS SSL certificate is automatically provisioned by [Traefik](https://traefik.io/) signed by [LetsEncrypt](https://letsencrypt.org/), and automatically rotates

Encryption keys to the databases, API keys and sensitive environment secrets are never stored in .env files but instead are stored in RAM in inaccessible [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/) and provided to deployment by inaccessible [Github Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

All access to OpenCRVS servers and infrastructure health is logged and monitored in [Kibana](https://www.elastic.co/observability/infrastructure-monitoring).
