# 3.2.2 Configure administrative address divisions

Now that you have a repository ready for your country configuration code, you can begin the configuration process.  [Administrative division](https://en.wikipedia.org/wiki/Administrative\_division) structure must be standardised and configured in the application in order to accurately geo-locate registrations and provide accurate registration performance analytics and vital statistics exports. &#x20;

OpenCRVS fully appreciates that within many countries, addresses are not standardised in some urban and rural areas.  We believe passionately that this should not be a hindrance to registration, so we have gone out of our way to enable optional and un-standardised urban and rural address levels.   However, **we must ensure at least some administrative structure standardisation in order to calculate key metrics.**&#x20;

After testing OpenCRVS in many countries, **we decided to enforce 2 levels of administrative structure standardisation.  Internally we use the terms "state" and "district"** ( "district" being a sub-level and therefore part of a "state").  **You can present these levels to the user labelled in any way that you want, such as "Province" for "state", and "County" for "district"**, as we have done in our demo country Farajaland.  This labelling process is simply achieved in content management.

Regarding the analytical dependency, one of the key performance metrics for a good civil registration system is to be able to present what is referred to as the "Completeness rate" for a state or district.  **Completeness rates are the primary measure of performance of a CRVS system. They are used as a form of international comparison and the indicator selected to measure** [**SDG target 16.9**](https://unstats.un.org/sdgs/metadata/?Text=\&Goal=16\&Target=16.9)**.**  In order to calculate the completeness rate, we use the following formula:

**Total: ((crude birth or death rate \* total population) / 1000) \* (target estimated days / 365))**

**Male: ((crude birth or death rate \* population of males) / 1000) \* (target estimated days / 365))**

**Female: ((crude birth or death rate \* population of females) / 1000) \* (target estimated days / 365))**

Therefore in order to calculate completeness rate, **you are required to have available from your country's statistical department, the value for the crude birth rate and total population divided by gender for the lowest standardised level administrative area, ie district (crude death rate is a national value)**.  In our experience it is unrealistic to expect that countries have accurate data for these parameters below a 2nd administrative level.  This is one of the main reasons why we decided to restrict standardisation to only state and district.   The other reason is that we only recommend showing 2 administrative levels on a birth or death certificate, so as to protect a citizens personally identifiable information on a printed artefact.

The rest of the address fields that can be completed by a user are all optional.  The form question labels can be renamed to suit your needs in content management.  The address fields support all urban standardisations such as "zipcode", international addresses and additionally custom address lines for rural areas that can be used for un-standardised data such as "village elder".

We begin by creating source files for importing your states and districts.  Each one of these locations will be converted into a [FHIR Location](https://build.fhir.org/location.html) object.

****
