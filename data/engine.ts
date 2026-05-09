import { AssessmentAnswers } from "./types";
import { relationshipToGroundMappings } from "./mappings";
export function determineApplicability(
  answers: AssessmentAnswers
) {
  if (answers.processesDataInIndia) {
    return {
      applicable: true,
      reason:
        "Processes digital personal data within India.",
    };
  }

  if (
    answers.offersGoodsOrServicesToPeopleInIndia
  ) {
    return {
      applicable: true,
      reason:
        "Offers goods or services to people in India while using digital personal data.",
    };
  }

  return {
    applicable: false,
    reason:
      "Insufficient India nexus identified.",
  };
}
export function determineRole(
  answers: AssessmentAnswers
) {
  const roles: string[] = [];

  if (answers.controlsWhyAndHowDataIsUsed) {
    roles.push("Data Fiduciary");
  }

  if (answers.processesDataOnInstructions) {
    roles.push("Data Processor");
  }

  return roles;
}
export function inferGrounds(
  answers: AssessmentAnswers
) {
  const inferredGrounds = new Set<string>();

  answers.relationshipCategories?.forEach(
    (category) => {
      const grounds =
        relationshipToGroundMappings[
          category as keyof typeof relationshipToGroundMappings
        ];

      grounds?.forEach((ground) => {
        inferredGrounds.add(ground);
      });
    }
  );

  return Array.from(inferredGrounds);
}
export function inferRiskFactors(
  answers: AssessmentAnswers
) {
  const risks: string[] = [];

  if (answers.processesChildData) {
    risks.push("Child Data");
  }

  if (answers.processesPwDGuardianData) {
    risks.push(
      "PwD Data Requiring Guardian Involvement"
    );
  }

  if (answers.offshoreTransfers) {
    risks.push("Cross-Border Transfers");
  }

  return risks;
}
export function determineSDFRisk(
  answers: AssessmentAnswers
) {
  if (
    answers.processingFootprint === "extensive"
  ) {
    return {
      level: "higher",
      message:
        "The organisation may face enhanced governance expectations and possible Significant Data Fiduciary obligations.",
    };
  }

  if (
    answers.processingFootprint === "moderate"
  ) {
    return {
      level: "potential",
      message:
        "The organisation may wish to monitor potential enhanced compliance obligations.",
    };
  }

  return {
    level: "lower",
    message:
      "No immediate indicators of enhanced governance obligations identified.",
  };
}
export function generateAssessment(
  answers: AssessmentAnswers
) {
  const applicability =
    determineApplicability(answers);

  const roles = determineRole(answers);

  const grounds = inferGrounds(answers);

  const risks = inferRiskFactors(answers);

  const sdfRisk = determineSDFRisk(answers);

  return {
    applicability,
    roles,
    grounds,
    risks,
    sdfRisk,
  };
}
