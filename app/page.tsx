"use client";

import { useState } from "react";

type ResultType =
  | "ordinary_df"
  | "legitimate_use_df"
  | "child_data_df"
  | "pwd_data_df"
  | "outside_scope"
  | null;

export default function Home() {
  const [step, setStep] = useState(1);

  const [result, setResult] = useState<ResultType>(null);

  const [grounds, setGrounds] = useState<string[]>([]);
  const [obligations, setObligations] = useState<string[]>([]);
  const [overlays, setOverlays] = useState<string[]>([]);

  const nextStep = () => setStep(step + 1);

  const reset = () => {
    setStep(1);
    setResult(null);
    setGrounds([]);
    setObligations([]);
    setOverlays([]);
  };

  const addGround = (ground: string) => {
    setGrounds((prev) => [...prev, ground]);
  };

  const addObligation = (obligation: string) => {
    setObligations((prev) => [...prev, obligation]);
  };

  const addOverlay = (overlay: string) => {
    setOverlays((prev) => [...prev, overlay]);
  };

  const cardStyle =
    "border border-gray-800 bg-gray-950 rounded-2xl p-8 max-w-3xl shadow-sm";

  const buttonStyle =
    "px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition";

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-2">
        DPDP DF Classifier
      </h1>

      <p className="text-gray-400 mb-8">
        Determine applicable processing grounds and
        obligations under the DPDP Act.
      </p>

      {/* STEP 1 */}

      {step === 1 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 1
          </h2>

          <p className="mb-6">
            Are you processing digital personal data?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={nextStep}
            >
              Yes
            </button>

            <button
              className={buttonStyle}
              onClick={() => setResult("outside_scope")}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 2
          </h2>

          <p className="mb-6">
            Do you determine why and how personal data is processed?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={nextStep}
            >
              Yes
            </button>

            <button
              className={buttonStyle}
              onClick={() => setResult("outside_scope")}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 3
          </h2>

          <p className="mb-6">
            Are you relying on consent for processing?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={() => {
                setResult("ordinary_df");

                addGround("Consent");

                addObligation("Provide notice");
                addObligation("Obtain valid consent");
                addObligation("Enable withdrawal of consent");
                addObligation("Implement security safeguards");
                addObligation("Notify personal data breaches");
                addObligation("Erase data after purpose exhaustion");

                nextStep();
              }}
            >
              Yes
            </button>

            <button
              className={buttonStyle}
              onClick={nextStep}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}

      {step === 4 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 4
          </h2>

          <p className="mb-6">
            Does your processing fall within a Section 7
            legitimate use category?
          </p>

          <div className="space-y-4">
            <button
              className={`${buttonStyle} w-full text-left`}
              onClick={() => {
                setResult("legitimate_use_df");

                addGround("Employment legitimate use");

                addObligation("Limit processing to employment-related purposes");
                addObligation("Maintain reasonable security safeguards");

                nextStep();
              }}
            >
              Employment purposes
            </button>

            <button
              className={`${buttonStyle} w-full text-left`}
              onClick={() => {
                setResult("legitimate_use_df");

                addGround("Legal obligation");

                addObligation("Process only to the extent legally required");
                addObligation("Maintain reasonable security safeguards");

                nextStep();
              }}
            >
              Compliance with law / legal obligation
            </button>

            <button
              className={`${buttonStyle} w-full text-left`}
              onClick={() => {
                setResult("legitimate_use_df");

                addGround("Medical emergency");

                addObligation("Limit processing to emergency context");
                addObligation("Maintain reasonable security safeguards");

                nextStep();
              }}
            >
              Medical emergency / disaster / public health
            </button>

            <button
              className={`${buttonStyle} w-full text-left`}
              onClick={() => {
                setResult("legitimate_use_df");

                addGround("Voluntary provision by Data Principal");

                addObligation("Process within reasonable expectations");
                addObligation("Stop processing if objection is raised");

                nextStep();
              }}
            >
              Individual voluntarily provided the data
            </button>

            <button
              className={`${buttonStyle} w-full text-left`}
              onClick={() => setResult("outside_scope")}
            >
              None of the above
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 */}

      {step === 5 && result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-6">
            Additional Overlay Analysis
          </h2>

          <p className="mb-6">
            Are you processing personal data of individuals under 18?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={() => {
                addOverlay("Child Data Processing");

                addObligation("Obtain verifiable parental consent");
                addObligation("Do not conduct behavioural monitoring of children");
                addObligation("Do not conduct targeted advertising directed at children");
                addObligation("Avoid detrimental processing");

                setResult("child_data_df");

                nextStep();
              }}
            >
              Yes
            </button>

            <button
              className={buttonStyle}
              onClick={nextStep}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 */}

      {step === 6 && result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-6">
            Additional Overlay Analysis
          </h2>

          <p className="mb-6">
            Are you processing personal data of persons
            with disabilities who have lawful guardians?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={() => {
                addOverlay("PwD Guardian Processing");

                addObligation("Obtain verifiable guardian consent");
                addObligation("Verify guardianship status");

                setResult("pwd_data_df");

                nextStep();
              }}
            >
              Yes
            </button>

            <button
              className={buttonStyle}
              onClick={nextStep}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* FINAL RESULT */}

      {step === 7 && result && (
        <div className="border border-gray-800 rounded-2xl p-8 max-w-4xl bg-gray-950">
          <h2 className="text-3xl font-bold mb-6">
            Assessment Result
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              Classification
            </h3>

            {result === "ordinary_df" && (
              <p>
                Likely ordinary Data Fiduciary processing on
                the basis of consent.
              </p>
            )}

            {result === "legitimate_use_df" && (
              <p>
                Likely Data Fiduciary processing under
                Section 7 legitimate use grounds.
              </p>
            )}

            {result === "child_data_df" && (
              <p>
                Likely Data Fiduciary processing child data.
              </p>
            )}

            {result === "pwd_data_df" && (
              <p>
                Likely Data Fiduciary processing data of
                persons with disabilities having lawful guardians.
              </p>
            )}

            {result === "outside_scope" && (
              <p>
                The DPDP Act may not apply based on the
                responses provided.
              </p>
            )}
          </div>

          {grounds.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                Applicable Grounds
              </h3>

              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                {grounds.map((ground, index) => (
                  <li key={index}>{ground}</li>
                ))}
              </ul>
            </div>
          )}

          {overlays.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                Additional Regulatory Overlays
              </h3>

              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                {overlays.map((overlay, index) => (
                  <li key={index}>{overlay}</li>
                ))}
              </ul>
            </div>
          )}

          {obligations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                Key Obligations
              </h3>

              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                {[...new Set(obligations)].map((obligation, index) => (
                  <li key={index}>{obligation}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-500 mb-6">
              This tool provides informational guidance only
              and does not constitute legal advice.
            </p>

            <button
              className="px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
              onClick={reset}
            >
              Start Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}