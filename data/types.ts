export type FlowState =
  | "CONTROLLER_PATH"
  | "PROCESSOR_PATH"
  | "NOT_APPLICABLE_INDIA";

export type ProcessingFootprint = "limited" | "moderate" | "extensive";

export type AssessmentAnswers = {
  // Layer 1
  processesDataInIndia?: boolean;
  offersGoodsOrServicesToPeopleInIndia?: boolean;

  // Derived — injected automatically after Layer 2
  flowState?: FlowState;

  // Layer 2
  controlsWhyAndHowDataIsUsed?: boolean;
  processesDataOnInstructions?: boolean;

  // Layer 3
  relationshipCategories?: string[];

  // Layer 4
  processesChildData?: boolean;
  offshoreTransfers?: boolean;
  processingFootprint?: ProcessingFootprint;
};