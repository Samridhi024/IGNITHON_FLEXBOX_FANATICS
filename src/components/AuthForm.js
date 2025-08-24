import { useState } from "react";
import { registerWithEmail, loginWithEmail, signInWithGoogle } from "./firebase";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (isRegister) {
      await registerWithEmail(email, password);
    } else {
      await loginWithEmail(email, password);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="mb-3 text-center">{isRegister ? "Register" : "Login"}</h2>
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
        <button className="btn btn-warning w-100 mb-2" onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>
        <button className="btn btn-outline-dark w-100 mb-2" onClick={signInWithGoogle}>
          Continue with Google
        </button>
        <p
          className="text-center mt-2"
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "Don’t have an account? Register"}
        </p>
      </div>
    </div>
  );
}
