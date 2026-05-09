import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">

        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          DPDP Compliance Tool
        </p>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Understand your obligations under India's data protection law.
        </h1>

        <p className="text-gray-400 text-lg leading-8 mb-12">
          Answer a few plain-language questions about how your organisation
          handles personal data. We'll generate a preliminary compliance
          assessment tailored to your situation.
        </p>

        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-start gap-4 text-gray-400">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
            <span>Takes about 2 minutes</span>
          </div>
          <div className="flex items-start gap-4 text-gray-400">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
            <span>No sign-up required</span>
          </div>
          <div className="flex items-start gap-4 text-gray-400">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
            <span>Covers Data Fiduciary and Data Processor obligations</span>
          </div>
          <div className="flex items-start gap-4 text-gray-400">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
            <span>Printable report at the end</span>
          </div>
        </div>

        <Link
          href="/assessment"
          className="inline-block px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-100 transition"
        >
          Start Assessment →
        </Link>

        <p className="mt-8 text-sm text-gray-600">
          This tool provides informational guidance only and does not
          constitute legal advice.
        </p>

      </div>
    </main>
  );
}