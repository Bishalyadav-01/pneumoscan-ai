"use client";

import { useState } from "react";

export default function Home() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [form, setForm] = useState({
    fever: 1,
    tachycardia: 1,
    crackles: 1,
    oxygen_saturation: 91,
    wbc_count: 13,
    chest_xray_result: "consolidation"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const predict = async () => {

    setLoading(true);

    setResult(null);

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            fever: Number(form.fever),
            tachycardia: Number(form.tachycardia),
            crackles: Number(form.crackles),
            oxygen_saturation: Number(form.oxygen_saturation),
            wbc_count: Number(form.wbc_count),
            chest_xray_result: form.chest_xray_result
          })
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {

      alert("Prediction failed");

      console.log(error);
    }

    setLoading(false);
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* HERO */}

        <div className="text-center py-16">

          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            PneumoScan AI
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered pneumonia risk screening platform using machine learning and clinical indicators.
          </p>

        </div>

        {/* CARD */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* INPUTS */}

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-8">
              Patient Data
            </h2>

            {/* FEVER */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-300">
                Fever
              </label>

              <select
                name="fever"
                value={form.fever}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

            </div>

            {/* TACHYCARDIA */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-300">
                Tachycardia
              </label>

              <select
                name="tachycardia"
                value={form.tachycardia}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

            </div>

            {/* CRACKLES */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-300">
                Crackles
              </label>

              <select
                name="crackles"
                value={form.crackles}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

            </div>

            {/* OXYGEN */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-300">
                Oxygen Saturation: {form.oxygen_saturation}%
              </label>

              <input
                type="range"
                min="70"
                max="100"
                name="oxygen_saturation"
                value={form.oxygen_saturation}
                onChange={handleChange}
                className="w-full"
              />

            </div>

            {/* WBC */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-300">
                WBC Count
              </label>

              <input
                type="number"
                name="wbc_count"
                value={form.wbc_count}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
              />

            </div>

            {/* XRAY */}

            <div className="mb-8">

              <label className="block mb-2 text-slate-300">
                Chest X-Ray Result
              </label>

              <select
                name="chest_xray_result"
                value={form.chest_xray_result}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
              >
                <option value="normal">Normal</option>
                <option value="consolidation">Consolidation</option>
                <option value="effusion">Effusion</option>
                <option value="infiltrate">Infiltrate</option>
                <option value="opacity">Opacity</option>
              </select>

            </div>

            {/* BUTTON */}

            <button
              onClick={predict}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 py-4 rounded-2xl text-xl font-bold shadow-lg"
            >
              {loading ? "Analyzing..." : "Run AI Prediction"}
            </button>

          </div>

          {/* RESULT */}

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-center">

            <h2 className="text-3xl font-bold mb-8">
              Prediction Result
            </h2>

            {!result && !loading && (

              <div className="text-slate-400 text-lg">
                Submit patient data to generate AI prediction.
              </div>

            )}

            {loading && (

              <div className="flex flex-col items-center">

                <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>

                <p className="text-xl text-slate-300">
                  AI analyzing patient data...
                </p>

              </div>

            )}

            {result && (

              <div className="animate-pulse">

                <div className="mb-6">

                  <p className="text-slate-400 mb-2">
                    Diagnosis
                  </p>

                  <h3 className="text-5xl font-bold text-cyan-400">
                    {result.prediction}
                  </h3>

                </div>

                <div className="mb-6">

                  <p className="text-slate-400 mb-2">
                    Probability
                  </p>

                  <h3 className="text-4xl font-bold">
                    {(result.probability * 100).toFixed(2)}%
                  </h3>

                </div>

                <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-700">

                  <p className="text-slate-300">
                    AI-generated prediction based on clinical indicators and trained ML model.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}