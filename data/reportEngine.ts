import { AssessmentAnswers } from "./types";
import { generateAssessment } from "./engine";
import { guidance, GuidanceKey } from "./guidance";
import { relationshipGuidance, RelationshipGuidanceKey } from "./relationshipGuidance";

export type ReportSection = {
  title: string;
  content?: string;
  items?: string[];
  isCallout?: boolean;
};

export function generateReport(answers: AssessmentAnswers): {
  assessment: ReturnType<typeof generateAssessment>;
  sections: ReportSection[];
} {
  const assessment = generateAssessment(answers);
  const sections: ReportSection[] = [];

  // Not applicable — short report
  if (!assessment.applicability.applicable) {
    sections.push({
      title: "Applicability of the DPDP Act",
      content: assessment.applicability.reason,
    });
    sections.push({
      title: "Next Steps",
      content:
        "The DPDP Act does not appear to apply based on the responses provided. If your organisation's activities change — for example, if you begin offering services to individuals in India — you should reassess.",
      items: [
        "Monitor any future expansion of services to Indian users.",
        "Reassess if processing activities change significantly.",
      ],
    });
    return { assessment, sections };
  }

  // Executive Summary
  const roleSummary =
    assessment.roles.length > 0
      ? assessment.roles.join(" and ")
      : "an organisation whose role requires further review";

  sections.push({
    title: "Executive Summary",
    content: `Based on the responses provided, the organisation is likely subject to the Digital Personal Data Protection Act, 2023 (DPDP Act) and may be acting as a ${roleSummary}. This report sets out preliminary compliance considerations and recommended actions. It does not constitute legal advice.`,
  });

  // Applicability
  sections.push({
    title: "Applicability of the DPDP Act",
    content: assessment.applicability.reason,
  });

  // Role
  if (assessment.roles.length > 0) {
    sections.push({
      title: "Organisational Role",
      content: `The organisation appears to be acting as: ${assessment.roles.join(" and ")}.`,
      items:
        assessment.roles.includes("Data Fiduciary")
          ? [
              "As a Data Fiduciary, the organisation determines the purposes and means of processing personal data and bears the primary compliance obligations under the Act.",
            ]
          : [
              "As a Data Processor, the organisation processes personal data on behalf of a Data Fiduciary and must operate within contractual instructions.",
            ],
    });
  }

  // Processor callout — prompt to also do DF assessment
  if (
    assessment.roles.includes("Data Processor") &&
    !assessment.roles.includes("Data Fiduciary")
  ) {
    sections.push({
      title: "You May Also Be Acting as a Data Fiduciary",
      isCallout: true,
      content:
        "Many organisations that process data on behalf of clients also independently control personal data for their own operations.",
      items: [
        "Employee and HR administration",
        "Recruitment and candidate management",
        "Sales and marketing data",
        "Website visitor analytics",
        "Vendor management",
      ],
    });

    // Processor-specific obligations
    const proc = guidance["processor"];
    sections.push({
      title: proc.title,
      content: proc.summary,
      items: proc.obligations,
    });
  }

  // DF callout — prompt to also do processor assessment
  if (
    assessment.roles.includes("Data Fiduciary") &&
    !assessment.roles.includes("Data Processor")
  ) {
    sections.push({
      title: "You May Also Be Acting as a Data Processor",
      isCallout: true,
      content:
        "Some organisations also process personal data on behalf of clients, customers, or business partners.",
      items: [
        "SaaS or cloud-hosted services for clients",
        "Managed IT or support services",
        "Outsourced payroll or HR services",
        "Customer support operations on behalf of another entity",
      ],
    });
  }

  // Only show DF sections for controller path
  if (answers.flowState === "CONTROLLER_PATH") {
    // Relationship-aware guidance
    if (
      answers.relationshipCategories &&
      answers.relationshipCategories.length > 0
    ) {
      sections.push({
        title: "Categories of Personal Data Handled",
        content:
          "The organisation indicated that it handles personal data relating to the following categories of individuals. Compliance obligations and applicable grounds differ across these relationships.",
        items: answers.relationshipCategories.map((c) => {
          const map: Record<string, string> = {
            customers: "Customers or users",
            marketing_leads: "Prospective customers / marketing leads",
            employees: "Employees",
            job_applicants: "Job applicants",
            contractors: "Contractors / interns / consultants",
            vendors: "Vendors / service providers",
            visitors: "Visitors / CCTV / physical access",
          };
          return map[c] ?? c;
        }),
      });

      // Ground inference
      if (assessment.grounds.length > 0) {
        sections.push({
          title: "Likely Applicable Processing Grounds",
          content:
            "Different processing activities may rely on different lawful grounds under the DPDP Act. The following grounds appear relevant based on the categories of personal data handled. This is not exhaustive — specific activities should be reviewed individually.",
          items: assessment.grounds.map((g) => {
            const labels: Record<string, string> = {
              consent: "Consent",
              employment_legitimate_use: "Employment-Related Legitimate Use",
              voluntary_provision: "Voluntary Provision by the Individual",
              legal_obligation: "Compliance with Legal Obligations",
            };
            return labels[g] ?? g;
          }),
        });
      }

      // Per-ground guidance
      assessment.grounds.forEach((ground) => {
        const item = guidance[ground as GuidanceKey];
        if (!item) return;
        sections.push({
          title: item.title,
          content: item.summary,
          items: item.obligations,
        });
      });

      // Per-relationship guidance
      answers.relationshipCategories.forEach((category) => {
        const item = relationshipGuidance[category as RelationshipGuidanceKey];
        if (!item) return;
        sections.push({
          title: item.title,
          content: item.summary,
          items: item.obligations,
        });
      });
    }

    // Data Principal Rights
    sections.push({
      title: "Data Principal Rights",
      content:
        "As a Data Fiduciary, the organisation must establish processes to handle rights requests from individuals whose data it processes.",
      items: [
        "Implement a grievance redressal mechanism with a designated contact.",
        "Establish workflows for access and correction requests.",
        "Support consent withdrawal handling where processing is consent-based.",
        "Review erasure and data retention practices against the Act's requirements.",
        "Ensure responses to rights requests are timely and documented.",
      ],
    });

    // Risk overlays
    if (answers.processesChildData) {
      const child = guidance["child_data"];
      sections.push({
        title: child.title,
        content: child.summary,
        items: child.obligations,
      });
    }

    if (answers.offshoreTransfers) {
      const offshore = guidance["offshore_transfers"];
      sections.push({
        title: offshore.title,
        content: offshore.summary,
        items: offshore.obligations,
      });
    }

    // SDF
    if (assessment.sdfRisk.show) {
      const sdf = guidance["sdf"];
      sections.push({
        title: sdf.title,
        content: sdf.summary,
        items: sdf.obligations,
      });
    }
  }

  // Recommended Next Steps
  sections.push({
    title: "Recommended Next Steps",
    content:
      "The following actions are recommended as a starting point for building a DPDP-compliant framework.",
    items: [
      "Map all personal data flows across your organisation.",
      "Review and update privacy notices for each category of data subjects.",
      "Assess consent and withdrawal mechanisms for customer and marketing activities.",
      "Implement or review grievance redressal and rights handling workflows.",
      "Review vendor and service provider agreements for appropriate data handling clauses.",
      ...(answers.offshoreTransfers
        ? ["Document and review all cross-border data transfer arrangements."]
        : []),
      ...(answers.processesChildData
        ? ["Implement age verification and parental consent workflows."]
        : []),
      ...(assessment.sdfRisk.show
        ? ["Assess governance readiness for potential SDF obligations."]
        : []),
    ],
  });

  return { assessment, sections };
}