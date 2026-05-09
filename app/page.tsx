export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">
        DPDP Classifier
      </h1>

      <p className="mb-4">
        Determine whether you are a Data Fiduciary,
        Data Processor, or Data Principal under the
        DPDP Act.
      </p>

      <div className="border p-6 rounded-xl max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          Question 1
        </h2>

        <p className="mb-4">
          Do you determine why and how personal data is processed?
        </p>

        <div className="flex gap-4">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Yes
          </button>

          <button className="border px-4 py-2 rounded-lg">
            No
          </button>
        </div>
      </div>
    </main>
  );
}