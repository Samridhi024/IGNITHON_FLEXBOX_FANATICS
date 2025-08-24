// src/components/Quiz.js
import { useState } from "react";

const questions = [
  {
    q: "You have an exam tomorrow, and you realize you haven't finished studying. What do you do?",
    options: [
      "Panic and stay up all night without sleep.",
      "Try to study as much as you can and sleep late.",
      "Make a quick plan and revise calmly for a few hours."
    ],
  },
  {
    q: "You get unexpected extra homework right before the weekend. How do you feel?",
    options: [
      "Extremely anxious and irritated; it ruins your weekend.",
      "A little upset, but you decide to manage.",
      "Accept it and plan to finish it without much stress."
    ],
  },
  {
    q: "Before a big presentation in class, your teacher suddenly asks you to go first. What’s your reaction?",
    options: [
      "Heart races, hands shake, and you almost freeze.",
      "Nervous but you manage to present.",
      "A little nervous but confident enough to speak."
    ],
  },
  {
    q: "When you see a low grade in a subject, what do you think?",
    options: [
      "“I’m a failure; I can’t do anything right.”",
      "“I should work harder next time.”",
      "“One bad grade won’t define me.”"
    ],
  },
  {
    q: "Your friend cancels plans when you were excited about meeting. How do you respond?",
    options: [
      "Feel very upset and think you have no real friends.",
      "Feel a little sad but understand.",
      "Just move on and plan something else."
    ],
  },
  {
    q: "The teacher suddenly announces a surprise quiz. What happens to you?",
    options: [
      "Panic, can’t think straight, feel like running away.",
      "Nervous but try your best.",
      "Stay calm and give it your best shot."
    ],
  },
  {
    q: "You have a busy schedule with back-to-back classes and assignments. How do you handle it?",
    options: [
      "Feel overwhelmed and can’t concentrate on anything.",
      "Get tired but try to prioritize.",
      "Make a schedule and manage one by one."
    ],
  },
  {
    q: "Your parents ask about your grades when they expect high scores. How do you feel?",
    options: [
      "Very anxious, scared, and stressed about disappointing them.",
      "A little nervous but explain honestly.",
      "Calm and explain that you’ll improve next time."
    ],
  },
  {
    q: "You are asked to participate in a competition with only 2 days to prepare. What do you do?",
    options: [
      "Feel panicked and immediately think you can’t do it.",
      "Feel nervous but try to prepare.",
      "Take it as a challenge and start working on it."
    ],
  },
  {
    q: "When something doesn’t go as planned, how do you usually react?",
    options: [
      "Get angry, stressed, and feel everything is ruined.",
      "Feel upset but try to fix it.",
      "Stay calm and look for alternatives."
    ],
  },
];

export default function Quiz({ onBack }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex + 1; // 1, 2, or 3
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const total = answers.reduce((sum, ans) => sum + (ans || 0), 0);

    if (total >= 25) return "Low Stress (Healthy coping strategies)";
    if (total >= 17) return "Moderately Stressed (Can manage but needs better coping skills)";
    return "Highly Stressed (Needs immediate attention & support)";
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Student Stress Quiz</h2>

      {!submitted ? (
        <>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4">
              <p><strong>{idx + 1}. {q.q}</strong></p>
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`q${idx}`}
                    checked={answers[idx] === optIdx + 1}
                    onChange={() => handleSelect(idx, optIdx)}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}
            </div>
          ))}

          <button
            className="btn btn-warning"
            onClick={() => setSubmitted(true)}
            disabled={answers.includes(null)}
          >
            Submit Quiz
          </button>
          <button className="btn btn-secondary ms-2" onClick={onBack}>
            Back to Dashboard
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3>Your Stress Level:</h3>
          <p className="fw-bold">{calculateResult()}</p>
          <button className="btn btn-secondary mt-3" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
