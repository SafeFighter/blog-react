import { useState } from "react";
import Button from "@mui/material/Button";
import { supabase } from "../supabase";

function Register() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Kreiraj korisnika u Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: fname,
            last_name: lname,
          },
        },
      });

      if (error) throw error;

      setMessage(
        "✅ Registration successful! Check your email to confirm your account."
      );
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="emailRegister">Email:</label>
        <input
          type="email"
          id="emailRegister"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />

        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />

        <label htmlFor="passwordLogin">Password:</label>
        <input
          type="password"
          id="passwordLogin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Register;
