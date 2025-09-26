import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const studyMethods = [
  {
    title: "Pomodoro Technique",
    tagline: "Work in focused bursts.",
    icon: "timer",
    image: "/img1.png",
    description: "Break your work into short, timed intervals (typically 25 minutes), followed by a 5-minute break. After four intervals, take a longer 15-30 minute break. This technique boosts focus and prevents burnout by making large tasks feel more manageable.",
  },
  {
    title: "Feynman Technique",
    tagline: "Learn by teaching.",
    icon: "school",
    image: "/img2.png",
    description: "Named after physicist Richard Feynman, this method involves four steps: 1. Pick a concept. 2. Explain it in simple terms as if to a child. 3. Identify gaps in your understanding where you struggle. 4. Review and simplify again. It forces deep comprehension over rote memorization.",
  },
  {
    title: "Active Recall",
    tagline: "Test yourself, don't just review.",
    icon: "psychology",
    image: "/img3.png",
    description: "Instead of passively rereading notes, actively retrieve information from your memory. Use flashcards, do practice questions, or simply cover your notes and try to recite the key concepts. This is one of the most effective ways to build strong, lasting memories.",
  },
  {
    title: "Mind Mapping",
    tagline: "Visualize and connect ideas.",
    icon: "hub",
    image: "/img4.png",
    description: "Start with a central idea and branch out with related subtopics and details. Using colors, keywords, and images helps organize information in a way that mimics your brain's natural associative thinking. It's excellent for brainstorming, planning, and seeing the big picture.",
  },
  {
    title: "SQ3R Method",
    tagline: "Read with a purpose.",
    icon: "menu_book",
    image: "/img5.png",
    description: "A reading comprehension technique that stands for Survey, Question, Read, Recite, Review. It turns passive reading into an active process, helping you engage with the material and retain information much more effectively.",
  },
  {
    title: "Blurting Method",
    tagline: "Pour out what you know.",
    icon: "edit_note",
    image: "/img6.png",
    description: "After studying a topic, take a blank sheet of paper and write down everything you remember. This 'blurt' reveals what you've truly retained. Then, compare it to your notes to instantly see the gaps you need to fill. It's a powerful form of active recall.",
  },
];

export default function StudyMeth() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(studyMethods[0]);
  
  const subtleYellow = '#FFF8E1';
  const primaryGold = '#FFD54F';

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Unlock Your Learning Potential</h2>
        <p className="lead text-muted">Discover proven methods to study smarter, not just harder.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm h-100 border-light">
            <img 
              src={selectedMethod.image} 
              className="card-img-top" 
              alt={selectedMethod.title} 
              style={{ height: '300px', objectFit: 'cover' }} 
            />
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <span className="material-icons me-3" style={{ fontSize: '2.5rem', color: primaryGold }}>
                  {selectedMethod.icon}
                </span>
                <div>
                  <h4 className="card-title fw-bold mb-0">{selectedMethod.title}</h4>
                  <p className="card-text text-muted fst-italic">{selectedMethod.tagline}</p>
                </div>
              </div>
              <p className="card-text fs-5" style={{ color: '#555' }}>{selectedMethod.description}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm h-100 border-light">
            <div className="card-header bg-white fw-bold border-bottom-0">
              Choose a Method
            </div>
            <div className="list-group list-group-flush">
              {studyMethods.map((method) => {
                const isSelected = selectedMethod.title === method.title;
                return (
                  <button
                    key={method.title}
                    type="button"
                    className={`list-group-item list-group-item-action p-3 border-0`}
                    style={{ 
                      backgroundColor: isSelected ? subtleYellow : 'white',
                      borderLeft: isSelected ? `4px solid ${primaryGold}` : '4px solid transparent',
                      transition: 'background-color 0.2s ease-in-out'
                    }}
                    onClick={() => setSelectedMethod(method)}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className={`mb-1 ${isSelected ? 'fw-bold' : 'fw-normal'}`}>{method.title}</h6>
                    </div>
                    <small className="text-muted">{method.tagline}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          <span className="material-icons align-middle me-1">arrow_back</span>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
