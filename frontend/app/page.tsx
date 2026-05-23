"use client";

import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConfidenceMeter from "../components/ConfidenceMeter";
import PDFButton from "../components/PDFButton";

import { motion } from "framer-motion";

export default function Home() {

  const [history, setHistory] = useState<any[]>([]);

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

  useEffect(() => {

    const saved = localStorage.getItem("predictionHistory");

    if (saved) {
      setHistory(JSON.parse(saved));
    }

  }, []);

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

      const updatedHistory = [
        {
          prediction: data.prediction,
          probability: data.probability,
          timestamp: new Date().toLocaleString()
        },
        ...history
      ];

      setHistory(updatedHistory);

      localStorage.setItem(
        "predictionHistory",
        JSON.stringify(updatedHistory)
      );

    } catch (error) {

      alert("Prediction failed");

      console.log(error);
    }

    setLoading(false);
  };

  return (

    <main
      id="home"
      className="min-h-screen bg-gradient-to-br from-white to-slate-200 dark:from-black dark:via-slate-900 dark:to-blue-950 text-black dark:text-white transition-colors duration-500 px-4 py-6 md:px-6"
    >

      <div className="max-w-6xl mx-auto">

        <Navbar />

        {/* HERO */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center py-12 md:py-16"
        >

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text leading-tight">
            PneumoScan AI
          </h1>

          <p className="text-base md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-8">
            AI-powered pneumonia risk screening platform using machine learning and clinical indicators.
          </p>

        </motion.div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* INPUT CARD */}

          <div className="bg-black/5 dark:bg-white/10 backdrop-blur-lg border border-slate-300 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-8">
              Patient Data
            </h2>

            {/* FEVER */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-700 dark:text-slate-300">
                Fever
              </label>

              <select
                name="fever"
                value={form.fever}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

            </div>

            {/* TACHYCARDIA */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-700 dark:text-slate-300">
                Tachycardia
              </label>

              <select
                name="tachycardia"
                value={form.tachycardia}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

            </div>

            {/* CRACKLES */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-700 dark:text-slate-300">
                Crackles
              </label>

              <select
                name="crackles"
                value={form.crackles}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

            </div>

            {/* OXYGEN */}

            <div className="mb-6">

              <label className="block mb-2 text-slate-700 dark:text-slate-300">
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

              <label className="block mb-2 text-slate-700 dark:text-slate-300">
                WBC Count
              </label>

              <input
                type="number"
                name="wbc_count"
                value={form.wbc_count}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />

            </div>

            {/* XRAY */}

            <div className="mb-8">

              <label className="block mb-2 text-slate-700 dark:text-slate-300">
                Chest X-Ray Result
              </label>

              <select
                name="chest_xray_result"
                value={form.chest_xray_result}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
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
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 py-3 md:py-4 rounded-2xl text-lg md:text-xl font-bold shadow-lg text-white"
            >
              {loading ? "Analyzing..." : "Run AI Prediction"}
            </button>

          </div>

          {/* RESULT CARD */}

          <div className="bg-black/5 dark:bg-white/10 backdrop-blur-lg border border-slate-300 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Prediction Result
            </h2>

            {!result && !loading && (

              <div className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
                Submit patient data to generate AI prediction.
              </div>

            )}

            {loading && (

              <div className="flex flex-col items-center py-10">

                <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 text-center">
                  AI analyzing patient data...
                </p>

              </div>

            )}

            {result && (

              <div>

                <div className="mb-6">

                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Diagnosis
                  </p>

                  <h3 className="text-3xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400 break-words">
                    {result.prediction}
                  </h3>

                </div>

                <div className="mb-6">

                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Probability
                  </p>

                  <h3 className="text-2xl md:text-4xl font-bold">
                    {(result.probability * 100).toFixed(2)}%
                  </h3>

                  <ConfidenceMeter probability={result.probability} />

                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-300 dark:border-slate-700">

                  <p className="text-slate-700 dark:text-slate-300 leading-8 text-sm md:text-base">
                    AI-generated prediction based on clinical indicators and trained ML model.
                  </p>

                </div>

                <PDFButton
                  prediction={result.prediction}
                  probability={result.probability}
                />

              </div>

            )}

          </div>

        </div>

        {/* DASHBOARD */}

        <section
          id="dashboard"
          className="mt-24 md:mt-32"
        >

          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            AI Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-black/5 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-700">

              <h3 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">
                Accuracy
              </h3>

              <p className="text-4xl md:text-5xl font-bold">
                94%
              </p>

              <p className="text-slate-600 dark:text-slate-400 mt-4 leading-8">
                Model validation accuracy achieved during training.
              </p>

            </div>

            <div className="bg-black/5 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-700">

              <h3 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">
                Predictions
              </h3>

              <p className="text-4xl md:text-5xl font-bold">
                12K+
              </p>

              <p className="text-slate-600 dark:text-slate-400 mt-4 leading-8">
                Simulated AI screenings processed by the system.
              </p>

            </div>

            <div className="bg-black/5 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-700">

              <h3 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">
                ML Model
              </h3>

              <p className="text-2xl md:text-3xl font-bold">
                Gradient Boosting
              </p>

              <p className="text-slate-600 dark:text-slate-400 mt-4 leading-8">
                Optimized ensemble learning classifier for prediction.
              </p>

            </div>

          </div>

        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="mt-24 md:mt-32"
        >

          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            About The Project
          </h2>

          <div className="bg-black/5 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 border border-slate-300 dark:border-slate-700 max-w-4xl mx-auto">

            <p className="text-base md:text-xl text-slate-700 dark:text-slate-300 leading-9">

              PneumoScan AI is a machine learning-powered healthcare screening platform designed to predict pneumonia risk using clinical indicators and AI-driven analysis.

              The application combines FastAPI, Next.js, Tailwind CSS, and Scikit-learn to deliver real-time predictions through a modern full-stack architecture.

            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

              <div>

                <h3 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">
                  Tech Stack
                </h3>

                <ul className="space-y-2 text-slate-700 dark:text-slate-300 leading-8">

                  <li>• Next.js</li>
                  <li>• FastAPI</li>
                  <li>• Tailwind CSS</li>
                  <li>• Scikit-learn</li>
                  <li>• Vercel + Render</li>

                </ul>

              </div>

              <div>

                <h3 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">
                  Features
                </h3>

                <ul className="space-y-2 text-slate-700 dark:text-slate-300 leading-8">

                  <li>• Real-time AI prediction</li>
                  <li>• Interactive medical UI</li>
                  <li>• ML inference API</li>
                  <li>• Responsive design</li>
                  <li>• Cloud deployment</li>

                </ul>

              </div>

            </div>

          </div>

        </section>

        {/* HISTORY */}

        <section className="mt-24 md:mt-32">

          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Prediction History
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">

            {history.map((item, index) => (

              <div
                key={index}
                className="bg-black/5 dark:bg-white/10 backdrop-blur-lg border border-slate-300 dark:border-slate-700 rounded-2xl p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  <div>

                    <h3 className="text-xl md:text-2xl font-bold text-cyan-600 dark:text-cyan-400 break-words">
                      {item.prediction}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400">
                      {(item.probability * 100).toFixed(2)}%
                    </p>

                  </div>

                  <p className="text-slate-500 text-sm">
                    {item.timestamp}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

        <Footer />

      </div>

    </main>
  );
}