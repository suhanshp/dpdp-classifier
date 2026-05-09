export const processingFootprintGuidance = {
  limited: {
    title: "Limited Processing Footprint",
    sdfLikelihood: "lower",
  },

  moderate: {
    title: "Moderate Processing Footprint",
    sdfLikelihood: "potential",
    considerations: [
      "Enhanced governance measures may become relevant.",
      "Future SDF obligations should be monitored.",
    ],
  },

  extensive: {
    title: "Extensive Processing Footprint",
    sdfLikelihood: "higher",
    considerations: [
      "The organisation may face enhanced governance expectations.",
      "Potential SDF obligations may become relevant.",
      "Consider governance, audit, and DPO readiness.",
    ],
  },
};