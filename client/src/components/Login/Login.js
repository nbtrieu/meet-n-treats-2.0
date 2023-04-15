import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Link } from 'react-router-dom';

import {
  Grid,
  Paper,
  Typography,
  Box
} from '@mui/material';

import Auth from "../../utils/auth.js";
import image from '../../assets/background.png';


function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [Login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await Login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };
  return (     
    <div className="flex-row align-center">
      <div className="flex-column align-center" style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        opacity: "0.8",
        boxSizing: "border-box"
      }}>
        <div className="flex-column align-center justify-center login">
          <div className="">
            <h2 className="app-title">Meet & Treats</h2>
          </div> 
          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="********"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
            />
            <button className="btn btn-block btn-primary text-dark login" type="submit">Login</button>
          </form>
          <div className="mt-3">
            <h5>
              Don't have an account? 
              <Link className="text-link no-underline" to="/register"> Sign up</Link>
            </h5>
          </div>
          
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div> 
      </div>

      {/* <div className="flex-column align-center justify-center login">
        <div className="">
          <h2 className="app-title">Meet & Treats</h2>
        </div> 
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="********"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <button className="btn btn-block btn-primary text-dark login" type="submit">Login</button>
        </form>
        <div className="mt-3">
          <h5>
            Don't have an account? 
            <Link className="text-link no-underline" to="/register"> Sign up</Link>
          </h5>
        </div>
        
        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div> */}
    </div>
    // <Grid container component="main" wrap='nowrap' sx={{
    //   height: '100vh',
    //   backgroundImage: `url(${image})`,
    //   backgroundSize: 'cover',
    // }}>
    // </Grid>
  );
}

export default Login;
