"use client";

import { useState } from "react";

type ResultType =
  | "df"
  | "dp"
  | "processor"
  | "outside_scope"
  | null;

export default function Home() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<ResultType>(null);

  const nextStep = () => setStep(step + 1);

  const cardStyle =
    "border rounded-2xl p-8 max-w-2xl shadow-sm";

  const buttonStyle =
    "px-4 py-2 rounded-xl border hover:bg-gray-100";

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">
        DPDP Classifier
      </h1>

      <p className="mb-8 text-gray-600">
        Determine your likely role under the DPDP Act.
      </p>

      {step === 1 && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 1
          </h2>

          <p className="mb-6">
            Are you processing personal data?
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

      {step === 2 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 2
          </h2>

          <p className="mb-6">
            Is the personal data in digital form?
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

      {step === 3 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 3
          </h2>

          <p className="mb-6">
            Are you the individual to whom the personal data relates?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={() => setResult("dp")}
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

      {step === 4 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 4
          </h2>

          <p className="mb-6">
            Do you determine why and how personal data is processed?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={() => setResult("df")}
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

      {step === 5 && !result && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-semibold mb-4">
            Question 5
          </h2>

          <p className="mb-6">
            Do you process personal data only on another entity's instructions?
          </p>

          <div className="flex gap-4">
            <button
              className={buttonStyle}
              onClick={() => setResult("processor")}
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

      {result && (
        <div className="border rounded-2xl p-8 max-w-2xl bg-white shadow-sm">
          <h2 className="text-3xl font-bold mb-4">
            Result
          </h2>

          {result === "dp" && (
            <>
              <p className="text-lg font-semibold mb-2">
                Likely Data Principal
              </p>

              <p>
                You are likely the individual to whom the
                personal data relates.
              </p>
            </>
          )}

          {result === "df" && (
            <>
              <p className="text-lg font-semibold mb-2">
                Likely Data Fiduciary
              </p>

              <p>
                You likely determine the purpose and means
                of processing personal data.
              </p>
            </>
          )}

          {result === "processor" && (
            <>
              <p className="text-lg font-semibold mb-2">
                Likely Data Processor
              </p>

              <p>
                You appear to process personal data on behalf
                of another entity.
              </p>
            </>
          )}

          {result === "outside_scope" && (
            <>
              <p className="text-lg font-semibold mb-2">
                Possibly Outside Scope
              </p>

              <p>
                The DPDP Act may not apply based on the answers
                provided.
              </p>
            </>
          )}

          <button
            className="mt-6 px-4 py-2 rounded-xl border"
            onClick={() => {
              setStep(1);
              setResult(null);
            }}
          >
            Start Again
          </button>
        </div>
      )}
    </main>
  );
}