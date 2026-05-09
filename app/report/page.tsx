"use client";

import { useSearchParams } from "next/navigation";
import { generateReport } from "../../data/reportEngine";

export default function ReportPage() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");
  const answers = raw ? JSON.parse(decodeURIComponent(raw)) : null;
  const report = answers ? generateReport(answers) : null;

  if (!report) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No report data found.</p>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen py-16 px-6 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16 border-b border-gray-800 pb-10 print:border-gray-300">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 print:text-gray-400">
            DPDP Compliance Assessment
          </p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            DPDP Assessment Report
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-8">
            Preliminary assessment of potential obligations and compliance
            considerations under the Digital Personal Data Protection Act, 2023.
            This report does not constitute legal advice.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {report.sections.map((section, index) => (
            <section
              key={index}
              className={`rounded-3xl p-8 border print:break-inside-avoid ${
                section.isCallout
                  ? "border-gray-600 bg-white/5"
                  : "border-gray-800 bg-[#0A0A0A] print:bg-white print:border-gray-300"
              }`}
            >
              {section.isCallout && (
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Also consider
                </p>
              )}
              <h2 className="text-2xl font-semibold mb-5">{section.title}</h2>

              {section.content && (
                <p className="text-gray-300 leading-8 mb-6 print:text-gray-700">
                  {section.content}
                </p>
              )}

              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300 print:text-gray-700"
                    >
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 print:border-gray-300 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-gray-600">
            This tool provides informational guidance only and does not
            constitute legal advice. Outcomes depend on specific facts,
            applicable notifications, and sectoral laws.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-3 rounded-xl border border-gray-700 hover:border-white text-sm transition print:hidden"
            >
              Print / Save PDF
            </button>
            <button
              onClick={() => (window.location.href = "/assessment")}
              className="px-5 py-3 rounded-xl border border-gray-700 hover:border-white text-sm transition print:hidden"
            >
              Start Again
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}