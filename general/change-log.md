# Change log

**OpenCRVS v1.0.1** is a major release of OpenCRVS Core. It is to be used in conjunction with a forked country configuration release [v1.0.1](https://github.com/opencrvs/opencrvs-farajaland/releases/tag/v1.0.1)

This release contains major new features and improvements, a number of dependency upgrades and many bug-fixes. The release includes:

* Correct a record
* Record audit
* Registration form configuration user interface
* Application configuration user interface
* Certificate configuration user interface
* Birth and death form default configuration refresh
* Performance improvements
* New user roles (National Registrar, National System Administrator, Performance Manager)
* UI design refresh of the navigation, workqueues and all other pages
* Archive / Reinstate records
* Conflicts
* 3rd party penetration test fixes
* Dependency upgrades
* Miscellaneous bugfixes and refactor

For a full list of all updates, see [https://github.com/opencrvs/opencrvs-core/releases](https://github.com/opencrvs/opencrvs-core/releases).&#x20;

All following major releases of OpenCRVS will document any breaking changes and a migration guide for system administrators.

### Major Features

The following explains in more detail each major feature that has been included in this release.

#### Correct a record

It is now possible for a Registrar to be able to make a correction to a registered birth or death record. The correct record process supports uploading supporting legal documentation and configuration of any fees associated. Each correction is tracked and audited.

#### Record audit

All actions that are performed on a record are tracked, audited and displayed to the user when downloading details of a record. This download process is also tracked and audited in order to understand which users have had access to personally identifiable information. This feature allows users to easily monitor changes to the status of the declaration, any corrections that have been made to it and audit any access requested to personally identifiable information of a citizen by any civil registration staff member.

#### Registration form configuration user interface

Previously, birth and death form configuration was managed via a complicated JSON file in the country configuration repository. There is now an easy to use, form configuration user interface for National System Administrators to draft, edit, preview, test and publish the declaration forms. The old JSON approach has been deprecated.

#### Application configuration user interface

Previously, application settings such as fees, registration target deadlines, country logo and phone number validation regular expressions, were managed manually via text config files in the country configuration repository. There is now an easy to use, application configuration user interface for National System Administrators to configure these values. The old config file approach has been deprecated.

#### Certificate configuration user interface

Previously, certificate configuration was managed via a complicated JSON file in the country configuration repository. There is now an easy to use, certificate configuration user interface for National System Administrators that allows them to upload an SVG design with handlebars for registration data. The certificates can be previewed and printed in this interface. The old JSON approach has been deprecated.

#### Birth and death form default configuration refresh

The default, standardised OpenCRVS recommended birth and death form configuration comes pre-packaged in OpenCRVS. The question flow has been further optimised after feedback from our OpenSource community of civil registrars.

#### Performance improvements

The Performance user interface has been completed refreshed. It now includes detailed analytics on completeness rates, sources of applications, declaration status, field agent performance, breakdown of nationwide to specific office analytics and comparison between number of registrars and population numbers.

#### New user roles (National Registrar, National System Administrator, Performance Manager)

The **National Registrar** role has been created. This is a registrar's super admin and can view any record at any status nationwide as well as being able to monitor the performance of any office.&#x20;

The **National System Administrator** role has the ability to configure the form, certificate and application settings as well as create/edit/deactive any user nationwide.&#x20;

The **Performance Manager** role has no access to any PII in any record; they can access nationwide performance analytics only. This is an ideal 3rd party role for a statistician.

#### UI design refresh of the navigation, workqueues and other pages

System administrators who have tried out previous versions of OpenCRVS will notice a complete design refresh of the navigation, workqueues and more. The new look and feel is cleaner, easier to configure for your national needs and makes better use of screen real estate.

#### Archive / Reinstate

As long as the declaration has been submitted for review, it is now possible to archive an existing record, thus removing it from any workqueue. As every submitted declaration has a unique tracking ID, it can be retrieved in nationwide searches by a Registrar user and reinstated.

#### Conflicts

When a Registration Agent or a Registrar downloads a declaration in order to perform an action, they are "Assigned" the record. Other users will notice if they search for the same record that it is already assigned. Registration Agents must ask a Registrar to check and "Unassign" the record. This prevents users from making conflicting changes to the same record. A Registrar has the authority to "Unassign" the record from an individual who has it "Assigned" to them to overrule this process.

#### 3rd party penetration test fixes

This version of OpenCRVS has undergone another round of 3rd party security penetration testing by the consultancy [GoFore](https://gofore.com/) - [NORAD's](https://www.norad.no/) preferred security testing provider. Any issue that was discovered during the penetration test has been resolved.

#### Dependency upgrades

In this release we have forked and upgraded [Hearth](https://github.com/opencrvs/hearth), [Jembi's](https://www.jembi.org/) FHIR database server originally located [here](https://github.com/jembi/hearth). We resolved all dependencies that had any open security warning.

#### Miscellaneous bugfixes and refactor

A host of bugfixes were discovered and prioritsed by our QA team.

**For full details of all product updates, visit** [**https://github.com/opencrvs/opencrvs-core/releases**](https://github.com/opencrvs/opencrvs-core/releases)****
