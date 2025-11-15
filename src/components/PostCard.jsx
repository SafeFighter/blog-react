import { useState } from "react";

function PostCard({ post }) {
  return (
    <>
      <div className="border">
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
