import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { QUERY_PET } from "../../utils/queries";
import { QUERY_USER } from "../../utils/queries";
// import mongoose from 'mongoose';

import Login from "../../components/Login";
// import EditPet
import PostCard from "../../components/PostCard/PostCard";

import Auth from '../../utils/auth';
import { Link } from "react-router-dom";

function ProfilePage(props) {
  const { posts } = props;
  console.log('>>> logging posts: ', posts);

  const userPosts = posts.filter(
    post => post.postAuthor._id === Auth.getUser().data._id
  );
  console.log('>>> logging userPosts: ', userPosts);

  const post = userPosts[0];
  // console.log(post);
  // console.log(post.postAuthor.pet._id);

  // console.log('beginning pet');

  // Get pet info:
  const { loadingPet, data } = useQuery(QUERY_PET, {
    // pass petId from userPosts[0].postAuthor.pet._id
    variables: { petId: post.postAuthor.pet._id },
  });

  // console.log('pet data: ', data);

  const pet = data ? data.pet : [];
  // console.log('pet: ', pet);

  // Get logged in user data:
  const { loading, data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || []; 
  // console.log('me: ', me);

  const handleClickUser = async (event) => {
    event.preventDefault();
    window.location.replace('/profiles/user/edit');
    // *BUG: why is it going back to home instead of profiles when click back???
  }

  const handleClickPet = async (event) => {
    event.preventDefault();
    window.location.replace('/profiles/pet/edit');
    // *BUG: why is it going back to home instead of profiles when click back???
  }

  return (
    <div className="flex-column page negative-top-margin ml-7">
      <div className="text-primary border-bottom text-center">
        <h1>Welcome, <span className="text-pink">{me.name}</span></h1>
      </div>
      
      <div className="row">
        <div className="col text-left mt-5">
          <h3 className="text-bold">🪪 Your Profile</h3>
        </div>
        <div className="col">
          <button className="btn btn-info mt-4" type="submit" onClick={handleClickUser}>Edit</button>
        </div>
      </div>
      
      <div className="user-info-card my-5 flex-row">
        <div className="col-2 mt-3">
          <img src={me.avatarURL} className="avatar" />
        </div>
        <div className="col-8">
          <div className="flex-row mb-2">
            <h4 className="text-info-field text-info">Name: </h4>
            <span className="ml-5">
              <h4>{me.name}</h4>
            </span>
          </div>
          <div className="flex-row mb-2">
            <h4 className="text-info-field text-info">Email: </h4>
            <span className="ml-5">
              <h4>{me.email}</h4>
            </span>
          </div>
          <div className="flex-row mb-2">
            <h4 className="text-info-field text-info">Bio: </h4>
            <span className="ml-5">
              <h4>{me.bio}</h4>
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col text-left mt-5">
          <h3 className="text-bold">🐾 Your Pet Profile</h3>
        </div>
        <div className="col">
          <button className="btn btn-info mt-4" type="submit" onClick={handleClickPet}>Edit</button>
        </div>
      </div>

      <div className="pet-info-card mt-5 flex-row">
        <div className="row">
          <div className="col-5">
            {pet.petName ? (
              <div className="flex-row mb-2">
                <h4 className="text-info-field text-info">Name: </h4>
                <span className="ml-5">
                  <h4>{pet.petName}</h4>
                </span>
              </div>
            ) : (
              <div className="display-none"></div>
            )}
            {pet.petAge ? (
              <div className="flex-row mb-2">
                <h4 className="text-info-field text-info">Age: </h4>
                <span className="ml-5">
                  <h4>{pet.petAge}</h4>
                </span>
              </div>
            ) : (
              <div className="display-none"></div>
            )}
            {pet.petType ? (
              <div className="flex-row mb-2">
                <h4 className="text-info-field text-info">Type: </h4>
                <span className="ml-5">
                  <h4>{pet.petType}</h4>
                </span>
              </div>
            ) : (
              <div className="display-none"></div>
            )}
          </div>
          <div className="col-5">
              {pet.petBreed ? (
                <div className="flex-row mb-2">
                  <h4 className="text-info-field text-info">Breed: </h4>
                  <span className="ml-5">
                    <h4>{pet.petBreed}</h4>
                  </span>
                </div>
              ) : (
                <div className="display-none"></div>
              )}
              {pet.petFavFood ? (
                <div className="flex-row mb-2">
                  <h4 className="text-info-field text-info">FavFood: </h4>
                  <span className="ml-5">
                    <h4>{pet.petFavFood}</h4>
                  </span>
                </div>
              ) : (
                <div className="display-none"></div>
              )}
              {pet.petFavActivities ? (
                <div className="flex-row mb-2">
                  <h4 className="text-info-field text-info">FavActivities: </h4>
                  <span className="ml-5">
                    <h4>{pet.petFavActivities}</h4>
                  </span>
                </div>
              ) : (
                <div className="display-none"></div>
              )}
          </div>
          
          <div className="col-9">
            {pet.petBio ? (
              <div className="flex-row">
                <h4 className="text-info-field text-info">Bio: </h4>
                <span className="ml-5">
                  <h4>{pet.petBio}</h4>
                </span>
              </div>
            ) : (
              <div className="display-none"></div>
            )}
          </div>
          
        </div>
        
      </div>
      <div className="text-left mt-5">
        <h3 className="text-bold">
          <span></span>
          🖼️ Your Posts
        </h3>
      </div>
      <div className="flex-column align-center max-100-vh w-50">
        {userPosts.length > 0 ? userPosts.map((post) => (
        <div className="row">
          <div key={post._id} className='app-postcard_page ml-2 my-5 mt-6 px-6 py-5'>
            <PostCard 
              postsData={post}
            />
            <Link className='' to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
              <p className='light-text'>View post and leave comments</p>
            </Link>
          </div>
        </div>
      )) : (
        <div>
         <p>No post yet. Create your first post <a href="/create" className="no-underline text-link">here</a>!</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default ProfilePage;