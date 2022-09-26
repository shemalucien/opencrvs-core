# Releases

### **OpenCRVS Release Process & Calendar**



The following release process commences with the v1.1.0 release.  You can read more about how we developed our release process, branching model and quality gates in this blog post.

The OpenCRVS Core team issue product releases once every 4 months with each release receiving 6 months of bug fix (hot-fix) support.

| Jan    | Feb | Mar | Apr  | May    | Jun | Jul | Aug  | Sep    | Oct | Nov | Dec  |
| ------ | --- | --- | ---- | ------ | --- | --- | ---- | ------ | --- | --- | ---- |
| Stable |     |     | Beta | Stable |     |     | Beta | Stable |     |     | Beta |



### **OpenCRVS Semantic Versioning**

As a digital public good we are aware that implementers may only periodically perform upgrades. It is not sustainable for us or our community to follow the strict interpretation of semantic versioning in our full-stack microservice application, where every new feature would have a dedicated minor release. Our interpretation of semantic versioning for our project should therefore be interpreted is as follows.

1. MAJOR version when we make major architectural or design changes that are not backwards compatible and without automated migrations.
2. MINOR version when we introduce backwards compatible functionality.  We may also introduce automated migration scripts and migration notes to cater for any non backwards compatible features in minor releases.&#x20;
3. PATCH version when we introduce backwards compatible bug fixes

Additional labels for "stable" and "beta" metadata are available as extensions to the MAJOR.MINOR.PATCH format. E.G. **v1.1.0-stable**



### **OpenCRVS Gitflow and "Quality Gates"**

We follow the "[Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)" branching model with a "Quality Gate" concept (which defines specific quality assurance flows for features, beta releases, stable releases and hot-fixes).  It is imperative that implementers understand the concept of "Gitflow" when either contributing to core or merging in updates from the Farajaland country configuration package.



Referring to the Gitflow and Quality Gate diagrams, you should be able to understand the following:

A "stable" release has  undergone not only automated testing but manual regression testing.

A "beta" release has only undergone automated testing

Any git hash tagged Dockerhub image is a new "feature" that has been recently merged into the active and unstable develop branch.  These images are not in an official beta or stable release but available to experimenters and the core development team nonetheless.

OWASP security penetration tests by a CREST certified 3rd party occur once every 12 months or on every major release.





