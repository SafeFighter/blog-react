import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Comment({ postId }) {
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId);

      if (error) {
        console.log("Error while fetching: " + error.message);
      } else {
        setComments(data);
      }
      setLoading(false);
    }
    fetchComments();
  }, [postId]);
  if (loading) return <p>⏳ Loading comments</p>;

  return (
    <>
      {comments.map((c) => (
        <div key={c.id} className="comment">
          <p className="author">User: {c.author_id}</p>
          <p className="comment-content">{c.content}</p>
          <p className="date">Date: {c.created_at}</p>
        </div>
      ))}
    </>
  );
}
export default Comment;
