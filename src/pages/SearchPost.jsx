import { useState } from "react";
import { supabase } from "../supabase";
import PostCard from "../components/PostCard";

function SearchPost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResults] = useState([]);

  const handleNewSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery) return;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .ilike("title", `%${searchQuery}%`);

    if (error) {
      console.error(error);
      return;
    }

    setResults(data);
  };

  return (
    <>
      <div className="container">
        <div>
          <h3>Search Posts</h3>
        </div>
        <div>
          <form onSubmit={handleNewSearch}>
            <input
              size="35"
              type="text"
              placeholder="Input your search words here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍 Search</button>
          </form>
        </div>
      </div>

      <div className="result">
        {result.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default SearchPost;
