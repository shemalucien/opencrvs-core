# 7. Monitoring

{% hint style="warning" %}
These tools are only available for server-hosted environments and are not part of the development environment.
{% endhint %}

OpenCRVS comes with a pre-installed suite of tools for monitoring and debugging a live installation. The [Elastic Stack](https://www.elastic.co/elastic-stack) is used to monitor the infrastructure, applications and dependencies and also for sending alerts on application errors and system health. All of these tools are accessed using a tool called [Kibana](https://www.elastic.co/kibana). Kibana is a free and open user interface that lets you access all your Elasticsearch data, including metrics, logs and other monitoring information.

#### Monitoring features:

* Reading & searching for application logs
* Insights on infrastructure performance & usage to know when to scale up
* Setting up alerts for application errors and for infrastructure health issues

### Getting started

Once the environment is installed, the monitoring suite can be accessed using the `kibana.<your_domain>` __ URL.&#x20;

![](<../../.gitbook/assets/image (19).png>)

The login credentials are the ones you used as `KIBANA_USERNAME`  and `KIBANA_PASSWORD` as part of the [deployment](../3.-installation/3.3-set-up-a-server-hosted-environment/3.3.6-deploy.md). &#x20;

#### Metricbeat

Metricbeat gets installed on all host machines in your infrastructure. Its sole purpose is to collect data about the network, the host machines and the Docker environment. The data is stored in the OpenCRVS Elasticsearch database. This data can be viewed by navigating to **Observability -> Metrics** and selecting either **Inventory** or **Metrics Explorer.** The data can be visualised, grouped and filtered in these views.

#### Application Performance Monitoring (APM)

The OpenCRVS monitoring stack comes with a pre-installed Application Performance Monitoring tool (APM). This tool collects performance metrics, errors and HTTP request information from each of the services in the OpenCRVS stack. You can find this tool in Kibana by navigating to **Observability -> APM -> Services**. This tool can be used to catch anomalies such as errors happening inside the services. It can also be used to detect bottlenecks and to know which services should be scaled up.

![](<../../.gitbook/assets/image (31).png>)

#### Logstash

Logstash receives log entries in [GELF format](https://docs.graylog.org/docs/gelf) from all OpenCRVS services and writes them into the Elasticsearch database. These logs can be viewed in real-time from **Observability -> Logs -> Stream** or through APM. By default, OpenCRVS stores all logs for three days before they are removed. Read more about logging in [7.1 Application logs](7.1-application-logs.md).

### Read more

* [Kibana—your window into Elastic](https://www.elastic.co/guide/en/kibana/current/introduction.html#introduction)
* [Application Performance Monitoring (APM)](https://www.elastic.co/observability/application-performance-monitoring)
