# 7. Monitoring

OpenCRVS comes with a pre-installed suite of tools for monitoring and debugging a live installation. [The Elastic Stack](https://www.elastic.co/elastic-stack) is used to monitor the infrastructure, applications and dependencies and also for sending alerts on application errors and system health.&#x20;

#### The monitoring setup of OpenCRVS features:

* Reading & searching for application logs
* Measuring infrastructure load to know when to scale up
* Setting up alerts for application errors and infrastructure health issues

Once the environment is installed, the monitoring suite can be accessed using the _kibana.\<your\_domain>_ URL.&#x20;

![](<../../.gitbook/assets/image (7) (1).png>)

The login credentials are the ones you used as `KIBANA_USERNAME`  and `KIBANA_PASSWORD` as part of the [deployment](../3.-installation/3.3-set-up-a-server-hosted-environment/3.3.6-deploy.md). &#x20;

{% hint style="warning" %}
These tools are only available for server-hosted environments and are not part of the development environment.
{% endhint %}

### Application Performance Monitoring (APM)

The OpenCRVS monitoring stack comes with a pre-installed Application Performance Monitoring tool (APM). You can find this tool in Kibana by navigating to **Observability -> APM -> Services**. This tool gives you a good view of the health of each individual service and helps you discover bottlenecks in the environment.

![](<../../.gitbook/assets/image (3) (1).png>)



#### Read more

* [Kibana—your window into Elastic](https://www.elastic.co/guide/en/kibana/current/introduction.html#introduction)
* [Application Performance Monitoring (APM)](https://www.elastic.co/observability/application-performance-monitoring)
