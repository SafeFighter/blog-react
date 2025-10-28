import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Welcome</h1>
          <p>Please Log in or Register to continue!</p>
        </div>
      </div>
      <Link to="/blog/registration">
        <Button variant="contained" color="success">
          Login/Register
        </Button>
      </Link>
    </>
  );
}
export default Home;
