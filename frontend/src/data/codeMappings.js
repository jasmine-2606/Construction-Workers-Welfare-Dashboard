// =========================================
// PHASE 29 — DATA CODE MAPPINGS
// =========================================


// =========================================
// 29.1 — GENDER
// =========================================

export const genderMapping = {
  1: "Code 1",
  2: "Code 2",
};

export const getGenderLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return (
    genderMapping[numericCode] ||
    `Code ${numericCode}`
  );
};


// =========================================
// 29.2 — REGISTRATION STATUS
// =========================================

export const registrationStatusMapping = {
  1: "Code 1",
  2: "Code 2",
  3: "Code 3",
  4: "Code 4",
  5: "Code 5",
  8: "Code 8",
  9: "Code 9",
};

export const getRegistrationStatusLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return (
    registrationStatusMapping[numericCode] ||
    `Code ${numericCode}`
  );
};


// =========================================
// 29.3 — EMPLOYMENT / NATURE OF EMPLOYMENT
// =========================================

export const employmentMapping = {
  1: "Code 1",
  2: "Code 2",
  3: "Code 3",
  4: "Code 4",
  5: "Code 5",
  6: "Code 6",
  8: "Code 8",
  9: "Code 9",
  13: "Code 13",
  14: "Code 14",
  15: "Code 15",
  42: "Code 42",
  47: "Code 47",
  52: "Code 52",
};

export const getEmploymentLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return (
    employmentMapping[numericCode] ||
    `Code ${numericCode}`
  );
};


// =========================================
// 29.4 — DISTRICT MAPPING
// =========================================

export const districtMapping = {
  1: "Adilabad",
  2: "Kumurambheem Asifabad",
  3: "Mancherial",
  4: "Nirmal",
  5: "Nizamabad",
  6: "Jagtial",
  7: "Peddapalli",
  8: "Jayashankar Bhupalpally",
  9: "Bhadradri Kothagudem",
  10: "Mahabubabad",
  11: "Warangal",
  12: "Hanumakonda",
  13: "Karimnagar",
  14: "Rajanna Sircilla",
  15: "Kamareddy",
  16: "Sangareddy",
  17: "Medak",
  18: "Siddipet",
  19: "Jangaon",
  20: "Yadadri Bhuvanagiri",
  21: "Medchal-Malkajgiri",
  22: "Hyderabad",
  23: "Rangareddy",
  24: "Vikarabad",
  25: "Mahabubnagar",
  26: "Jogulamba Gadwal",
  27: "Wanaparthy",
  28: "Nagarkurnool",
  29: "Nalgonda",
  30: "Suryapet",
  31: "Khammam",
  32: "Mulugu",
  33: "Narayanpet",
};

export const getDistrictLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return (
    districtMapping[numericCode] ||
    `Code ${numericCode}`
  );
};


// =========================================
// 29.5 — OTHER REQUIRED MAPPINGS
// =========================================


// -----------------------------------------
// CASTE
// -----------------------------------------

export const casteMapping = {
  1: "Code 1",
  3: "Code 3",
  5: "Code 5",
};

export const getCasteLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return (
    casteMapping[numericCode] ||
    `Code ${numericCode}`
  );
};


// -----------------------------------------
// MEMBER TRADE UNION
// -----------------------------------------

export const getTradeUnionLabel = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }

  if (
    value === true ||
    value === "true"
  ) {
    return "Yes";
  }

  if (
    value === false ||
    value === "false"
  ) {
    return "No";
  }

  return `Code ${value}`;
};


// -----------------------------------------
// MIGRANT WORKER
// -----------------------------------------

export const getMigrantWorkerLabel = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }

  const numericCode = Number(value);

  return `Code ${numericCode}`;
};


// -----------------------------------------
// MARITAL STATUS
// -----------------------------------------

export const maritalStatusMapping = {
  1: "Code 1",
  2: "Code 2",
};

export const getMaritalStatusLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return (
    maritalStatusMapping[numericCode] ||
    `Code ${numericCode}`
  );
};


// -----------------------------------------
// MANDAL
// -----------------------------------------

export const getMandalLabel = (code) => {
  if (
    code === null ||
    code === undefined ||
    code === ""
  ) {
    return "Unknown";
  }

  const numericCode = Number(code);

  return `Code ${numericCode}`;
};