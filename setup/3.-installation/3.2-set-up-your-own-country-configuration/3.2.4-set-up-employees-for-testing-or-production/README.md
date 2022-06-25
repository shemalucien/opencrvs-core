# 3.2.4 Set up employees for testing or production

The next step is for you to set up some employees that have access to your development or production OpenCRVS instance.

For demo and development purposes, we have created some example employees in our Farajaland repo.  A test employee setup like this allows you to perform all quality assurance activities you may wish to perform.  The setup includes all the user roles located in 3 separate offices and are documented in the main README of our opencrvs-core Git repository. But you should never use this list of test employees in production.

In production, your employee setup should only contain a single National System Administrator, and Local System Administrator users for every office that you need to configure.  In production, it is these users who should login to the production server and use the Team section and the User Management functions to create users using the live application.

The employees you create are saved into OpenCRVS as [FHIR Practitioners](https://www.hl7.org/fhir/practitioner.html).
