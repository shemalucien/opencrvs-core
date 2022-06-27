---
description: Overview of results from performance tests conducted on OpenCRVS
---

# Performance tests

OpenCRVS has been tested to ensure its performance and stability in a country that represents the upper-end of possible concurrent users and the number of birth declarations per year. Birth declaration submission was chosen as the focus of the performance tests because it is the most resource intensive operation of the software from the perspective of processing and storing data.&#x20;

The test, controlled by a performance testing framework [k6](https://k6.io/) by Grafana Labs, creates automated requests to the backend interface mimicking the actual birth declaration submission. A configured target value determines the number of requests per minute. The number of concurrent requests (Virtual Users) is dynamic and fluctuates based on request response times. New virtual users are added to meet the demand when the framework detects that the current target rate can not be reached with the current response times.

The target request rates were the following:

* 40 birth declarations per minute. Ran for 2 minutes.
* 60 birth declarations per minute. Ran for 2 minutes.
* 100 birth declarations per minute. Ran for 2 minutes.
* 150 birth declarations per minute. Ran for 2 minutes.
* 200 birth declarations per minute. Ran for 4 minutes.

The target rates were chosen based on a large reference country, Nigeria, where approximately seven million children are born every year. Based on this figure and the number of work days per year (250), we concluded that the approximate rate required for new birth declarations per minute is 60.

The infrastructure chosen for the test represents the recommended minimum server setup for the product. Our test setup includes three virtual private servers hosted on Digital Ocean with the following specification:

* 8 GB Memory
* 4 Intel vCPUs
* 160 GB Disk
* Ubuntu 20.04 (LTS) x64

**Results**

The system achieved a request rate of 4 requests per second with minimal noticeable impact on response times, which is approximately four times the load required to support a country the size of Nigeria (population 206M).

1267 request were made in total, with no errors encountered during the test. With the highest request rate target of 200, the 95 percentile response time was 3.5 seconds, with an average request rate of 2.8 requests per second. During this target, an average of 12 requests were made concurrently.

![](<../../.gitbook/assets/Screenshot 2022-06-27 at 14.39.06.png>)
