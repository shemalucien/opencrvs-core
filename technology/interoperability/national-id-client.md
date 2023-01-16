# National ID client

Civil registration provides the source of truth for any vital event that occurs in a country.  As a result is usual that an integration with a country's National ID system is requested. &#x20;

We have some default functionality and some functionality that is unique to integrations with [MOSIP - an OpenSource platform for foundational ID](https://mosip.io/). &#x20;

When creating a National ID client, you must give it a name.  If you are installing OpenCRVS alongside MOSIP, enter "MOSIP" (without quotation) for the name.

{% hint style="warning" %}
**You can only have one National ID client!**
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-16 at 16.31.32.png" alt=""><figcaption></figcaption></figure>

### Default functionality

Currently OpenCRVS supports the following default National ID integration functionality:

#### Birth events:

OpenCRVS can let a National ID system know of any birth that occurs in the country so that operations can be put in place to provide a National ID number for the child.

#### Death events:

OpenCRVS can let a National ID system know of any death that occurs in the country so that operations can be put in place to invalidate a National ID number for the deceased.



The default functionality dispatches the full payload at the moment of registration via the same process utilised by the webhook client.  You can consider the National ID client as identical to a [webhook](webhooks.md) client with full payload permissions.  To implement the National ID client, you must configure a webhook mediator service in exactly the same way for any other [webhook](webhooks.md) client.



{% hint style="info" %}
Example code for a mediator service that subscribes to an OpenCRVS National ID webhook is our [MOSIP Mediator](https://github.com/opencrvs/mosip-mediator)
{% endhint %}

### MOSIP functionality

MOSIP functionality contains the default functionality with some extra functionality unique to MOSIP requirements.  For a detailed explanation refer to the [MOSIP OpenCRVS integration documentation](https://docs.mosip.io/1.2.0/integrations/mosip-opencrvs-integration).

#### Birth events:

OpenCRVS can let MOSIP know of any birth that occurs in the country so that operations can be put in place to provide a National ID number for the child. &#x20;

The [MOSIP Mediator](https://github.com/opencrvs/mosip-mediator) will return a unique token (**UINTOKEN**) that will be saved into the child's FHIR Patient details [here](https://github.com/opencrvs/opencrvs-farajaland/blob/1d8017657d074c9e83f07c01215ab4736e513d28/src/features/mediators/mosip-openhim-mediator/handler.ts#L26) as an additional identifier.  **This token is unique for the individual for life**.  In this way it can be used when the individual dies to connect the birth and death event together and invalidate a death.

The [MOSIP Mediator](https://github.com/opencrvs/mosip-mediator) will also return an application ID (**MOSIP\_AID**) that can be printed on a birth [certificate](../../setup/4.-functional-configuration/4.4-configure-a-certificate-template.md) using the certificate handlebar **\{{mosipAid\}}**.  A baby is too young for biometrics to be captured in National ID processing, but this application ID allows the child's National ID application to be retrieved in the future and converted into a MOSIP National ID (VID / UIN) at any time.

#### Death events:

OpenCRVS can let a National ID system know of any death that occurs in the country so that operations can be put in place to invalidate a National ID number for the deceased.

{% hint style="danger" %}
When a MOSIP enabled National ID client is set up, at the point of death, the deceased's National ID number must be captured in the application form.
{% endhint %}

&#x20;The deceased's National ID number (VID / UIN) is sent in a request to the [MOSIP Token Seeder](https://docs.mosip.io/1.2.0/integrations/mosip-token-seeder) (details below).  The (VID / UIN) is authorized and if valid a UINTOKEN is returned.  OpenCRVS then uses the UINTOKEN to link the death with the birth event before dispatching the death webhook. &#x20;

{% hint style="info" %}
**By integrating OpenCRVS with MOSIP, we acheive a person-centric, longitudinal record of life events thanks to the MOSIP Token Seeder validation.**
{% endhint %}



#### Installing a MOSIP enabled National ID configuration

If you are integrating with MOSIP, there are a few extra configuration steps in OpenCRVS that are required when setting up your servers and deploying.

1. Refer to the [MOSIP OpenCRVS Integration Documentation](https://docs.mosip.io/1.2.0/integrations/mosip-opencrvs-integration) to prepare MOSIP for OpenCRVS integration.
2. When setting up your OpenCRVS servers, you may need to provision a Wireguard VPN, and you _**will**_ need a shared Docker volume to store some secret key files that MOSIP will supply you with.  You will need to uncomment [these lines in the country configuration Ansible playbook](https://github.com/opencrvs/opencrvs-farajaland/blob/1d8017657d074c9e83f07c01215ab4736e513d28/playbook.yml#L61) before running the Ansible command in [this step](../../setup/3.-installation/3.3-set-up-a-server-hosted-environment/3.3.2-install-dependencies.md). &#x20;
3.  You will need to copy the secret key files that MOSIP will provide you with onto your server in this directory.  The names of these files must match whatever you use in docker-compose in the next step.&#x20;

    ```
    /data/secrets/mosip
    ```
4. Before you deploy, you will need to copy the [mosiptokenseeder](https://github.com/opencrvs/opencrvs-farajaland/blob/1d8017657d074c9e83f07c01215ab4736e513d28/docker-compose.countryconfig.demo-deploy.yml#L81) block from this demo docker-compose file into one of the docker-compose files relevant for your deployment (e.g. staging, qa or production)
5. Either add a block to docker-compose to host the [MOSIP Mediator](https://github.com/opencrvs/mosip-mediator) within the OpenCRVS stack, or alternatively host the Mediator on MOSIP's Kubernetes architecture making use of the Wireguard VPN.  MOSIP can provide more support regarding this step.
6. When deploying OpenCRVS alongside MOSIP, the MOSIP team will provide you with a few extra secrets that are referenced in docker compose and supplied by deployment scripts in environment variables from Terminal.  The following secrets must be added to your Github [**environment secrets** ](../../setup/3.-installation/3.3-set-up-a-server-hosted-environment/3.3.6-deploy-automated-and-manual.md)or exported as environment variables when [deploying OpenCRVS ](../../setup/3.-installation/3.3-set-up-a-server-hosted-environment/3.3.6-deploy-automated-and-manual.md)to your server.

| Parameter                                                                     | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| <pre><code>TOKENSEEDER_MOSIP_AUTH__PARTNER_MISP_LK
</code></pre>              | A MOSIP supplied secret key.  It will look something like this: "rosxZG5q..." |
| <pre><code>TOKENSEEDER_MOSIP_AUTH__PARTNER_APIKEY
</code></pre>               | A MOSIP supplied secret key.  It will look something like this: "123..."      |
| <pre><code>TOKENSEEDER_CRYPTO_SIGNATURE__SIGN_P12_FILE_PASSWORD
</code></pre> | A MOSIP supplied secret key.  It will look something like this: "rosxZG5q..." |



### Future National ID functionality

There are many other use cases that can be considered for future development of a more fully featured National ID integration with OpenCRVS such as:

**OSIA support**: In 2023 we plan to support an [OSIA standard](https://osia.readthedocs.io/en/v6.1.0/) National ID integration.

**Validation**: Validating all supplied National ID numbers with a National ID system before application submission and pre-populating CR application forms with demographic data returned by the NID system for informants and parents.

**Revocation**: Occasionally a death may be wrongly registered either fraudulently or by mistake.  Any revocation in OpenCRVS should be communicated to the National ID system.



We are continually improving our National ID integration capabilities and look forward to addressing functionality such as this in future versions of OpenCRVS.   For more information, please get in touch at: **team@opencrvs.org**
