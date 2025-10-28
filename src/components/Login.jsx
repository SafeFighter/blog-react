import Button from "@mui/material/Button";

function Login() {
  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <form action="">
          <label htmlFor="emailLogin">Email:</label>
          <input type="email" id="emailLogin" required />
          <label htmlFor="passwordLogin">Password</label>
          <input type="password" id="passwordLogin" required />
          <Button variant="contained" color="success">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
export default Login;
