import { Link } from "react-router-dom";

import PostCard from "../../components/PostCard/PostCard";

function Home(props) {
  const { posts } = props;

  return (
    <div className="flex-column align-center max-100-vh">
      {posts && 
        posts.map((post) => (
          <div key={post._id} className='app-postcard_page ml-7 my-5 px-6 py-5'>
            <PostCard 
              postsData={post}
            />
            <Link className='' to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
              <p className='light-text'>View post and leave comments</p>
            </Link>
          </div>
      ) || (
        <div>
          <h2>No posts yet. Add your own post with "📝 Create"!</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;
