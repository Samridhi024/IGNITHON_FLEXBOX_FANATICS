import { useEffect, useState } from "react";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./components/dashboard";
import AuthForm from "./components/AuthForm";
import Quiz from "./components/quiz";
import StudyMeth from "./components/studyMeth";
import QuizResult from "./components/QuizResult";
import StudyResources from "./components/StudyResources";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><h2>Loading...</h2></div>;

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/study-methods" element={<StudyMeth />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/study-resources" element={<StudyResources />} />
        </Routes>
      ) : (
        <AuthForm />
      )}
    </Router>
  );
}

export default App;
