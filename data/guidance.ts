export const guidance = {
  consent: {
    title: "Consent",

    summary:
      "Consent may be relevant where individuals are given meaningful choice over optional processing activities.",

    obligations: [
      "Consent requests should be clear and specific.",
      "Individuals should be able to withdraw consent.",
      "Privacy notices should explain how personal data is used.",
      "Records of consent flows should be maintained.",
    ],
  },

  employment_legitimate_use: {
    title:
      "Employment-Related Legitimate Use",

    summary:
      "This ground may be relevant for processing connected to employment or workplace administration.",

    obligations: [
      "Processing should remain connected to employment purposes.",
      "Access to employee data should be appropriately restricted.",
      "Monitoring activities should remain proportionate and necessary.",
    ],
  },

  voluntary_provision: {
    title: "Voluntary Provision",

    summary:
      "This ground may apply where individuals voluntarily provide personal data for a specific purpose.",

    obligations: [
      "Processing should remain consistent with the individual's reasonable expectations.",
      "Secondary uses should be carefully assessed.",
      "Candidate CVs and application materials should not automatically be repurposed for unrelated analytics or AI training.",
    ],
  },

  processor: {
    title: "Data Processor Obligations",

    summary:
      "Data processors should operate under appropriate contractual arrangements with Data Fiduciaries.",

    obligations: [
      "Implement appropriate security safeguards.",
      "Operate within documented instructions.",
      "Support Data Fiduciaries in handling Data Principal rights.",
      "Review subprocessor and vendor arrangements.",
    ],
  },

  child_data: {
    title: "Child Data Processing",

    summary:
      "Additional safeguards may apply where children's personal data is processed.",

    obligations: [
      "Implement parental consent mechanisms.",
      "Avoid behavioural monitoring of children.",
      "Avoid targeted advertising directed at children.",
    ],
  },

  offshore_transfers: {
    title: "Cross-Border Transfers",

    summary:
      "Cross-border transfers may require enhanced governance and transfer visibility.",

    obligations: [
      "Review offshore vendor arrangements.",
      "Monitor future transfer restrictions notified by the government.",
      "Maintain visibility over transfer locations and subprocessors.",
    ],
  },

  sdf: {
    title:
      "Potential Significant Data Fiduciary Considerations",

    summary:
      "Organisations with extensive or higher-risk processing may face enhanced governance expectations.",

    obligations: [
      "Consider governance and compliance oversight structures.",
      "Assess future audit and DPIA readiness.",
      "Evaluate whether dedicated privacy leadership may become necessary.",
    ],
  },
};