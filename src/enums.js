const RegistrationRoleEnum = {
  SOLETRADER: {
    key: "SOLETRADER",
    value: "Sole trader"
  },
  PARTNERSHIP: {
    key: "PARTNERSHIP",
    value: "Partnership"
  },
  REPRESENTATIVE: {
    key: "REPRESENTATIVE",
    value: "(registered by a representative)"
  }
};

const OperatorTypeEnum = {
  SOLETRADER: {
    key: "SOLETRADER",
    value: "Sole trader"
  },
  PARTNERSHIP: {
    key: "PARTNERSHIP",
    value: "Partnership"
  },
  PERSON: {
    key: "PERSON",
    value: "A person (registered by a representative)"
  },
  COMPANY: {
    key: "COMPANY",
    value: "A company (registered by a representative)"
  },
  CHARITY: {
    key: "CHARITY",
    value: "A charity (registered by a representative)"
  }
};

const EstablishmentTypeEnum = {
  COMMERCIAL: {
    key: "COMMERCIAL",
    value: "Place of business or commercial premises"
  },
  MOBILE: {
    key: "MOBILE",
    value: "Mobile or moveable premises"
  },
  DOEMSTIC: { 
    key: "DOMESTIC",
    value: "Home or deomtstic premises"
  }
};

const CustomerTypeEnum = {
  OTHER_BUSINESSES: {
    key: "OTHER_BUSINESSES",
    value: "Other businesses"
  },
  END_CONSUMERS: {
    key: "END_CONSUMERS",
    value: "End consumer"
  },
  BOTH: {
    key: "BOTH",
    value: "End consumer and other businesses"
  }
};

const ImportExportActivitiesEnum = {
  IMPORT: {
    key: "IMPORT",
    value: "Direclty import"
  },
  EXPORT: {
    key: "EXPORT",
    value: "Directly export"
  },
  IMPORTANDEXPORT: {
    key: "IMPORTANDEXPORT",
    value: "Directly import and export"
  },
  NONE: { 
    key: "NONE",
    value: "None"
  }
};

const WaterSupplyEnum = {
  PUBLIC: {
    key: "PUBLIC",
    value: "Public"
  }, 
  PRIVATE: {
    key: "PRIVATE",
    value: "Private"
  },
  BOTH: {
    key: "BOTH",
    value: "Public and private"
  }
};

module.exports = { RegistrationRoleEnum, OperatorTypeEnum, EstablishmentTypeEnum, CustomerTypeEnum, ImportExportActivitiesEnum, WaterSupplyEnum };
