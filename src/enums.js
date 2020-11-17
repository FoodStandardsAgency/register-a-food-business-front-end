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
  DOMESTIC: {
    key: "DOMESTIC",
    value: "Home or domestic premises"
  }
};

const CustomerTypeEnum = {
  OTHER_BUSINESSES: {
    key: "OTHER_BUSINESSES",
    value: "Other businesses"
  },
  END_CONSUMER: {
    key: "END_CONSUMER",
    value: "End consumer"
  },
  BOTH: {
    key: "BOTH",
    value: "End consumer and other businesses"
  }
};

const OpeningDaysEnum = {
  opening_day_monday: {
    key: "opening_day_monday",
    value: "Monday"
  },
  opening_day_tuesday: {
    key: "opening_day_tuesday",
    value: "Tuesday"
  },
  opening_day_wednesday: {
    key: "opening_day_wednesday",
    value: "Wednesday"
  },
  opening_day_thursday: {
    key: "opening_day_thursday",
    value: "Thursday"
  },
  opening_day_friday: {
    key: "opening_day_friday",
    value: "Friday"
  },
  opening_day_saturday: {
    key: "opening_day_saturday",
    value: "Saturday"
  },
  opening_day_sunday: {
    key: "opening_day_sunday",
    value: "Sunday"
  }
};

const ImportExportActivitiesEnum = {
  IMPORT: {
    key: "IMPORT",
    value: "Directly import"
  },
  EXPORT: {
    key: "EXPORT",
    value: "Directly export"
  },
  BOTH: {
    key: "BOTH",
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

module.exports = {
  RegistrationRoleEnum,
  OperatorTypeEnum,
  EstablishmentTypeEnum,
  CustomerTypeEnum,
  OpeningDaysEnum,
  ImportExportActivitiesEnum,
  WaterSupplyEnum
};
