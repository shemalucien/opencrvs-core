# Security

Our mobile application and microservices are secure, protected by [2-Factor Authentication](https://en.wikipedia.org/wiki/Multi-factor\_authentication) utilising [OAuth JWT best practices](https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html). You can read about this process [here](https://github.com/opencrvs/opencrvs.github.io/blob/master/website/docs/support\_functions/login)

[User types](https://github.com/opencrvs/opencrvs.github.io/blob/master/website/docs/system\_overview/user\_types/overviewUserTypes) and access controls are managed in order to segregate personally identifiable data to only to the users who need it. These configurations can be managed in the [admin](https://github.com/opencrvs/opencrvs.github.io/blob/master/website/docs/system\_admin/userTeam) system, thus protecting citizen rights.

All OpenCRVS data is encrypted in transit and at rest. OpenCRVS includes daily, automated, external back up as a configurable option in our [Ansible](https://www.ansible.com/) script. Our system has been security tested to UK government standards by an independent, [CREST](https://www.crest-approved.org/) and [CyberEssentials](https://www.ncsc.gov.uk/cyberessentials/overview) certified organisation.
