import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logOut, loginWithEmail, registerWithEmail } from "./firebase";
// import Chatbot from "./welly";

const Dashboard = () => {
  const texts = [
    "Tomorrow is for the Taking",
    "Learn with WellEd",
    "Grow Your Future"
  ];

  const navigate = useNavigate();

  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Firebase user state
  const [user, setUser] = useState(null);

  // Track login state
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

  const WellEd = () => {
    return (
      <div className="bg-light" style={{ backgroundColor: "#FFFBF2", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
        <div className="container py-4">
          {/* Header */}
          <header className="bg-white rounded shadow-sm p-3 sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <a href="/" className="d-flex align-items-center text-decoration-none">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px" }}>
                    <span className="material-icons text-white">school</span>
                  </div>
                  <span className="ms-2 h5 mb-0 fw-bold text-dark">WellEd</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {["Features", "About Us", "Contact Us"].map((item, idx) => (
                      <li key={idx} className="nav-item">
                        <a className="nav-link text-secondary" href="#">{item}</a>
                      </li>
                    ))}
                  </ul>

                  {/* ✅ Auth Buttons */}
                  <div className="d-flex ms-3">
                    {user ? (
                      <>
                        <span className="me-2 fw-bold text-dark">{user.email}</span>
                        <button className="btn btn-danger" onClick={logOut}>Logout</button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-dark me-2"
                          onClick={() => loginWithEmail("test@test.com", "password123")}
                        >
                          Login
                        </button>
                        <button
                          className="btn btn-outline-dark me-2"
                          onClick={() => registerWithEmail("test@test.com", "password123")}
                        >
                          Register
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Section */}
          <main className="mt-5 row g-4">
            {/* Left Section */}
            <div className="col-lg-8 bg-white rounded shadow-sm p-5">
              <div className="row align-items-center">
                <div className="col-md-6">
                  {/* ✅ Typing Effect */}
                    <div className="typing-wrap">
                    <h1 id="typing-text">
                        {displayedText}
                        <span className="cursor">|</span>
                    </h1>
                    </div>
                  <p className="mt-3 text-secondary">
                    Learn smarter, live healthier. With WellEd, education and well-being go hand in hand to help you grow personally and professionally.
                  </p>
                  <button className="btn btn-warning mt-4 fw-semibold d-flex align-items-center">
                    Get Started
                  </button>
                </div>
                <div className="col-md-6 position-relative">
                  <img
                    src="wellbeing.png"
                    alt="Illustration"
                    className="img-fluid rounded"
                  />
                  <p className="position-absolute bottom-0 end-0 text-danger fw-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
                    WellEd
                  </p>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-5 border-top pt-4 row g-4">
                <div className="col-md-4">
                  <h5 className="fw-semibold text-dark">We Care For You</h5>
                  <p className="text-muted small">Our purpose is to make this society a better place to live in.</p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="d-flex">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYoXlQ-_Zg1JoNH2Sc2PBcW8CV-rYMK_Z-zXBGpxreRHiXBCCk0x3oxT379__q1iKMgQPLGdtyaTemQZgXuxtSuzZWyYAy8_ons-8E9Fy37uxr0OjroolGlLQuKrNo4zrcZeUXNEBYbi0Amr_6fwXcxPHuvqWR2k7YzorO4-MgevklTnBZOKCxvUUwlapJpCrFD5hYZzLxTLzxyv0NGaRmTwI4YK8mQ1k83yvZ1iMW25qM-DLgbpW8QS2abMwrBXFsXo_udNhYKr4" alt="Reviewer 1" className="rounded-circle border border-white me-1" width="32" height="32"/>
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAWpJglhP5pHhDKWIxZyUUE65jm-SxlmgHMqquioXwcfGgDgXqbrPlFCGF-I56cEF1whSS7gDDPwO7b7lwkoNvIxkLI61NBLSeHUTTGOmQfMP9bw7VUsBDZ-Ch9bO88142Tb4-dzXrlJ9tUws7VerhzGMF_mydDqTb7rCFT87zBhz18HuVmpBw9URUvotXNc1nhHtQ1OnB0vdr3soSfVxnKWqgil9j6KyuKskDmBhP4xQrBlg9Qc_InG5B-52OQtwc4hMDrIEX3Tk" alt="Reviewer 2" className="rounded-circle border border-white me-1" width="32" height="32"/>
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkwmhb2dTXkgR2bRWT3k-i01ayPr242iix1gJiTMGR12asFlOiYm9HpKJpPN7vAJxGytM_aUZVQbzra2NfbD5vRhHE9EXTTBeGtmBDvzwvCwdkdGhUKEUb8bR3arnzImTcvMuNqHAKPQ8KkVpirnA7spPipSIJ4OtYV33BcqD8IiR6tGCRAUV_gHW5q__vqK-s4gS-5A3wDw21vsFfrqnitZKsSQOxbNSp2l1ea5QUwNosdL5Sw-nOonFdNt5U0McerOw754YeTww" alt="Reviewer 3" className="rounded-circle border border-white" width="32" height="32"/>
                    </div>
                  </div>
                </div>

                <div className="col-md-8 row text-muted fw-medium">
                  <div className="col-6 d-flex align-items-center mb-2">
                    <span className="material-icons text-primary me-2"></span>
                    Instagram
                  </div>
                  <div className="col-6 d-flex align-items-center mb-2 fw-bold">WELLED</div>
                  <div className="col-6 d-flex align-items-center mb-2">
                    <span className="material-icons text-danger me-2"></span>
                    Whatsapp
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-lg-4 bg-warning bg-opacity-25 rounded shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold text-dark">FOR YOU</h5>
              </div>

              <div className="mt-4">
                {[
                  {
                    title: "QUIZ",
                    author: "By WellEd",
                    img: "quiz.png",
                  },
                ].map((lesson, idx) => (
                  <div
                    key={idx}
                    className="card mb-3 border-0 shadow-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/quiz")} // ✅ go to Quiz
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-4">
                        <img
                          src={lesson.img}
                          className="img-fluid rounded-start"
                          alt={lesson.title}
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body p-2">
                          <h6 className="fw-semibold mb-1">{lesson.title}</h6>
                          <p className="small text-muted mb-1">{lesson.author}</p>
                          <div className="d-flex justify-content-between align-items-center small text-muted">
                            <span className="material-icons">favorite_border</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-5 text-center text-muted small">
            <p>© 2025 WellEd. All rights reserved.</p>
          </footer>
        </div>
          {/* <Chatbot /> */}
      </div>
    );
  };

  return <WellEd />;
};

export default Dashboard;


