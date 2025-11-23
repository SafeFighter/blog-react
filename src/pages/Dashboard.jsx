import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import PostCard from "../components/PostCard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const LIMIT = 5;

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

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + LIMIT - 1);

    if (error) {
      console.log("Error: ", error);
      return;
    }

    if (data.length < LIMIT) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...data]);
    setOffset((prev) => prev + LIMIT);
    setLoading(false);
  };
  useEffect(() => {
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

      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} isAdmin={isAdmin} />
        ))}
        {hasMore ? (
          <button onClick={fetchPosts} disabled={loading}>
            Load More Posts
          </button>
        ) : (
          <p>No More Posts</p>
        )}
      </div>
    </>
  );
}
export default Dashboard;
