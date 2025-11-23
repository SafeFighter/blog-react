import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import PostCard from "../components/PostCard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error fetching posts:", error);
      } else {
        setPosts(data);
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p>⏳ Loading ...</p>;
  }

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

      <Link to="/blog/search">
        <button>Search Posts</button>
      </Link>

      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} isAdmin={isAdmin} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
