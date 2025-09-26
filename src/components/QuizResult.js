import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const stressContent = {
    "High Stress": {
        title: "It seems like you're under a lot of pressure.",
        description: "A high stress level suggests that academic and personal pressures are significantly impacting your well-being. It's crucial to acknowledge these feelings and seek strategies to manage them. Remember, you are not alone in this.",
        reasons: [ "Heavy academic workload or looming deadlines.", "Pressure to achieve high grades from yourself or others.", "Difficulty balancing studies with social life or work.", "Anxiety about future career prospects.", ],
        advice: [
            { title: "Practice the 4-7-8 Breathing Technique", content: "Inhale through your nose for 4 seconds, hold your breath for 7 seconds, and exhale slowly through your mouth for 8 seconds. Repeat 3-5 times to calm your nervous system instantly." },
            { title: "Use the 'Brain Dump' Method", content: "Take 10 minutes to write down everything on your mind—worries, tasks, fears. Getting them out of your head and onto paper can make them feel more manageable and less overwhelming." },
            { title: "Reach Out and Talk", content: "Don't hesitate to talk to a trusted friend, family member, or a professional. Sharing your feelings can provide immense relief. Consider contacting the TeleMANAS helpline at 14416." },
        ],
    },
    "Moderate Stress": {
        title: "You're juggling a lot, and it's starting to show.",
        description: "A moderate stress level indicates that while you are generally coping, there are noticeable periods of pressure affecting you. It’s a good time to build healthier coping mechanisms to prevent burnout.",
        reasons: [ "Procrastination leading to last-minute rushes.", "An irregular sleep schedule.", "Feeling overwhelmed by a challenging subject.", "Minor conflicts with friends or family.", ],
        advice: [
            { title: "Implement the Pomodoro Technique", content: "Work in focused 25-minute intervals, followed by a 5-minute break. This can improve focus and reduce the feeling of being overwhelmed. Check our Study Methods page for more info!" },
            { title: "Schedule 'Worry Time'", content: "Set aside 15-20 minutes each day to consciously think about your worries. When a worry pops up outside this time, jot it down and defer it to your scheduled slot. This helps contain anxious thoughts." },
            { title: "Incorporate Daily Movement", content: "Even a 15-minute walk can boost your mood and clear your head. Physical activity is a powerful stress reducer." },
        ],
    },
    "Low Stress": {
        title: "You're managing your stress well!",
        description: "A low stress level suggests you have effective coping strategies and a healthy perspective on challenges. Keep nurturing these habits to maintain your well-being and resilience.",
        reasons: [ "Effective time management and organization.", "A strong support system of friends and family.", "A positive mindset towards challenges.", "Prioritizing sleep and personal well-being.", ],
        advice: [
            { title: "Practice Gratitude Journaling", content: "At the end of each day, write down three things you are grateful for. This simple habit reinforces a positive outlook and builds emotional resilience." },
            { title: "Explore a New Hobby", content: "Engaging in a non-academic activity you enjoy is a great way to de-stress and foster creativity. It provides a healthy escape from routine pressures." },
            { title: "Help a Friend", content: "Since you're in a good place, offer support to a friend who might be struggling. Helping others can reinforce your own sense of well-being and purpose." },
        ],
    },
};

export default function QuizResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result } = location.state || { result: { level: 'Moderate Stress', color: 'warning' } }; 

    const content = stressContent[result.level];

    return (
        <div className={`container-fluid bg-${result.color} bg-opacity-10 py-5`}>
            <div className="container">
                <div className="card shadow-lg border-0">
                    <div className={`card-header bg-${result.color} text-white text-center p-4`}>
                        <h1 className="display-4 fw-bold">{result.level}</h1>
                    </div>
                    <div className="card-body p-5">
                        <h3 className="card-title text-center mb-3">{content.title}</h3>
                        <p className="lead text-center text-muted mb-5">{content.description}</p>
                        <div className="row g-5">
                            <div className="col-md-6">
                                <h4 className="mb-3 border-bottom pb-2">Common Reasons for This Feeling</h4>
                                <ul className="list-group list-group-flush">
                                    {content.reasons.map((reason, index) => (
                                        <li key={index} className="list-group-item d-flex align-items-center">
                                            <span className="material-icons text-warning me-3">psychology</span>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h4 className="mb-3 border-bottom pb-2">Actionable Advice & Strategies</h4>
                                <div className="accordion" id="adviceAccordion">
                                    {content.advice.map((item, index) => (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header" id={`heading${index}`}>
                                                <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>{item.title}</button>
                                            </h2>
                                            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#adviceAccordion">
                                                <div className="accordion-body">{item.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <button className="btn btn-dark btn-lg" onClick={() => navigate('/')}>Return to Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}