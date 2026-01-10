// import { useState } from "react";
// import { registerWithEmail, loginWithEmail, signInWithGoogle } from "./firebase";

// export default function AuthForm() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async () => {
//     if (isRegister) {
//       await registerWithEmail(email, password);
//     } else {
//       await loginWithEmail(email, password);
//     }
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
//       <div className="card p-4 shadow" style={{ width: "350px" }}>
//         <h2 className="mb-3 text-center">{isRegister ? "Register" : "Login"}</h2>
//         <input
//           type="email"
//           className="form-control mb-2"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="btn btn-warning w-100 mb-2" onClick={handleSubmit}>
//           {isRegister ? "Register" : "Login"}
//         </button>
//         <button className="btn btn-outline-dark w-100 mb-2" onClick={signInWithGoogle}>
//           Continue with Google
//         </button>
//         <p
//           className="text-center mt-2"
//           style={{ cursor: "pointer", color: "blue" }}
//           onClick={() => setIsRegister(!isRegister)}
//         >
//           {isRegister ? "Already have an account? Login" : "Don’t have an account? Register"}
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { registerWithEmail, loginWithEmail, signInWithGoogle } from "./firebase";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For showing error messages
  const [loading, setLoading] = useState(false); // To disable button while loading

  const handleSubmit = async () => {
    setError(""); // Clear previous errors
    setLoading(true);
    
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      // No need to navigate here, App.js handles the screen switch
    } catch (err) {
      console.error(err);
      // specific error messages
      if (err.code === 'auth/email-already-in-use') setError("Email already exists.");
      else if (err.code === 'auth/wrong-password') setError("Incorrect password.");
      else if (err.code === 'auth/user-not-found') setError("No account found with this email.");
      else if (err.code === 'auth/weak-password') setError("Password must be at least 6 characters.");
      else setError("Failed to authenticate. Check your connection.");
    }
    
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="mb-3 text-center">{isRegister ? "Register" : "Login"}</h2>
        
        {/* Error Message Display */}
        {error && <div className="alert alert-danger p-2 text-center" style={{fontSize: '14px'}}>{error}</div>}

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          className="btn btn-warning w-100 mb-2" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : (isRegister ? "Register" : "Login")}
        </button>
        
        <button 
          className="btn btn-outline-dark w-100 mb-2" 
          onClick={signInWithGoogle}
          disabled={loading}
        >
          Continue with Google
        </button>
        
        <p
          className="text-center mt-2"
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => {
            setIsRegister(!isRegister);
            setError(""); // Clear errors when switching modes
          }}
        >
          {isRegister ? "Already have an account? Login" : "Don’t have an account? Register"}
        </p>
      </div>
    </div>
  );
}
