# 3.2 Set-up your own country configuration

This section instructs you how to set-up and provision factory reset reference data for your OpenCRVS country configuration, and replace our fictional country repository with your country's repository.

The articles should be run step-by-step and they will walk you through how to:

1. Fork our fictional country configuration "Farajaland" into your own country configuration repository.
2. Configure your country's administrative address structure to be used as standardised and interoperable geolocation for registrations, employees, civil registration offices and health facilities.
3. Import a standardised, geolocated list of all the civil registration offices and health facilities where births and deaths occur.&#x20;
4. Import an initial list of test or production, civil registration employee users who can access the system.  Users can be created using the OpenCRVS user interface at any time.
5. Generate a factory reset backup of all the&#x20;
6. Set up multi-language content.
7. At the point of birth and death registration, use our unique Birth & Death Registration Number **generate** code or alternatively, roll-your-own.  For example, you can configure integrations with an already running, legacy civil registration system if you are piloting OpenCRVS alongside an existing system.
8. Make use of our optional [DHIS2](https://dhis2.org/) integration, facilitating automatic birth and death notification from a health facility that uses [DHIS2](https://dhis2.org/).
9. Provision 3rd party error tracking tools, and configure some technical settings
