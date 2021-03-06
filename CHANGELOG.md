## Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## v1.41.8 - 12th December 2018

### Modified

* Removed arrows from date input boxes

## v1.41.7 - 12th December 2018

### Modified

* Fix issue where business types with whitespace failed validation

## v1.41.6 - 16th November 2018

### Modified

* Made Summary Table accessible for both pages it appears on. Added invisible column headers, Voiceover accessibility, captions for split table sections.

## v1.41.5 - 16th November 2018

### Modified

* Added error summary box to all pages with validator errors

## v1.41.4 - 16th November 2018

### Modified

* Added hint text for external links and registration details title on summary confirmation page (accessibility)
* Added aria label, got rid of preselection and changed autocomplete to inline on business-type page (accessibility)
* Added aria labels for change buttons on registration-summary (accessibility)

## v1.41.3 - 15th November 2018

### Modified

* Improved accessibility of summary/details drop-down elements with skip-links

## v1.41.2 - 14th November 2018

### Modified

* Improved hierarchy of H1, H2, H3 etc. (accessibility)

## v1.41.1 - 14th November 2018

### Modified

* Changed items to be lists
* changed postcode to be paragraph instead of Heading

## v1.41.0 - 14th November 2018

### Added

* Added HTML 'regions'/'landmarks' for banner, main, and footer (accessibility)

## v1.40.6 - 9th November 2018

### Modified

* Made trading date fields persist data

## v1.40.5 - 7th November 2018

### Modified

* Fixed manual address input pages not correctly using council information in URL

## v1.40.4 - 6th November 2018

### Modified

* Stopped path editing functions from only using switches from pages up to and including current page. Now uses switches from all pages.

## v1.40.3 - 5th November 2018

### Modified

* SDB-1091: Added Change Button for Opening Days on Registration Summary

## v1.40.2 - 29th October 2018

### Modified

* SDB-133: Added Change Button for Operator Type on Registration Summary

## v1.40.1 - 8th October 2018 (released)

### Modified

* SDB-963: Fixed bug - Trim all blank spaces from answers

## v1.40.0 - 4th October 2018 (released)

### Added

* SDB-922: Added feature toggling and sending of data version number to back end service

## v1.39.0 - 3rd October 2018 (released)

### Added

* SDB-52 establishmentOpeningDays

## v1.38.4 - 1st October 2018 (released)

### Modified

* Updated Gov.uk package to v0.2.12

## v1.38.3 - 28th September 2018 (released)

### Modified

* Swapped order of establishment type and establishment address pages

## v1.38.2 - 27th September 2018 (released)

### Modified

* Updated summary table

## v1.38.1 - 24th September 2018 (released)

### Modified

* Default to addressline1 when premise doesn't exist in address lookup

## v1.38.0 - 19th September 2018 (released)

### Added

* SDB-111 Added other details page

## v1.37.3 - 11th September 2018 (unreleased)

### Modified

* Fix editPath bug where saved future answers were taken into account

## v1.37.2 - 7th September 2018 (unreleased)

### Added

* SDB-833 Local council Phone number to summary confirmation page

## v1.37.1 - 5th September 2018 (unreleased)

### Modified

* Fix Snyk vulnerabilities by removing and updating packages

## v1.37.0 - 5th September 2018 (unreleased)

### Added

* SDB-647 FSA Footer

## v1.36.0 - 4th September 2018 (unreleased)

### Added

* Added global log coverage

## v1.35.3 - 4th September 2018 (unreleased)

### Modified

* Added missing contact_representative_role and contact_representative_name on submit

## v1.35.2 - 3rd September 2018 (unreleased)

### Modified

* Fixed bug on opening date pages - cookie banner now hides and shows correctly

## v1.35.1 - 31st August 2018 (unreleased)

### Modified

* Fixed white border around app in production mode

## v1.35.0 - 30th August 2018 (unreleased)

### Added

* SDB-500 Cookie banner

## v1.34.1 - 30th August 2018 (unreleased)

### Added

* Unit testing for LC lookup

## v1.34.0 - 30th August 2018 (unreleased)

### Added

* Secure cookies and timeout rules

## v1.33.2 - 29th August 2018 (unreleased)

### Modified

* QA route modified to work with new URL format containing council

## v1.33.1 - 28th August 2018 (unreleased)

### Added

* Redirect routes

## v1.33.0 - 28th August 2018 (unreleased)

### Added

* SDB-733 Custom domain names per LC

## v1.32.0 - 23rd August 2018 (unreleased)

### Added

* Added Google Tag Manager tracking code

## v1.31.4 - 17th August 2018 (unreleased)

### Modified

* SDB-727 IE11 business type box fix

## v1.31.3 - 15th August 2018 (unreleased)

### Modified

* SDB-640 Links to open in new tabs

## v1.31.2 - 15th August 2018 (unreleased)

### Added

* SDB-22 LC Notify response to integration and contract tests

## v1.31.1 - 14th August 2018 (unreleased)

### Modified

* Update to business-type-transformed.json file

## v1.31.0 - 13th August 2018 (unreleased)

### Added

* SDB-48 FBO confirmation email to registration summary

## v1.30.0 - 9th August 2018 (unreleased)

### Added

* SDB-124 business import and export activities

## v1.29.1 - 8th August 2018 (unreleased)

### Modified

* Change invalid business type error message (design review)

## v1.29.0 - 8th August 2018 (unreleased)

### Added

* cleansession route

## v1.28.0 - 8th August 2018 (unreleased)

### Added

* SDB-5 business type lookup

## v1.27.2 - 1st August 2018 (unreleased)

### Modified

* Passed addressLookups through submit route

## v1.27.1 - 1st August 2018 (unreleased)

### Modified

* Update Next to 6.1.1

