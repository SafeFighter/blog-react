import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Dashboard menu! Welcome!</h1>
      <Link to="/blog/create">
        <button>Create new post</button>
      </Link>
    </>
  );
}
export default Dashboard;
