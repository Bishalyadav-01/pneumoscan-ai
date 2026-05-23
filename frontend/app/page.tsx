"use client";

import { useState } from "react";

export default function Home() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const predict = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            fever: 1,
            tachycardia: 1,
            crackles: 1,
            oxygen_saturation: 91,
            wbc_count: 13,
            chest_xray_result: "consolidation"
          })
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {

      console.log(error);

      alert("Prediction failed");

    }

    setLoading(false);
  };

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold mb-6">
        PneumoScan AI
      </h1>

      <p className="text-gray-400 mb-10">
        AI-powered pneumonia screening system
      </p>

      <button
        onClick={predict}
        className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl text-xl"
      >
        {loading ? "Analyzing..." : "Run Prediction"}
      </button>

      {result && (

        <div className="mt-10 bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold mb-4">
            Prediction Result
          </h2>

          <p className="text-xl mb-2">
            Diagnosis:
            {" "}
            <span className="font-bold text-red-400">
              {result.prediction}
            </span>
          </p>

          <p className="text-xl">
            Probability:
            {" "}
            {(result.probability * 100).toFixed(2)}%
          </p>

        </div>

      )}

    </main>
  );
}