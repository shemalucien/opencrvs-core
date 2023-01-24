# 3.2.2 Set up administrative address divisions

{% hint style="warning" %}
As part of **OpenCRVS v1.2.0-beta (released December 2023),** you can now setup as many administrative divisions as you would like using [Humdata](https://data.humdata.org/) standards.  As a result these pages are being re-written/deprecated.  Please return in a few days for up to date content. &#x20;
{% endhint %}

Now that you have a repository ready for your country configuration code, you can begin the configuration process.  [Administrative division](https://en.wikipedia.org/wiki/Administrative\_division) structure must be standardised and configured in the application in order to accurately geo-locate registrations and provide accurate registration performance analytics and vital statistics exports. &#x20;

OpenCRVS fully appreciates that within many countries, addresses are not standardised in some urban and rural areas.  We believe passionately that this should not be a hindrance to registration, so we have gone out of our way to enable optional and un-standardised urban and rural address levels. However, we must ensure at least some administrative structure standardisation in order to calculate key metrics. &#x20;

After testing OpenCRVS in many countries, you can configure between 1 and 5 administrative subdivisions.  These must map into the FHIR Location standard.  Therefore, internally we use the terms "state" for Location Level 1 and "district" ( "district" being a sub-level and therefore part of a "state") as Location Level 2.  Subsequent Location Levels 3-5 will populate Address lines in the FHIR Location object at set indices documented [here](https://github.com/opencrvs/opencrvs-core/tree/develop/packages/client/src/forms/configuration).

You can present these location levels to the user labelled in any way that you want, such as "Province" for "state", and "County" for "district", as we have done in our demo country Farajaland.  This labelling process is simply achieved in content management by [editing the JSON directly](https://github.com/opencrvs/opencrvs-farajaland/blob/develop/src/features/languages/content/client/client.json), such as [here](https://github.com/opencrvs/opencrvs-farajaland/blob/28ccbbceb1b1fa7b8323af71701f35beff38d372/src/features/languages/content/client/client.json#L1218).

Regarding the analytical dependency, one of the key performance metrics for a good civil registration system is to be able to present what is referred to as the "Completeness rate" for a state or district.  Completeness rates are the primary measure of performance of a CRVS system. They are used as a form of international comparison and the indicator selected to measure [SDG target 16.9](https://unstats.un.org/sdgs/metadata/?Text=\&Goal=16\&Target=16.9).  In order to calculate the completeness rate, we use the following formula:

* Total: ((crude birth or death rate \* total population) / 1000) \* (target estimated days / 365))
* Male: ((crude birth or death rate \* population of males) / 1000) \* (target estimated days / 365))
* Female: ((crude birth or death rate \* population of females) / 1000) \* (target estimated days / 365))

Therefore in order to calculate completeness rate, you are required to have available from your country's statistical department, the value for the crude birth rate and total population divided by gender for the administrative areas. &#x20;

In our experience it is unrealistic to expect that countries have accurate data for each level, so these are automatically calculated by the system where they have not been explicitly supplied.

The rest of the address fields that can be completed by a user are all optional and should be left blank if not required.  The form question labels can be renamed to suit your needs in content management.  The address fields support all urban standardisations such as "zipcode", international addresses and additionally custom address lines for rural areas that can be used for un-standardised data such as "village elder".

We begin by creating source files for importing your administrative subdivisions.  Each one of these locations will be converted into a [FHIR Location](https://build.fhir.org/location.html) object.

****
