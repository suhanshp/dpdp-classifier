"use client";

import { useState } from "react";

export default function Home() {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        DPDP Classifier
      </h1>

      {!answer && (
        <div className="border rounded-2xl p-6 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            Question 1
          </h2>

          <p className="mb-6">
            Do you determine why and how personal data is processed?
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setAnswer("df")}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Yes
            </button>

            <button
              onClick={() => setAnswer("not_df")}
              className="border px-4 py-2 rounded-xl"
            >
              No
            </button>
          </div>
        </div>
      )}

      {answer === "df" && (
        <div className="border rounded-2xl p-6 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            Likely Data Fiduciary
          </h2>

          <p>
            You likely determine the purposes and means of processing
            and may qualify as a Data Fiduciary under the DPDP Act.
          </p>
        </div>
      )}

      {answer === "not_df" && (
        <div className="border rounded-2xl p-6 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            Further Analysis Required
          </h2>

          <p>
            You may instead be a Data Processor or outside the scope
            of the Act depending on your role.
          </p>
        </div>
      )}
    </main>
  );
}