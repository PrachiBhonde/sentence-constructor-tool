import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div className="bg-light p-5 rounded shadow-lg">
        <h1 className="display-5 fw-bold mb-3 text-primary">🧠 Sentence Construction Quiz</h1>
        <p className="lead mb-4">
          Test your sentence-building skills in this interactive quiz game! Complete the blanks using the correct words before time runs out.
        </p>
        <button
          className="btn btn-success btn-lg px-4 py-2"
          onClick={() => navigate("/quiz")}
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
