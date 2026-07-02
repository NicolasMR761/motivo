"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONNAIRE_QUESTIONS } from "./questions";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSteps = QUESTIONNAIRE_QUESTIONS.length;
  const currentQuestion = QUESTIONNAIRE_QUESTIONS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const hasAnsweredCurrentQuestion = Boolean(answers[currentQuestion.id]);

  function handleSelectOption(optionId: string) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: optionId,
    }));
  }

  function goToPreviousStep() {
    setCurrentStepIndex((previousIndex) => Math.max(previousIndex - 1, 0));
  }

  function handlePrimaryButtonClick() {
    if (isLastStep) {
      router.push("/results");
      return;
    }

    setCurrentStepIndex((previousIndex) =>
      Math.min(previousIndex + 1, totalSteps - 1),
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-50 px-6 py-16">
      <ProgressBar currentStep={currentStepIndex + 1} totalSteps={totalSteps} />

      <QuestionCard
        question={currentQuestion}
        selectedOptionId={answers[currentQuestion.id]}
        onSelectOption={handleSelectOption}
      />

      <div className="flex w-full max-w-xl justify-between gap-4">
        <button
          type="button"
          onClick={goToPreviousStep}
          disabled={isFirstStep}
          className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>

        <button
          type="button"
          onClick={handlePrimaryButtonClick}
          disabled={!hasAnsweredCurrentQuestion}
          className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLastStep ? "Ver mi recomendación" : "Siguiente"}
        </button>
      </div>
    </main>
  );
}