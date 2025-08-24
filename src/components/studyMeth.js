import { useState } from "react";

const studyMethods = [
  {
    title: "Pomodoro Technique",
    description:
      "The Pomodoro Technique is a time-management strategy designed to improve focus and productivity. You break your work into short, timed intervals called 'Pomodoro' (typically 25 minutes), followed by a 5-minute break. After completing four Pomodoros, you take a longer break (15–30 minutes). The core idea is that short bursts of focused work maximize concentration while frequent breaks prevent mental fatigue. It’s great for tackling large tasks, overcoming procrastination, and keeping motivation consistent. Tools like timers or apps can help track Pomodoros and breaks effectively.",
  },
  {
    title: "Feynman Technique",
    description:
      "Named after physicist Richard Feynman, this method is all about learning by teaching. The process has four steps: Pick a concept you want to understand. Explain it in simple language as if teaching a child. Identify gaps in your explanation where you struggle to simplify. Review and refine your understanding, then repeat the process. The Feynman Technique works because translating knowledge into your own words forces deep comprehension rather than passive memorization. It’s particularly effective for complex subjects like physics, math, or coding concepts.",
  },
  {
    title: "Mind Mapping",
    description:
      "Mind mapping is a visual brainstorming tool that organizes information hierarchically around a central concept. You start with a central idea, then create branches for related subtopics, and further sub-branches for details. Using keywords, colors, or small illustrations enhances memory and creativity. Mind maps help in planning projects, studying for exams, or connecting scattered ideas because they mimic the brain’s natural associative thinking. They are excellent for visual learners who grasp patterns better than linear notes.",
  },
  {
    title: "SQ3R Method",
    description:
      "Survey, Question, Read, Recite, Review. A structured reading strategy to improve comprehension.",
  },
  {
    title: "Active Recall",
    description:
      "Close your notes and test yourself frequently. Forcing recall strengthens memory better than passive reading.",
  },
  {
    title: "Blurting Method",
    description:
      "After studying, write down everything you remember without looking at notes, then fill in the gaps.",
  },
];

export default function StudyMeth({ onBack }) {
  const [activeTab, setActiveTab] = useState(0);

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Study Methods</h2>

      {/* --- Image Grid --- */}
      {/* --- Image Grid --- */}
      <div className="row mb-4 text-center">
        {images.map((img, idx) => (
          <div key={idx} className="col-6 col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src={img}
                alt={`Study ${idx + 1}`}
                className="card-img-top img-fluid rounded"
              />
            </div>
          </div>
        ))}
      </div>

      {/* --- Tabs --- */}
      <ul className="nav nav-tabs mb-3">
        {studyMethods.map((method, idx) => (
          <li className="nav-item" key={idx}>
            <button
              className={`nav-link ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              {method.title}
            </button>
          </li>
        ))}
      </ul>

      {/* --- Tab Content --- */}
      <div className="card shadow-sm p-3">
        <h5>{studyMethods[activeTab].title}</h5>
        <p>{studyMethods[activeTab].description}</p>
      </div>

      <button className="btn btn-secondary mt-3" onClick={onBack}>
        Back to Dashboard
      </button>
    </div>
  );
}
