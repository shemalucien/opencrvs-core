---
description: How to create and manage access to OpenCRVS' interoperability functionality
---

# Create a client

In order to interoperate with OpenCRVS, you must first create an official client.

Only a National System Administrator role can create a client. E.G. In our example for our fake country Farajaland, this is the user: **j.campbell**

1. Login to OpenCRVS as the user: **j.campbell**
2. Use the left navigation to select the **Configuration** > **Integrations** section.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 11.34.03.png" alt=""><figcaption></figcaption></figure>

3\. Click **+ Create client**

4\. You will see a modal overlay where you can select the type of client you wish to create.  The business functionality available for each client is explained in subsequent pages in this section of our documentation.

**The type of client you create is important and can only perform API requests associated with the business functionality relevant to that type.**  A Record Search client is not authorized to perform an Event Notification for example.&#x20;

You must give each client a unique name.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 11.34.17.png" alt=""><figcaption><p>Creating an Event notification client</p></figcaption></figure>

5\. When you click "Create", you will be shown the authentication details for the client along with a SHA Secret used to sign, encrypt, decrypt and verify the authenticity of payloads.

{% hint style="warning" %}
**You must copy these keys now!  The Client Secret will never be displayed to you again and it cannot be retrieved from our database as it is encrypted.**
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 11.35.15.png" alt=""><figcaption></figcaption></figure>

6\. You can manage existing clients by using the **3 dots** menu after the client has been created.  You can **reveal the Client ID and SHA Secret keys** at any time and **refresh the Client Secret** to create a new one by selecting "**Reveal Keys**". &#x20;

{% hint style="warning" %}
When you refresh a Client Secret, the old secret will no longer work for authentication.
{% endhint %}

You can also temporarily "**Deactivate**" and "**Enable**" a client or alternatively "**Delete**" it.

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 11.35.35.png" alt=""><figcaption></figcaption></figure>

{% hint style="danger" %}
All client behaviour is audited and is ultimately the personal responsibility of the National System Administrator of OpenCRVS that created the client.  Protect citizen data and do not expose access unnecessarily, as you may be in breach of local privacy laws.
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 11.34.26.png" alt=""><figcaption></figcaption></figure>



<figure><img src="../../.gitbook/assets/Screenshot 2023-01-11 at 11.34.39.png" alt=""><figcaption></figcaption></figure>
