import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import AddNewComment from "./AddNewComment";

function PostCard({ post, isAdmin }) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

  const handleEdit = () => {
    navigate(`/blog/edit/${post.id}`);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <>
      <div className="border">
        {isAdmin && <button onClick={handleEdit}>Edit</button>}
        <div className="header">
          <h1>{post.title}</h1>
        </div>
        <div className="postText">{post.content}</div>

        <button onClick={toggleComments}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>

        {showComments && (
          <div className="comment-overlay">
            <Comment postId={post.id} />
            <AddNewComment postId={post.id} />
          </div>
        )}
      </div>
    </>
  );
}

export default PostCard;
