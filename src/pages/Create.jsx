import Button from "@mui/material/Button";
import { supabase } from "../supabase";
import { useState } from "react";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("posts").insert([
        {
          title: title,
          content: content,
          author_id: user.id,
          created_at: new Date(),
        },
      ]);
      if (error) throw error;
      setMessage("✅ Post added successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Create New Post</h1>
        <form onSubmit={handleNewPost}>
          <input
            type="text"
            id="postTitle"
            required
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            id="postContent"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <Button variant="contained" color="success" type="submit">
            Create
          </Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
export default Create;
