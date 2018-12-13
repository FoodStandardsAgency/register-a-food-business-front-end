# Changing the form order

The `register-a-food-business-service` repository contains a seed script that can be used to add a new version of the form 'path' to the config database on Azure.

## Steps:

1.  Set up the `register-a-food-business-service` repository by following its contribution guidelines.
2.  Log into the Azure portal.
3.  Select the `prod-back-end-config` CosmosDB instance from the resources list.
4.  Select Data Explorer from the resource menu.
5.  Select `configVersion` from the collections list.
6.  Select `Documents`.
7.  Select the document with the latest version number.
8.  In the `register-a-food-business-service` repository, copy and paste the contents of this document into a new JSON file with the following location and name: `/src/connectors/configDb/configDb-seed/templates/configVersion.json`.
9.  Update the value of the `_id` key to be a new version number, based on [Semver](https://semver.org/) rules.
10. Inside the `path` object, make changes to the order of the page objects and to the switch configuration as required. For more information about the path, see [The dynamic form path](./the-dynamic-form-path.md).
11. Run the `seed:configdb` script in the `package.json` and seed `configVersion.json` to all environments' config databases by following the interactive instructions.
12. Update the `REGISTRATION_DATA_VERSION` environment variable in your local `.env` file to be the new config version number.
13. Test your changes locally.
14. Update the `REGISTRATION_DATA_VERSION` environment variable in the `register-a-food-business` front-end app in all environments on the Azure portal, or one-by-one to test thoroughly at each stage.
