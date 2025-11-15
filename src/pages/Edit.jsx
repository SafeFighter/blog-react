import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post: ", error);
      } else {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    }
    fetchPosts();
  }, [id]);
  if (loading) return <p>⏳ Loading...</p>;

  const handleSave = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id);

    if (error) {
      console.error("Error while updating: ", error);
    } else {
      alert("Post updated! Redirecting!");
      setTimeout(() => {
        navigate(`/blog/dashboard`);
      }, 3000);
    }
  };
  const handleCancel = () => {
    navigate(`/blog/dashboard`);
  };
  return (
    <>
      <div>
        <h1>Edit Post</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
}

export default Edit;
