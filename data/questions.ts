export const questions = [
  // =========================
  // LAYER 1 — APPLICABILITY
  // =========================
  {
    id: "processesDataInIndia",
    layer: 1,
    title: "Do you process digital personal data in India?",
    description:
      "Digital personal data includes information about identifiable people in digital form — such as names, phone numbers, email addresses, employee records, customer databases, CCTV footage, or app user information.",
    type: "boolean",
  },
  {
    id: "offersGoodsOrServicesToPeopleInIndia",
    layer: 1,
    showIf: {
      processesDataInIndia: false,
    },
    title:
      "Do you offer products or services to people in India and use their digital personal data?",
    description:
      "For example: an overseas SaaS platform serving Indian users, a foreign app collecting Indian customer information, or an e-commerce business shipping to India.",
    type: "boolean",
  },

  // =========================
  // LAYER 2 — ROLE
  // =========================
  {
    id: "controlsWhyAndHowDataIsUsed",
    layer: 2,
    title: "Does your organisation decide why and how personal data is used?",
    description:
      "This usually means your organisation decides things like: what personal data to collect, why it is needed, who can access it, which systems use it, and how long it is kept. Examples: employers managing employee data, businesses running customer databases, apps deciding how user accounts work.",
    type: "boolean",
  },
  {
    id: "processesDataOnInstructions",
    layer: 2,
    showIf: {
      controlsWhyAndHowDataIsUsed: false,
    },
    title:
      "Do you handle or use personal data mainly based on another organisation's instructions?",
    description:
      "This usually means another organisation decides why the data is used, what data is collected, and how long it is kept — while your organisation provides services or systems involving that data. Examples: cloud hosting providers, payroll processors, SaaS vendors, outsourced HR or IT providers.",
    type: "boolean",
  },

  // =========================
  // LAYER 3 — RELATIONSHIPS
  // =========================
  {
    id: "relationshipCategories",
    layer: 3,
    showIf: {
      flowState: "CONTROLLER_PATH",
    },
    title: "Whose personal data does your organisation handle?",
    description: "Select all categories that apply.",
    type: "multi-select",
    options: [
      { value: "customers", label: "Customers or users" },
      {
        value: "marketing_leads",
        label: "Prospective customers / marketing leads",
      },
      { value: "employees", label: "Employees" },
      { value: "job_applicants", label: "Job applicants" },
      {
        value: "contractors",
        label: "Contractors / interns / consultants",
      },
      { value: "vendors", label: "Vendors / service providers" },
      { value: "visitors", label: "Visitors / CCTV / physical access" },
    ],
  },

  // =========================
  // LAYER 4 — RISK FACTORS
  // =========================
  {
    id: "processesChildData",
    layer: 4,
    showIf: {
      flowState: "CONTROLLER_PATH",
    },
    title: "Do you process personal data relating to children?",
    description:
      "Examples: educational platforms, gaming services, family applications, or any product or service used by people under 18.",
    type: "boolean",
  },
  {
    id: "offshoreTransfers",
    layer: 4,
    showIf: {
      flowState: "CONTROLLER_PATH",
    },
    title:
      "Do you transfer or allow access to personal data outside India?",
    description:
      "Examples: cloud hosting on overseas servers, international teams accessing data, global SaaS platforms, or overseas vendors.",
    type: "boolean",
  },
  {
    id: "processingFootprint",
    layer: 4,
    showIf: {
      flowState: "CONTROLLER_PATH",
    },
    title: "How extensive is your organisation's personal data processing?",
    description:
      "Consider: customer and employee volume, complexity of systems, international operations, use of analytics or profiling, child-facing services, and whether you operate in regulated sectors.",
    type: "single-select",
    options: [
      {
        value: "limited",
        label: "Limited — smaller scale, few data types, simple operations",
      },
      {
        value: "moderate",
        label: "Moderate — growing operations, some complexity",
      },
      {
        value: "extensive",
        label:
          "Extensive — large scale, complex processing, high-risk activities",
      },
    ],
  },
];