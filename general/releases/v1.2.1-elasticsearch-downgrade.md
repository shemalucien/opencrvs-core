---
description: >-
  An Elasticseach downgrade, patch to demonstrate OpenCRVS' base configuration
  supports OSI standard licenses.
---

# Patch: Elasticsearch 7.10.2

**Patch Elasticsearch 7.10.2** is a core code patch for all implementers who may wish to adopt a commercial posture not supported by [Elasticsearch custom / non-OSI approved, opensource licence change](https://www.elastic.co/pricing/faq/licensing).  &#x20;

OpenCRVS usage of Elasticsearch does not enable the capability for anyone to provide paid-for, managed cloud search services.  We believe that the latest versions of Elasticsearch have no material effect on Civil Registration use cases and OpenCRVS' use of Elasticsearch. &#x20;

{% hint style="success" %}
This patch demonstrates that OpenCRVS works with an Apache 2.0 Elasticsearch license to conform to OSI standard OpenSource licenses.
{% endhint %}

### Changes in this patch:

Elasticsearch & Kibana have been fixed at version 7.10.2.&#x20;

{% hint style="warning" %}
**THIS PATCH IS TO BE APPLIED ON NEW INSTALLATIONS ONLY!**
{% endhint %}

{% hint style="danger" %}
**THIS PATCH DOES NOT SUPPORT APPLE MAC M1 CHIPS.**  &#x20;

**We use a later version of Elasticsearch in order to provide a better Apple Mac development experience.**
{% endhint %}

### Background:

The following explains the reason for this patch as interpreted by the OpenCRVS development team.  &#x20;

As far as we understand it, Elasticsearch appear to be in some disagreement with Amazon because Amazon started providing a paid for, managed cloud search "[Opensearch Service](https://aws.amazon.com/opensearch-service/)" (using a fork of Elasticsearch 7.10.2 - as was permitted by Elasticsearch's 7.10.2 Apache 2 license). Amazon renamed this fork [Opensearch](https://opensearch.org/) and released it on an OpenSource basis with a compliant Apache 2.0 license.

Elasticsearch then amended their OpenSource licence in order to stop 3rd parties from selling "managed" search services using Elasticsearch.  Our interpretation is that this seems to have been done because Elastic provide their own paid-for "managed" services.

As Elasticsearch now use a custom OpenSource license, any Elasticsearch release later than v7.10 has not been [OSI approved](https://opensource.org/licenses/).  Implementing countries may be concerned about that should they wish to adopt a managed search commercial posture, an un-common use case. In order to satisfy yourself that this software can be used commercially without any concerns over licensing, this patch can be applied.

To apply the patch, you will need to build and host your own opencrvs-core Docker images which you can build after cherry-picking this commit.



**External reading:**

We point all users to Elasticsearch and Amazon own content that discusses this issue:

Amazon: [https://aws.amazon.com/what-is/opensearch/](https://aws.amazon.com/what-is/opensearch/)

Elastic: [https://www.elastic.co/what-is/opensearch](https://www.elastic.co/what-is/opensearch) / [https://www.elastic.co/pricing/faq/licensing](https://www.elastic.co/pricing/faq/licensing)





