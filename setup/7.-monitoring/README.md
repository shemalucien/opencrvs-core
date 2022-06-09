# 7. Monitoring

OpenCRVS comes with a pre-installed suite of tools for monitoring and debugging a live installation. [The Elastic Stack](https://www.elastic.co/elastic-stack) is used to monitor the infrastructure, applications and dependencies and also for sending alerts on application errors and system health. Once the environment is installed, the monitoring suite can be accessed using the _kibana.\<your\_domain>_ URL. The login credentials are the ones you used as `KIBANA_USERNAME`  and `KIBANA_PASSWORD` as part of the [deployment](../3.-installation/3.3-set-up-a-server-hosted-environment/3.3.6-deploy.md). &#x20;

{% hint style="warning" %}
These tools are only available for server-hosted environments and are not part of the development environment.
{% endhint %}

