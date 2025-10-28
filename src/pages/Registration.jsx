import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Registration() {
  const [loginActive, setLoginActive] = useState(true);
  return (
    <>
      <div className="container">
        <Link to="/">
          <Button variant="contained" color="success">
            Home
          </Button>
        </Link>
        <div>
          <h1>Enter you credentials or register!</h1>
          <div>
            {loginActive ? <Login /> : <Register />}
            <button onClick={() => setLoginActive(!loginActive)}>
              {loginActive
                ? "I don't have an account"
                : "I already have an account"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
