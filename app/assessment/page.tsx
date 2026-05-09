"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../../data/questions";
import { deriveFlowState } from "../../data/engine";

export default function AssessmentPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState<any>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // -------------------------
  // Conditional logic engine
  // -------------------------
  function shouldShowQuestion(question: any, answers: any) {
    if (!question.showIf) return true;
    return Object.entries(question.showIf).every(([key, value]) => {
      return answers[key] === value;
    });
  }

  const visibleQuestions = questions.filter((q) =>
    shouldShowQuestion(q, answers)
  );

  const question = visibleQuestions[currentQuestion];

  // -------------------------
  // Multi-select helper
  // -------------------------
  function toggleOption(value: string) {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  // -------------------------
  // Answer handler
  // -------------------------
  function handleAnswer(value: any) {
    let updatedAnswers = {
      ...answers,
      [question.id]: value,
    };

    // Derive and inject flowState after any answer
    const flowState = deriveFlowState(updatedAnswers);
    if (flowState) {
      updatedAnswers = { ...updatedAnswers, flowState };
    }

    setAnswers(updatedAnswers);
    setSelectedOptions([]);

    // Check if this answer means we should stop early
    if (flowState === "NOT_APPLICABLE_INDIA") {
      router.push(
        `/report?data=${encodeURIComponent(JSON.stringify(updatedAnswers))}`
      );
      return;
    }

    // Recalculate visible questions with new answers
    const newVisible = questions.filter((q) =>
      shouldShowQuestion(q, updatedAnswers)
    );

    if (currentQuestion < newVisible.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push(
        `/report?data=${encodeURIComponent(JSON.stringify(updatedAnswers))}`
      );
    }
  }

  if (!question) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">

        {/* Back */}
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="mb-8 text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
        )}

        {/* Progress */}
        <p className="text-sm text-gray-500 mb-4">
          Question {currentQuestion + 1} of {visibleQuestions.length}
        </p>

        <div className="w-full h-1 bg-gray-900 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{
              width: `${
                ((currentQuestion + 1) / visibleQuestions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          {question.title}
        </h1>

        <p className="text-gray-400 mb-10 leading-7">
          {question.description}
        </p>

        {/* BOOLEAN */}
        {question.type === "boolean" && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-white transition"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="px-6 py-4 rounded-2xl border border-gray-700 hover:border-white transition"
            >
              No
            </button>
          </div>
        )}

        {/* SINGLE SELECT */}
        {question.type === "single-select" && (
          <div className="space-y-4">
            {question.options?.map((option: any) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-5 rounded-2xl border border-gray-700 hover:border-white transition"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* MULTI SELECT */}
        {question.type === "multi-select" && (
          <div className="space-y-4">
            {question.options?.map((option: any) => {
              const selected = selectedOptions.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={`w-full text-left p-5 rounded-2xl border transition ${
                    selected
                      ? "border-white bg-white/10"
                      : "border-gray-700 hover:border-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}

            <button
              onClick={() => handleAnswer(selectedOptions)}
              disabled={selectedOptions.length === 0}
              className="mt-6 px-6 py-4 rounded-2xl bg-white text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </main>
  );
}