function SearchPost() {
  return (
    <>
      <div className="container">
        <div>
          <h3>Search Posts</h3>
        </div>
        <div>
          <form>
            <input type="text" placeholder="Input your search words here" />
            <button type="submit">🔍 Search</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchPost;
