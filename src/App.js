// // src/App.js
// import { useEffect, useState } from "react";
// import { auth } from "./components/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import Dashboard from "./components/dashboard";
// import AuthForm from "./components/AuthForm";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return user ? <Dashboard user={user} /> : <AuthForm />;
// }

// export default App;


// src/App.js
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./components/dashboard";
import AuthForm from "./components/AuthForm";
import Quiz from "./components/quiz"; 
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

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      ) : (
        <AuthForm />
      )}
    </Router>
  );
}

export default App;
