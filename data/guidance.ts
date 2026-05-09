export type GuidanceItem = {
  title: string;
  summary: string;
  obligations: string[];
};

export const guidance = {
  consent: {
    title: "Consent",
    summary:
      "Consent may be relevant where individuals are given meaningful choice over optional processing activities — such as marketing, optional services, or profiling.",
    obligations: [
      "Consent requests must be clear, specific, and separate from other terms.",
      "Individuals must be able to withdraw consent easily at any time.",
      "Privacy notices should explain how personal data is used before consent is sought.",
      "Records of consent should be maintained.",
    ],
  },
  employment_legitimate_use: {
    title: "Employment-Related Legitimate Use",
    summary:
      "This ground may apply to processing connected to employment or workplace administration — such as payroll, access management, and internal governance.",
    obligations: [
      "Processing should remain connected to employment-related purposes.",
      "Access to employee data should be appropriately restricted.",
      "Employee monitoring should remain proportionate and necessary.",
      "Internal HR data retention practices should be documented.",
    ],
  },
  voluntary_provision: {
    title: "Voluntary Provision",
    summary:
      "This ground may apply where individuals voluntarily provide personal data for a specific purpose — such as submitting a CV, making an inquiry, or requesting a receipt.",
    obligations: [
      "Processing must remain consistent with the individual's reasonable expectations at the time of providing data.",
      "Secondary uses should be carefully assessed before proceeding.",
      "Candidate CVs and application materials should not be repurposed for unrelated analytics or AI training without appropriate justification.",
      "Individuals should be informed if they object to continued use.",
    ],
  },
  legal_obligation: {
    title: "Compliance with Legal Obligations",
    summary:
      "This ground may apply where processing is necessary to comply with applicable law — such as tax filings, KYC requirements, AML obligations, or regulatory disclosures.",
    obligations: [
      "Processing should be limited to what is strictly required by the applicable law or regulation.",
      "The specific legal obligation should be identifiable and documented.",
      "Security safeguards should be applied even where processing is mandatory.",
    ],
  },
  processor: {
    title: "Data Processor Obligations",
    summary:
      "Data processors should operate under appropriate contractual arrangements with the Data Fiduciary and implement necessary safeguards.",
    obligations: [
      "Implement appropriate technical and organisational security safeguards.",
      "Operate strictly within documented instructions from the Data Fiduciary.",
      "Support the Data Fiduciary in handling Data Principal rights requests.",
      "Review and govern any sub-processor or downstream vendor arrangements.",
      "Notify the Data Fiduciary promptly of any personal data breaches.",
    ],
  },
  child_data: {
    title: "Child Data Processing",
    summary:
      "Additional safeguards apply where children's personal data is processed. These obligations are mandatory and non-negotiable under the DPDP Act.",
    obligations: [
      "Implement verifiable parental consent mechanisms before processing.",
      "Do not conduct behavioural monitoring of children.",
      "Do not serve targeted advertising directed at children.",
      "Do not process child data in a manner that is detrimental to their wellbeing.",
      "Implement age verification workflows as required under the DPDP Rules.",
    ],
  },
  offshore_transfers: {
    title: "Cross-Border Data Transfers",
    summary:
      "Cross-border transfers require enhanced governance. The government may restrict transfers to certain countries — this list is not yet published but must be monitored.",
    obligations: [
      "Map all locations where personal data is transferred or accessed outside India.",
      "Review overseas vendor and cloud provider arrangements.",
      "Monitor future government notifications on restricted transfer destinations.",
      "Maintain documentation of transfer flows and safeguards.",
    ],
  },
  sdf: {
    title: "Potential Significant Data Fiduciary Considerations",
    summary:
      "Organisations processing large volumes of data, operating sensitive services, or conducting high-risk activities may be designated as Significant Data Fiduciaries by the government.",
    obligations: [
      "Consider appointing a Data Protection Officer (DPO) based in India.",
      "Assess readiness for Data Protection Impact Assessments (DPIAs).",
      "Prepare for periodic independent audits of data processing practices.",
      "Evaluate algorithmic and profiling risk within your systems.",
      "Monitor government notifications for formal SDF designation.",
    ],
  },
} satisfies Record<string, GuidanceItem>;

export type GuidanceKey = keyof typeof guidance;