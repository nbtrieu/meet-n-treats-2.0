import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { EDIT_USER } from "../../utils/mutations";
import CloudinaryUploadWidget from "../../components/Cloudinary/UploadWidget"; 

import Auth from '../../utils/auth';

export default function EditUser() {
  const [formState, setFormState] = useState({
    userId: Auth.getUser().data._id,
    newName: "",
    bio: "",
  });

  // console.log("logging Auth.getUser.data: ", Auth.getUser.data)

  const [avatarURL, setAvatarURL] = useState("");

  const [editUser, { error }] = useMutation(EDIT_USER);

  // Get logged in user data:
  const { loading, data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || []; 
  console.log('me: ', me);

  const handleInputChange = ({ target: { name, value } }) => {
    console.log(name, value);
    setFormState({ ...formState, [name]: value });
    if (name === 'avatarURL') {
      setAvatarURL(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log('postImageURL: ', postImageURL);
      const { data } = await editUser({
        variables: {
          ...formState,
          avatarURL,
        },
      });

      setFormState("");
      window.location.replace('/profiles');

    } catch (error) {
      console.error('>>> handleSubmit error: ', error);
    }
  }
  
  return (
    <div className="app-postcard_page page create-form-card flex-column align-start">
      <div className="mb-5">
        <h2 className="text-center">⚙️ Edit User Profile</h2>
      </div>
      <form onSubmit={handleFormSubmit} className="row">
        <label className="col-1">
          <h4>Name: </h4>
        </label>
        <input
          type="text"
          className="col-1 edit-form"
          name="newName"
          defaultValue={me.name}
          onChange={handleInputChange}
        />
        <label className="col-1">
          <h4>Bio: </h4>
        </label>
        <textarea
          className="col-1 edit-form"
          placeholder="One thing about me..."
          name="bio"
          defaultValue={me.bio}
          onChange={handleInputChange}
        />
        <label className="col-1">
          <h4>Avatar: </h4>
        </label>
        {/* <CloudinaryUploadWidget setPostImageURL={setPostImageURL} className="col-1" /> */}
        <input
          type="text"
          className="col-1 edit-form"
          name="avatarURL"
          value={avatarURL}
          onChange={handleInputChange}
        />
        <div className="flex-row justify-center">
          <button type="submit" className="btn btn-sm btn-submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
