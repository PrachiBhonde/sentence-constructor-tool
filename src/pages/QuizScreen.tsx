import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Question {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string[];
}

const QuizScreen: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/yghugardare/Sample/main/sample.json")
      .then((res) => res.json())
      .then((data) => {
        const questionList = data?.data?.questions || [];
        setQuestions(questionList);
        setUserAnswers(Array(questionList.length).fill([]));
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) return;
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = newSelected;
    setUserAnswers(updatedAnswers);
  };

  const handleBlankClick = (index: number) => {
    const updated = [...selectedWords];
    updated.splice(index, 1);
    setSelectedWords(updated);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = updated;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    const correct = questions[currentIndex]?.correctAnswer.join(" ") === selectedWords.join(" ");
    if (correct) setScore((prev) => prev + 1);
    if (currentIndex + 1 === questions.length) {
      navigate("/result", { state: { questions, userAnswers, score: correct ? score + 1 : score } });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedWords(userAnswers[currentIndex + 1] || []);
      setTimer(30);
    }
  };

  if (questions.length === 0) return <div className="text-center mt-5">Loading...</div>;

  const current = questions[currentIndex];
  if (!current) return <div>Error loading question.</div>;

  const parts = current.question.split("________");

  return (
    <div className="container py-5">
      <div className="bg-white rounded p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-primary mb-0">Question {currentIndex + 1} of {questions.length}</h4>
          <div className="badge bg-warning text-dark fs-6">⏱️ {timer}s</div>
        </div>

        <div className="mb-4 fs-5">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < current.correctAnswer.length && (
                <button
                  onClick={() => handleBlankClick(i)}
                  className="btn btn-outline-secondary mx-1 my-1"
                >
                  {selectedWords[i] || "____"}
                </button>
              )}
            </span>
          ))}
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {current.options.map((word) => (
            <button
              key={word}
              disabled={selectedWords.includes(word)}
              onClick={() => handleWordClick(word)}
              className="btn btn-sm btn-outline-primary"
            >
              {word}
            </button>
          ))}
        </div>

        <div className="text-end">
          <button
            onClick={handleNext}
            disabled={selectedWords.length < current.correctAnswer.length}
            className="btn btn-success"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
