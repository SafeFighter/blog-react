import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: adminRows } = await supabase
          .from("admins")
          .select("user_id")
          .eq("user_id", user.id);
        setIsAdmin(adminRows.length > 0);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <h1>Dashboard menu! Welcome!</h1>
      {isAdmin ? (
        <Link to="/blog/create">
          <button>Create new post</button>
        </Link>
      ) : (
        "You are not admin"
      )}
    </>
  );
}
export default Dashboard;