## v1.27.0 - 1st August 2018 (unreleased)

### Added

* SDB-47 Registration confirmation number

## v1.26.0 - 1st August 2018 (unreleased)

### Added

* SDB-12 Advanced address lookup

## v1.25.0 - 31st July 2018 (unreleased)

### Added

* SDB-236 Registration submission date

## v1.24.1 - 31st July 2018 (unreleased)

### Modified

* Updated application-complete page to registration-summary page and reflect design

## v1.24.0 - 27th July 2018 (unreleased)

### Added

* SDB-50 Establishment Address Type

## v1.23.0 - 27th July 2018 (unreleased)

### Modified

* Modified output of data transforms to match new data structure

## v1.22.2 - 27th July 2018 (unreleased)

### Modified

* Design review fixes for edit summary page

## v1.22.1 - 27th July 2018 (unreleased)

### Modified

* Bugfix for edit mode when clicking the browser back button

## v1.22.0 - 25th July 2018 (unreleased)

### Added

* SDB-157 Edit summary page - items not influencing registration flow

## v1.21.2 - 17th July 2018 (unreleased)

### Modified

* Removed day, month, year from submission data, combined establishment_opening_date already exists

## v1.21.1 - 17th July 2018 (unreleased)

### Modified

* Removed day, month, year from submission data, combined establishment_opening_date already exists

## v1.21.0 - 17th July 2018 (unreleased)

### Added

* SDB-114 Adding proactive establishment trading date
* SDB-115 Adding retroactive establishment trading date

## v1.20.0 - 13th July 2018 (unreleased)

### Added

* SDB-252 Adding Error summary boxes to all pages

## v1.19.0 - 13th July 2018 (unreleased)

### Added

* SDB-373 Adding Beta banner to all pages

## v1.18.1 - 12th July 2018 (unreleased)

### Modified

* Modifield validateStreet to be validateOptionalString

## v1.18.0 - 12th July 2018 (unreleased)

### Added

* SDB-241 Contact representative

## v1.17.0 - 11th July 2018 (unreleased)

### Added

* SDB-117 Customer Type

## v1.16.0 - 10th July 2018 (unreleased)

### Added

* Modified session storage to use database

## v1.15.0 - 10th July 2018 (unreleased)

### Added

* SDB-113 Added establishment contact details page with 'reuse operator contact details' button
* Add switches route and controller

## v1.14.4 - 4th July 2018 (unreleased)

### Modified

* Adding typechecking to all pages

## v1.14.3 - 3rd July 2018 (unreleased)

### Modified

* Adding summary text to operator charity details page

## v1.14.2 - 3rd July 2018 (unreleased)

### Modified

* Added config.js file to set application variables from environment variables, which enables isolating units for testing

## v1.14.1 - 2nd July 2018 (unreleased)

### Modified

* Enabled QA route to be flexible - can redirect to any page following injection

## v1.14.0 - 2nd July 2018 (unreleased)

### Added

* SDB-40 Charity details

### Modified

* Bypassed console errors for MultiChoice component

## v1.13.3 - 29th June 2018 (unreleased)

### Modified

* Modified deploy script to include start command.
* Modifed index.js to remove async reference

## v1.13.2 - 29th June 2018 (unreleased)

### Modified

* Updated to govuk-react 0.2.7 and adjusted front-end to account for the changes

## v1.13.1 - 28th June 2018 (unreleased)

### Added

* SDB-244 Added special route for QA test data injection for Registration Summary

## v1.13.0 - 28th June 2018 (unreleased)

### Added

* SDB-1 Operator Address

## v1.12.1 - 28th June 2018 (unreleased)

### Modified

* Make all 'Continue' green buttons re-usable from a new component, with consistent IDs
* Add ID to link for testing

## v1.12.0 - 28th June 2018 (unreleased)

### Added

* SDB-232 Back link routing and addition to all pages

## v1.11.1 - 26th June 2018 (unreleased)

### Modified

* Fix persistence of answers that have been removed since previous submit

## v1.11.0 - 25th June 2018 (unreleased)

### Added

* SDB-36 Added limited company details

## v1.10.0 - 25th June 2018 (unreleased)

### Added

* SDB-54 Registration Role (note: misnamed as operator type in commits)

## v1.9.0 - 25th June 2018 (unreleased)

### Added

* Session cleaning service for obsolete answers

## v1.8.1 - 21st June 2018 (unreleased)

### Modified

* Refactor validation service to use register-a-food-business-validation library

## v1.8.0 - 21st June 2018 (unreleased)

### Added

* SDB-243 Implemented ContentItem vertical spacing method

## v1.7.1 - 21st June 2018 (unreleased)

### Added

* SDB-240 Added autocomplete tags to input fields

## v1.7.0 - 20th June 2018 (unreleased)

### Modified

* Refactored app.server.js into routes.js, index.js, /controllers, server.js. Added tests to get coverage to 100%

## v1.6.0 - 20th June 2018 (unreleased)

### Added

* Added IDs to all buttons for QA

## v1.5.0 - 15th June 2018 (unreleased)

### Added

* SDB-146 - Simple Contact Details

## v1.4.0 - 15th June 2018 (unreleased)

### Added

* SDB-8 - Registration summary

## v1.3.0 - 14th June 2018 (unreleased)

### Added

* SDB-35 - Operator Name

## v1.2.1 - 13th June 2018 (unreleased)

### Modified

* Fixed establishment trading name info typo

## v1.2.0 - 13th June 2018 (unreleased)

### Added

* SDB-4 - Establishment trading name

## v1.1.0 - 6th June 2018 (unreleased)

### Added

* SDB-42 - Route provider
* SDB-44 - Back end connection
* SDB-34 - Submit a registration
* SDB-49 - Establishment address (without info drop down)
* SDB-58 - Landing page
