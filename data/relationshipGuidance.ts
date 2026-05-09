export type RelationshipGuidanceItem = {
  title: string;
  summary: string;
  obligations: string[];
};

export const relationshipGuidance = {
  customers: {
    title: "Customer and User Data",
    summary:
      "Customer-facing processing commonly relies on consent and transparent notice practices. Users should be clearly informed and given meaningful control.",
    obligations: [
      "Privacy notices should clearly explain how customer data is used before collection.",
      "Consent mechanisms should be reviewed for optional activities such as marketing or profiling.",
      "Withdrawal and grievance workflows should be operationalised.",
      "Retention of inactive customer accounts should be assessed periodically.",
    ],
  },
  marketing_leads: {
    title: "Marketing Leads and Prospective Customers",
    summary:
      "Marketing and lead generation activities typically require consent. Cold outreach and retention of lead databases should be reviewed carefully.",
    obligations: [
      "Marketing communications should be backed by valid consent where required.",
      "Lead collection notices should explain intended uses at the point of collection.",
      "Retention of inactive lead databases should be reviewed and limited.",
      "Opt-out mechanisms should be implemented and honoured promptly.",
    ],
  },
  employees: {
    title: "Employee Data",
    summary:
      "Employee-related processing may rely on employment-related legitimate use for workplace administration. This ground is narrower than it appears — it does not justify unlimited monitoring or analytics.",
    obligations: [
      "Employee data access should be restricted to those with a genuine need.",
      "Monitoring and surveillance practices should be proportionate and disclosed.",
      "Internal HR and payroll data retention practices should be documented.",
      "Employees should be informed of what data is held and how it is used.",
    ],
  },
  job_applicants: {
    title: "Job Applicant and Candidate Data",
    summary:
      "Candidate data is often provided voluntarily but carries specific limitations. It cannot automatically be retained indefinitely or repurposed without justification.",
    obligations: [
      "Candidate CVs and application materials should not be retained beyond a reasonable recruitment period.",
      "Application materials must not be repurposed for AI training, profiling, or unrelated analytics without appropriate justification.",
      "Recruitment notices should explain how candidate data is evaluated, shared, and retained.",
      "Candidates should be informed if their data will be kept on file for future roles.",
    ],
  },
  contractors: {
    title: "Contractors, Consultants, and Interns",
    summary:
      "Contractor and consultant data involves a mix of operational necessity and employment-adjacent processing. Access governance is particularly important.",
    obligations: [
      "Access management controls should reflect the limited and time-bound nature of contractor engagement.",
      "Onboarding processes should include appropriate privacy disclosures.",
      "Data should be reviewed and removed when engagement ends.",
      "Background verification practices should be documented where applicable.",
    ],
  },
  vendors: {
    title: "Vendor and Service Provider Data",
    summary:
      "Vendor contact and operational data arises through business relationships. Service agreements should include appropriate privacy and data handling provisions.",
    obligations: [
      "Vendor contact records should be secured and accessed only by relevant personnel.",
      "Service and procurement agreements should include appropriate confidentiality and data handling clauses.",
      "Retention of vendor data should be reviewed when relationships end.",
    ],
  },
  visitors: {
    title: "Visitor and Physical Access Data",
    summary:
      "Visitor management and CCTV processing involve personal data that requires transparency and proportionality. Notices must be visible and accessible.",
    obligations: [
      "CCTV and visitor monitoring notices should be clearly displayed at points of collection.",
      "Retention of visitor logs and CCTV footage should be limited to what is operationally necessary.",
      "Physical access systems should implement appropriate security controls.",
      "Footage or access logs should not be used for purposes beyond security without further justification.",
    ],
  },
} satisfies Record<string, RelationshipGuidanceItem>;

export type RelationshipGuidanceKey = keyof typeof relationshipGuidance;