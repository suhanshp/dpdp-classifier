import { generateAssessment } from "./engine";
import { AssessmentAnswers } from "./types";
import { guidance } from "./guidance";
import { relationshipGuidance } from "./relationshipGuidance";

export function generateReport(
  answers: AssessmentAnswers
) {
  const assessment =
    generateAssessment(answers);

  const sections: any[] = [];

  // Executive Summary

  const roleSummary =
    assessment.roles.join(" and ");

  sections.push({
    title: "Executive Summary",

    content: `Based on the responses provided, the organisation is likely subject to the DPDP Act and may be acting as a ${roleSummary}. The assessment identified multiple personal data processing activities and associated compliance considerations.`,
  });

  // Applicability

  sections.push({
    title: "Applicability of the DPDP Act",

    content:
      assessment.applicability.reason,
  });

  // Roles

  sections.push({
    title: "Organisational Role",

    content: `The organisation may be acting as: ${assessment.roles.join(
      ", "
    )}.`,
  });

  // Hybrid Role Guidance

  if (
    assessment.roles.includes(
      "Data Processor"
    )
  ) {
    sections.push({
      title:
        "Possible Additional Data Fiduciary Activities",

      content:
        "Many organisations acting as Data Processors also independently process personal data for their own operational purposes.",

      items: [
        "Employee and HR administration",
        "Recruitment and candidate management",
        "Sales and marketing operations",
        "Website analytics and visitor management",
      ],
    });
  }

  if (
    assessment.roles.includes(
      "Data Fiduciary"
    )
  ) {
    sections.push({
      title:
        "Possible Additional Data Processor Activities",

      content:
        "Some organisations also process personal data on behalf of clients, customers, or business partners.",

      items: [
        "Cloud or SaaS services",
        "Managed IT services",
        "Customer support operations",
        "Outsourced processing services",
      ],
    });
  }
  
  // Relationship-Specific Guidance

  answers.relationshipCategories?.forEach(
    (category) => {
      const item =
        relationshipGuidance[
          category as keyof typeof relationshipGuidance
        ];

      if (!item) return;

      sections.push({
        title: item.title,
        content: item.summary,
        items: item.obligations,
      });
    }
  );  

  // Processor Guidance

  if (
    assessment.roles.includes(
      "Data Processor"
    )
  ) {
    const processor =
      guidance.processor;

    sections.push({
      title: processor.title,
      content: processor.summary,
      items: processor.obligations,
    });
  }
  // Dynamic Ground Guidance

  assessment.grounds.forEach((ground) => {
    const item =
      guidance[
        ground as keyof typeof guidance
      ];

    if (!item) return;

    sections.push({
      title: item.title,

      content: item.summary,

      items: item.obligations,
    });
  });

  // Risks

  if (assessment.risks.length > 0) {
    sections.push({
      title:
        "Enhanced Compliance Factors",

      content:
        "The following enhanced compliance considerations may be relevant.",

      items: assessment.risks,
    });
  }

  // SDF Guidance

  if (
    answers.processingFootprint ===
      "moderate" ||
    answers.processingFootprint ===
      "extensive"
  ) {
    const sdf = guidance.sdf;

    sections.push({
      title: sdf.title,
      content: sdf.summary,
      items: sdf.obligations,
    });
  }

  // Dynamic Risk Guidance

  if (answers.processesChildData) {
    const child =
      guidance.child_data;

    sections.push({
      title: child.title,
      content: child.summary,
      items: child.obligations,
    });
  }

  if (answers.offshoreTransfers) {
    const offshore =
      guidance.offshore_transfers;

    sections.push({
      title: offshore.title,
      content: offshore.summary,
      items: offshore.obligations,
    });
  }
  // Next Steps

  sections.push({
    title: "Recommended Next Steps",

    items: [
      "Map personal data flows",
      "Review privacy notices and consent flows",
      "Assess vendor and service agreements",
      "Implement internal governance controls",
      "Review cross-border transfer practices",
    ],
  });

  return {
    assessment,
    sections,
  };
}