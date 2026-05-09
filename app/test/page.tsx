import { generateReport } from "../../data/reportEngine";
export default function TestPage() {
  const report = generateReport({
    processesDataInIndia: true,

    controlsWhyAndHowDataIsUsed: true,

    relationshipCategories: [
      "customers",
      "employees",
      "job_applicants",
    ],

    processesChildData: true,

    offshoreTransfers: true,

    processingFootprint: "extensive",
  });

  return (
    <main className="bg-black text-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-16 border-b border-gray-800 pb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            DPDP Compliance Assessment
          </p>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            DPDP Assessment Report
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl">
            Preliminary assessment of potential
            obligations and compliance
            considerations under the Digital
            Personal Data Protection Act.
          </p>
        </div>

        {/* Sections */}

        <div className="space-y-8">
          {report.sections.map(
            (section, index) => (
              <section
                key={index}
                className="border border-gray-800 rounded-3xl p-8 bg-[#0A0A0A]"
              >
                <h2 className="text-2xl font-semibold mb-5">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-gray-300 leading-8 mb-6">
                    {section.content}
                  </p>
                )}

                {section.items && (
                  <ul className="space-y-4">
                    {section.items.map(
                      (
                        item: string,
                        itemIndex: number
                      ) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="mt-2 w-2 h-2 rounded-full bg-gray-500" />

                          <span>
                            {item}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </section>
            )
          )}
        </div>
      </div>
    </main>
  );
}