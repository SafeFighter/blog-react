import { useState } from "react";
import { supabase } from "../supabase";

function AddNewComment({ postId }) {
  const [commentContent, setCommentContent] = useState("");
  const [message, setMessage] = useState("");

  const handleNewComment = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("comments").insert([
        {
          content: commentContent,
          author_id: user.id,
          created_at: new Date(),
          post_id: postId,
        },
      ]);
      if (error) throw error;
      setMessage("✅ Comment added successfully!");
      setCommentContent("");
    } catch (error) {
      setMessage("Error adding comment: " + error.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleNewComment}>
          <input
            type="text"
            name="commentContent"
            id="commentContent"
            placeholder="Write You're Comment"
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
          />
          <button type="submit">Send</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default AddNewComment;
