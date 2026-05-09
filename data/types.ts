export type AssessmentAnswers = {
  // Layer 1
  processesDataInIndia?: boolean;
  offersGoodsOrServicesToPeopleInIndia?: boolean;

  // Layer 2
  controlsWhyAndHowDataIsUsed?: boolean;
  processesDataOnInstructions?: boolean;

  // Layer 3
  relationshipCategories?: string[];

  // Layer 4
  processesChildData?: boolean;
  processesPwDGuardianData?: boolean;
  offshoreTransfers?: boolean;

  processingFootprint?: "limited" | "moderate" | "extensive";
};