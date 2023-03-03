import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { EDIT_USER } from "../../utils/mutations";
import CloudinaryUploadWidget from "../../components/Cloudinary/UploadWidget"; 

import Auth from '../../utils/auth';

export default function EditUser() {  
  let isSubmitted = false;
  
  const [formState, setFormState] = useState({
    userId: Auth.getUser().data._id,
    newName: "",
    bio: "",
  });

  const [avatarURL, setAvatarURL] = useState("");

  const [editUser, { error }] = useMutation(EDIT_USER);

  // Get logged in user data:
  const { loading, data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || []; 
  // console.log('me: ', me);

  const handleInputChange = ({ target: { name, value } }) => {
    // console.log(name, value);
    setFormState({ ...formState, [name]: value });
    if (name === 'avatarURL') {
      setAvatarURL(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await editUser({
        variables: {
          ...formState,
          avatarURL,
        },
      });

      setFormState("");
      // isSubmitted = true;
      // if (isSubmitted) {
      //   setTimeout(() => {
      //     document.getElementById('submitted-message').innerHTML = 'Your changes have been saved.'
      //   }, 5000);
      // }

    } catch (error) {
      console.error('>>> handleSubmit error: ', error);
    }
  }
  
  return (
    <div className="app-postcard_page page create-form-card flex-column align-start">
      <div className="mb-5">
        <h2 className="text-center">⚙️ Edit User Profile</h2>
      </div>
      <div className="flex-row mb-3 ml-3">
        <h4>Avatar: </h4>
        <div className="ml-1">
          <CloudinaryUploadWidget className="col-1" setPostImageURL={setAvatarURL} />
        </div>
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
        <div className="mx-auto">
          <button type="submit" className="btn btn-sm btn-submit">Submit</button>
        </div>
      </form>
      <div>
        {isSubmitted ? (
          <p id="submitted-message"></p>
        ) : (
          <div>{null}</div>
        )}
      </div>
    </div>
  )
}
