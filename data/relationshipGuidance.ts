export const relationshipGuidance = {
  customers: {
    title: "Customer and User Data",

    summary:
      "Customer-facing processing activities commonly rely on consent, notices, and transparent processing practices.",

    obligations: [
      "Privacy notices should clearly explain how customer data is used.",
      "Consent mechanisms should be reviewed for optional activities such as marketing.",
      "Withdrawal and grievance workflows should be operationalized.",
    ],
  },

  marketing_leads: {
    title:
      "Marketing Leads and Prospective Customers",

    summary:
      "Marketing and lead-generation activities may require careful consent and notice management.",

    obligations: [
      "Marketing communications should be reviewed for consent requirements.",
      "Lead collection notices should explain intended uses.",
      "Retention of inactive lead databases should be assessed.",
    ],
  },

  employees: {
    title: "Employee Data",

    summary:
      "Employee-related processing may rely on employment-related legitimate use for workplace administration purposes.",

    obligations: [
      "Employee data access should be appropriately restricted.",
      "Monitoring and surveillance practices should remain proportionate.",
      "Internal HR and retention practices should be documented.",
    ],
  },

  job_applicants: {
    title: "Job Applicant and Candidate Data",

    summary:
      "Candidate and recruitment-related processing may rely on voluntary provision or consent depending on context.",

    obligations: [
      "Candidate CVs should not automatically be retained indefinitely.",
      "Application materials should not be repurposed for unrelated analytics or AI model training without appropriate justification.",
      "Recruitment notices should explain how candidate data is evaluated and retained.",
    ],
  },

  contractors: {
    title:
      "Contractors, Consultants, and Interns",

    summary:
      "Contractor and consultant data may involve a combination of operational necessity and consent-based processing.",

    obligations: [
      "Access management controls should be implemented.",
      "Background verification practices should be documented where applicable.",
      "Vendor and contractor onboarding processes should include privacy disclosures.",
    ],
  },

  vendors: {
    title: "Vendor and Service Provider Data",

    summary:
      "Vendor-related personal data processing may arise through operational and contractual relationships.",

    obligations: [
      "Vendor records should be secured appropriately.",
      "Service agreements should include appropriate privacy and confidentiality protections.",
      "Retention of vendor contact information should be reviewed periodically.",
    ],
  },

  visitors: {
    title:
      "Visitor and Physical Access Data",

    summary:
      "Visitor management and CCTV processing may require transparency and proportionality measures.",

    obligations: [
      "Visitor notices and CCTV disclosures should be displayed where appropriate.",
      "Retention of visitor logs and footage should be reviewed.",
      "Physical access systems should implement appropriate safeguards.",
    ],
  },
};