import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    q: "You have an exam tomorrow, and you realize you haven't finished studying. What do you do?",
    options: [ "Panic and stay up all night without sleep.", "Try to study as much as you can and sleep late.", "Make a quick plan and revise calmly for a few hours." ],
  },
  {
    q: "You get unexpected extra homework right before the weekend. How do you feel?",
    options: [ "Extremely anxious and irritated; it ruins your weekend.", "A little upset, but you decide to manage.", "Accept it and plan to finish it without much stress." ],
  },
  {
    q: "Before a big presentation in class, your teacher suddenly asks you to go first. What’s your reaction?",
    options: [ "Heart races, hands shake, and you almost freeze.", "Nervous but you manage to present.", "A little nervous but confident enough to speak." ],
  },
  {
    q: "When you see a low grade in a subject, what do you think?",
    options: [ "“I’m a failure; I can’t do anything right.”", "“I should work harder next time.”", "“One bad grade won’t define me.”" ],
  },
  {
    q: "Your friend cancels plans when you were excited about meeting. How do you respond?",
    options: [ "Feel very upset and think you have no real friends.", "Feel a little sad but understand.", "Just move on and plan something else." ],
  },
  {
    q: "The teacher suddenly announces a surprise quiz. What happens to you?",
    options: [ "Panic, can’t think straight, feel like running away.", "Nervous but try your best.", "Stay calm and give it your best shot." ],
  },
  {
    q: "You have a busy schedule with back-to-back classes and assignments. How do you handle it?",
    options: [ "Feel overwhelmed and can’t concentrate on anything.", "Get tired but try to prioritize.", "Make a schedule and manage one by one." ],
  },
  {
    q: "Your parents ask about your grades when they expect high scores. How do you feel?",
    options: [ "Very anxious, scared, and stressed about disappointing them.", "A little nervous but explain honestly.", "Calm and explain that you’ll improve next time." ],
  },
  {
    q: "You are asked to participate in a competition with only 2 days to prepare. What do you do?",
    options: [ "Feel panicked and immediately think you can’t do it.", "Feel nervous but try to prepare.", "Take it as a challenge and start working on it." ],
  },
  {
    q: "When something doesn’t go as planned, how do you usually react?",
    options: [ "Get angry, stressed, and feel everything is ruined.", "Feel upset but try to fix it.", "Stay calm and look for alternatives." ],
  },
];

export default function Quiz() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const navigate = useNavigate();
    const primaryGold = '#FFD54F';

    const handleSelect = (qIndex, optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[qIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const total = answers.reduce((sum, ans) => sum + (ans || 0), 0);
        let result = {};

        if (total <= 6) {
            result = { level: "High Stress", color: "danger" };
        } else if (total <= 13) {
            result = { level: "Moderate Stress", color: "warning" };
        } else {
            result = { level: "Low Stress", color: "success" };
        }
        
        navigate("/quiz-result", { state: { result } });
    };

    const answeredCount = answers.filter(ans => ans !== null).length;
    const progress = (answeredCount / questions.length) * 100;

    return (
        <div className="container py-5">
            <style>
            {`
              .quiz-option.active {
                background-color: ${primaryGold} !important;
                color: #343a40 !important;
                border-color: ${primaryGold} !important;
              }
            `}
            </style>
            <div className="text-center mb-4">
                <h2 className="fw-bold">Student Wellness Quiz</h2>
                <p className="text-muted">Let's check in on how you're feeling.</p>
            </div>

            <div className="progress mb-5" style={{ height: "1.5rem" }}>
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${progress}%`, backgroundColor: primaryGold, color: '#343a40' }}
                    aria-valuenow={progress}
                >
                    {Math.round(progress)}%
                </div>
            </div>

            {questions.map((q, idx) => (
                <div key={idx} className="card shadow-sm mb-4 border-light">
                    <div className="card-header bg-transparent border-bottom-0 pt-3">
                        <strong>Question {idx + 1}/{questions.length}</strong>
                    </div>
                    <div className="card-body">
                        <p className="card-title fs-5">{q.q}</p>
                        <div className="d-grid gap-2">
                            {q.options.map((opt, optIdx) => (
                                <button
                                    key={optIdx}
                                    className={`btn btn-outline-secondary text-start quiz-option ${answers[idx] === optIdx ? "active" : ""}`}
                                    onClick={() => handleSelect(idx, optIdx)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button className="btn btn-light me-md-2" onClick={() => navigate("/")}>Back to Dashboard</button>
                <button
                    className="btn fw-bold"
                    onClick={handleSubmit}
                    disabled={answers.includes(null)}
                    style={{ backgroundColor: primaryGold, color: '#343a40' }}
                >
                    See My Results
                </button>
            </div>
        </div>
    );
}
