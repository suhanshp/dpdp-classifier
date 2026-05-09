import { AssessmentAnswers } from "./types";
import { relationshipToGroundMappings } from "./mappings";

export function determineApplicability(answers: AssessmentAnswers) {
  if (answers.processesDataInIndia) {
    return {
      applicable: true,
      reason: "Processes digital personal data within India.",
    };
  }
  if (answers.offersGoodsOrServicesToPeopleInIndia) {
    return {
      applicable: true,
      reason:
        "Offers goods or services to people in India while handling their digital personal data (Section 3(b)).",
    };
  }
  return {
    applicable: false,
    reason:
      "Based on the responses provided, the organisation does not appear to have a sufficient India nexus under the DPDP Act.",
  };
}

export function determineRole(answers: AssessmentAnswers): string[] {
  const roles: string[] = [];
  if (answers.controlsWhyAndHowDataIsUsed) roles.push("Data Fiduciary");
  if (answers.processesDataOnInstructions) roles.push("Data Processor");
  return roles;
}

export function inferGrounds(answers: AssessmentAnswers): string[] {
  const inferred = new Set<string>();
  answers.relationshipCategories?.forEach((category) => {
    const grounds =
      relationshipToGroundMappings[category as keyof typeof relationshipToGroundMappings];
    grounds?.forEach((g) => inferred.add(g));
  });
  return Array.from(inferred);
}

export function inferRiskFactors(answers: AssessmentAnswers): string[] {
  const risks: string[] = [];
  if (answers.processesChildData) risks.push("Child Data");
  if (answers.offshoreTransfers) risks.push("Cross-Border Transfers");
  return risks;
}

export function determineSDFRisk(answers: AssessmentAnswers) {
  if (answers.processingFootprint === "extensive") {
    return {
      level: "higher",
      show: true,
      message:
        "The organisation's processing scale and complexity indicate a higher likelihood of enhanced regulatory obligations, including those applicable to Significant Data Fiduciaries.",
    };
  }
  if (answers.processingFootprint === "moderate") {
    return {
      level: "potential",
      show: true,
      message:
        "The organisation may wish to monitor potential enhanced compliance obligations as its processing activities grow.",
    };
  }
  return {
    level: "lower",
    show: false,
    message: "No immediate indicators of enhanced governance obligations identified.",
  };
}

export function deriveFlowState(
  answers: AssessmentAnswers
): AssessmentAnswers["flowState"] | null {
  if (
    answers.processesDataInIndia === false &&
    answers.offersGoodsOrServicesToPeopleInIndia === false
  ) {
    return "NOT_APPLICABLE_INDIA";
  }
  if (answers.controlsWhyAndHowDataIsUsed === true) {
    return "CONTROLLER_PATH";
  }
  if (answers.processesDataOnInstructions === true) {
    return "PROCESSOR_PATH";
  }
  return null;
}

export function generateAssessment(answers: AssessmentAnswers) {
  return {
    applicability: determineApplicability(answers),
    roles: determineRole(answers),
    grounds: inferGrounds(answers),
    risks: inferRiskFactors(answers),
    sdfRisk: determineSDFRisk(answers),
  };
}