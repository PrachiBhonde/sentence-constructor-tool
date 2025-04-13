import React, { useState } from "react";

type SentenceCardProps = {
  sentence: string; 
  options: string[]; 
  correctAnswer: string[]; 
  onComplete: (answer: string[]) => void;
};

const SentenceCard: React.FC<SentenceCardProps> = ({
  sentence,
  options,
  correctAnswer,
  onComplete,
}) => {
  const blankCount = (sentence.match(/___/g) || []).length;
  const [selectedWords, setSelectedWords] = useState<string[]>(
    Array(blankCount).fill("")
  );
  const [usedOptions, setUsedOptions] = useState<boolean[]>(
    Array(options.length).fill(false)
  );

  const handleOptionClick = (word: string, index: number) => {
    const firstEmptyIndex = selectedWords.findIndex((w) => w === "");
    if (firstEmptyIndex === -1) return;

    const newSelected = [...selectedWords];
    newSelected[firstEmptyIndex] = word;
    setSelectedWords(newSelected);

    const newUsed = [...usedOptions];
    newUsed[index] = true;
    setUsedOptions(newUsed);

    if (!newSelected.includes("")) {
      onComplete(newSelected);
    }
  };

  const handleBlankClick = (index: number) => {
    const wordToRemove = selectedWords[index];
    if (!wordToRemove) return;

    const wordIndex = options.findIndex((w) => w === wordToRemove);
    const newSelected = [...selectedWords];
    newSelected[index] = "";
    setSelectedWords(newSelected);

    const newUsed = [...usedOptions];
    newUsed[wordIndex] = false;
    setUsedOptions(newUsed);
  };

  const renderSentence = () => {
    const parts = sentence.split("___");
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < selectedWords.length && (
          <button
            className="inline-block border px-2 mx-1 min-w-[50px] rounded bg-blue-100"
            onClick={() => handleBlankClick(index)}
          >
            {selectedWords[index] || "___"}
          </button>
        )}
      </span>
    ));
  };

  return (
    <div className="p-4 rounded-lg bg-white shadow-md w-full max-w-2xl">
      <p className="text-lg mb-4">{renderSentence()}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((word, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded bg-blue-500 text-white ${
              usedOptions[index] ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleOptionClick(word, index)}
            disabled={usedOptions[index]}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SentenceCard;
