import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { EDIT_PET } from "../../utils/mutations";
import CloudinaryUploadWidget from "../../components/Cloudinary/UploadWidget"; 

import Auth from '../../utils/auth';

export default function EditPet() {
  let isSubmitted = false;

  // Get logged in user data:
  const { loading, data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || []; 
  console.log('me: ', me);

  const [formState, setFormState] = useState({
    // petId: me.data.pet[0],
    petOwner: Auth.getUser().data._id,
    newName: "",
    newAge: "",
    newType: "",
    newBreed: "",
    newFavFood: "",
    newFavActivities: "",
    newBio: "",
  });

  const [editPet, { error }] = useMutation(EDIT_PET);

  const handleInputChange = ({ target: { name, value } }) => {
    // console.log(name, value);
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await editPet({
        variables: {
          ...formState,
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
        <h2 className="text-center">⚙️ Edit Pet Info</h2>
      </div>
      <form onSubmit={handleFormSubmit} className="row">
        <label className="col-1">
          <h4>Pet Name: </h4>
        </label>
        <input
          type="text"
          className="col-1 edit-form"
          name="newName"
          defaultValue={me.pet.petName}
          onChange={handleInputChange}
        />
        <label>
          <h6>Select type of animal for your pet*:</h6>
          <select name="newType" defaultValue={me.pet.petType} onChange={handleInputChange}>
            <option value="default">Select</option>
            <option value="🐶 Doggo">🐶 Doggo</option>
            <option value="🐱 Catto">🐱 Catto</option>
            <option value="🐰 Bunny">🐰 Bunny</option>
            <option value="🐹 Hamster/Guinea Pig/Mouse/Chinchilla">🐹 Hamster/Guinea Pig/Mouse/Chinchilla</option>
            <option value="🐦 Birdy">🐦 Birdy</option>
            <option value="🐢 Reptile Fam">🐢 Reptile Fam</option>
            <option value="🐠 Aquatics">🐠 Aquatics</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="col-1">
          <h4>Pet Age: </h4>
        </label>
        <input
          type="text"
          className="col-1 edit-form"
          name="newAge"
          defaultValue={me.pet.petAge}
          onChange={handleInputChange}
        />
        <label className="col-1">
          <h4>Pet Breed: </h4>
        </label>
        <input
          type="text"
          className="col-1 edit-form"
          name="newBreed"
          defaultValue={me.pet.petBreed}
          onChange={handleInputChange}
        />
        <label className="col-1">
          <h4>Favorite Food: </h4>
        </label>
        <input
          type="text"
          className="col-1 edit-form"
          name="newFavFood"
          defaultValue={me.pet.petFavFood}
          onChange={handleInputChange}
        />
        <label className="col-1">
          <h4>Favorite Activities: </h4>
        </label>
        <input
          type="text"
          className="col-1 edit-form"
          name="newFavActivities"
          defaultValue={me.pet.petFavActivities}
          onChange={handleInputChange}
        />
        <label className="col-1">
          <h4>Pet Bio: </h4>
        </label>
        <textarea
          className="col-1 edit-form"
          placeholder="One thing about me..."
          name="newBio"
          defaultValue={me.pet.petBio}
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
