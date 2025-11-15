import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog/edit/${post.id}`);
  };

  return (
    <>
      <div className="border">
        <button onClick={handleEdit}>Edit</button>
        <div className="header">
          <h1>{post.title}</h1>
        </div>
        <div className="postText">{post.content}</div>

        <div className="interactions">Comment</div>
      </div>
    </>
  );
}

export default PostCard;
