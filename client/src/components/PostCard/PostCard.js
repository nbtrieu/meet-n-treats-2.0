import { Link } from 'react-router-dom';

export default function PostCard(props) {
  const { postsData } = props;
  return (
    <div className=''>
      <div className='app-postcard_data-author'>
        <div className='app-postcard_data-author-avatar'>
          {postsData.postAuthor.avatarURL ? (
            <img src={postsData.postAuthor.avatarURL} alt='avatar' />
          ) : (
            <img src={"https://res.cloudinary.com/dnwrm14k9/image/upload/v1675571532/avatar_if5map.png"} alt='avatar' />
          )}
        </div>
        <h5 className='text-bold'>{postsData.postAuthor.name}</h5>
      </div>
      <p>{postsData.createdAt}</p>
      {/* Render uploaded image from Cloudinary: */}
      <div className='app-postcard_data-image'>
        <img id="uploadedimage" src={postsData.postImageURL} width={500}></img>
      </div>
      {/* Render author's name: */}
      <p><span className='username'>{postsData.postAuthor.name}</span> {postsData.postText}</p>
    </div>
  )
}
