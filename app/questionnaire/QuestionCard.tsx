import type { Question } from "./questions";

interface QuestionCardProps {
  question: Question;
  selectedOptionId: string | undefined;
  onSelectOption: (optionId: string) => void;
}

export function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <fieldset className="flex w-full max-w-xl flex-col gap-4">
      <legend className="mb-2 text-2xl font-bold text-slate-900">
        {question.text}
      </legend>

      {question.options.map((option) => {
        const isSelected = option.id === selectedOptionId;

        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
              isSelected
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option.id}
              checked={isSelected}
              onChange={() => onSelectOption(option.id)}
              className="h-4 w-4 accent-slate-900"
            />
            <span className="font-medium">{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}