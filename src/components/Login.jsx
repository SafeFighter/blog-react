import Button from "@mui/material/Button";
import { useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage("❌ Invalid login credentials");
        return;
      }

      navigate("/blog/dashboard");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="emailLogin">Email:</label>
          <input
            type="email"
            id="emailLogin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="passwordLogin">Password</label>
          <input
            type="password"
            id="passwordLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="success" type="submit">
            Login
          </Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Login;
