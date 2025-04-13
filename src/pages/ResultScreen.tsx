import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string[];
}

interface LocationState {
  questions: Question[];
  userAnswers: string[][];
  score: number;
}

const ResultScreen: React.FC = () => {
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();

  const { questions, userAnswers, score } = state || {
    questions: [],
    userAnswers: [],
    score: 0,
  };

  if (!questions.length) {
    return (
      <div className="text-center p-5">
        <h2 className="text-xl font-bold mb-4">No Result Found</h2>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">🎉 Quiz Completed!</h2>
        <p className="text-lg mt-2">Your Score: {score} / {questions.length}</p>
      </div>

      <div className="accordion" id="resultAccordion">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index]?.join(" ") || "No answer";
          const correctAnswer = q.correctAnswer.join(" ");
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div className="accordion-item mb-3" key={q.questionId}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${!isCorrect ? "bg-warning" : "bg-success text-white"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="true"
                  aria-controls={`collapse${index}`}
                >
                  Question {index + 1} - {isCorrect ? "✅ Correct" : "❌ Wrong"}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#resultAccordion"
              >
                <div className="accordion-body">
                  <p><strong>Question:</strong> {q.question}</p>
                  <p><strong>Your Answer:</strong> {userAnswer}</p>
                  <p><strong>Correct Answer:</strong> {correctAnswer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-5">
        <button onClick={() => navigate("/quiz")} className="btn btn-success me-2">
          🔁 Retake Quiz
        </button>
        <button onClick={() => navigate("/")} className="btn btn-secondary">
          🏠 Home
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
