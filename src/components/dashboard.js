import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logOut, loginWithEmail, registerWithEmail } from "./firebase";
// import Welly from "./welly_react"; // Assuming welly_react.js is in this folder
import Chatbot from "./Chatbot";

const Dashboard = () => {
  const texts = ["Tomorrow is for the Taking", "Learn with WellEd", "Grow Your Future"];
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Typing effect
  useEffect(() => {
    const currentText = texts[textIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <WellEd
      user={user}
      navigate={navigate}
      displayedText={displayedText}
      logOut={logOut}
      loginWithEmail={loginWithEmail}
      registerWithEmail={registerWithEmail}
    />
  );
};

export default Dashboard;

function WellEd({ user, navigate, displayedText, logOut, loginWithEmail, registerWithEmail }) {
  const subtleYellow = '#FFF8E1';
  const primaryGold = '#FFD54F';

  return (
    <div style={{ backgroundColor: "#FAFAFA", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <div className="container py-4">
        <header className="bg-white rounded shadow-sm p-3 mb-5 sticky-top">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <a href="/" className="d-flex align-items-center text-decoration-none">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px", backgroundColor: primaryGold }}>
                  <span className="material-icons text-white">school</span>
                </div>
                <span className="ms-2 h5 mb-0 fw-bold text-dark">WellEd</span>
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {[
                    { label: "Features", detail: "Quizzes, study methods, and resources to help you learn smarter." },
                    { label: "About Us", detail: "WellEd combines education with well-being for student growth." },
                    { label: "Contact Us", detail: (<> <div>📞 Helpline: <strong>14416</strong></div> <div>🌐 <a href="https://telemanas.mohfw.gov.in/home" target="_blank" rel="noreferrer">TeleMANAS</a></div></>) },
                  ].map((item, idx) => (
                    <li key={idx} className="nav-item position-relative mx-2" style={{ listStyle: "none" }}>
                      <a className="nav-link text-secondary" href="#">{item.label}</a>
                      <div className="hover-box" style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px", background: "rgba(0,0,0,0.75)", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", opacity: 0, pointerEvents: "none", transition: "opacity 0.3s ease, transform 0.3s ease", whiteSpace: "nowrap", zIndex: 999 }}>{item.detail}</div>
                    </li>
                  ))}
                </ul>
                <div className="d-flex ms-3">
                  {user ? (
                    <>
                      <span className="navbar-text me-3 fw-bold">{user.email}</span>
                      <button className="btn btn-outline-danger" onClick={logOut}>Logout</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-dark me-2" onClick={() => loginWithEmail("test@test.com", "password123")}>Login</button>
                      <button className="btn btn-outline-dark" onClick={() => registerWithEmail("test@test.com", "password123")}>Register</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="row g-4">
          <div className="col-lg-8 bg-white rounded shadow-sm p-5">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="typing-wrap">
                  <h1 id="typing-text" className="display-5">{displayedText}<span className="cursor">|</span></h1>
                </div>
                <p className="mt-3 text-secondary fs-5">Learn smarter, live healthier. Education and well-being, hand in hand.</p>
                <button className="btn mt-4 fw-semibold d-flex align-items-center" style={{ backgroundColor: primaryGold, color: 'white', padding: '12px 24px', fontSize: '1.1rem' }}>
                  Get Started
                  <span className="material-icons align-middle ms-2">arrow_forward</span>
                </button>
              </div>
              <div className="col-md-6 text-center">
                <img src="wellbeing.png" alt="Illustration" className="img-fluid rounded" />
              </div>
            </div>
            <div className="mt-5 border-top pt-4 row g-4 align-items-center">
              <div className="col-md-5">
                <h5 className="fw-semibold text-dark">We Care For You</h5>
                <p className="text-muted small">Our purpose is to make this society a better place to live in.</p>
              </div>
              <div className="col-md-7">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex align-items-center"><span className="material-icons text-danger me-2">support</span><strong>Helpline No. 14416</strong></li>
                  <li className="list-group-item d-flex align-items-center">
                    <span className="material-icons text-primary me-2">public</span>
                    <a href="https://telemanas.mohfw.gov.in/home" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark fw-medium">telemanas.mohfw.gov.in</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 rounded shadow-sm p-4" style={{ backgroundColor: subtleYellow }}>
            <h5 className="fw-bold text-dark mb-4">FOR YOU</h5>
            <div className="d-flex flex-column gap-3">
              {[
                { title: "WELLNESS QUIZ", author: "Check in on yourself", img: "quiz.jpg", route: "/quiz" },
                { title: "STUDY METHODS", author: "Learn smarter", img: "stmth.jpg", route: "/study-methods" },
                { title: "STUDY RESOURCES", author: "Curated videos & links", img: "resources.png", route: "/study-resources" },
              ].map((lesson) => (
                <div key={lesson.title} className="card border-0 shadow-sm lesson-card" style={{ cursor: "pointer" }} onClick={() => navigate(lesson.route)}>
                  <div className="row g-0 align-items-center">
                    <div className="col-4"><img src={lesson.img} className="img-fluid rounded-start h-100" alt={lesson.title} style={{ objectFit: 'cover' }} /></div>
                    <div className="col-8"><div className="card-body"><h6 className="fw-bold mb-1">{lesson.title}</h6><p className="small text-muted mb-1">{lesson.author}</p></div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <style>{`.lesson-card{transition:transform .2s ease-in-out,box-shadow .2s ease-in-out}.lesson-card:hover{transform:translateY(-5px);box-shadow:0 8px 15px rgba(0,0,0,.1) !important}.nav-item:hover .hover-box{opacity:1 !important;transform:translateX(-50%) translateY(2px) !important}`}</style>
        <footer className="mt-5 text-center text-muted small"><p>© 2025 WellEd. All rights reserved.</p></footer>
      </div>
     
        <Chatbot />
    </div>
  );
}
