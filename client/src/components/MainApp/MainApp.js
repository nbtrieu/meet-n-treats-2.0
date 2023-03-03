import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

import Home from "../../pages/Home";
import AddPetForm from "../../pages/AddPetForm/AddPetForm";
import Create from "../../pages/Create";
import PlayDate from "../../pages/PlayDate";
import Profile from "../../pages/Profile";
import Search from "../../pages/Search";
import Explore from "../../pages/Explore";
import SinglePost from "../../pages/SinglePost/SinglePost";
import Market from "../../pages/Market";
import MarketSell from "../../pages/MarketSell";
import MarketBuy from "../../pages/MarketBuy";
import EditUser from "../../pages/EditUser/EditUser";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Login from "../Login";
import Register from "../Register";
import Sidebar from "../Sidebar";
import Nav from "../Nav";
import { useState, useEffect } from "react";

export default function MainApp() {
  // const { loadingPosts, data: postsData } = useQuery(QUERY_POSTS);
  // const postsData = useState();
  // const { state } = props;

  // const [state, setState] = useState([]);
  const { loadingPosts, data: postsData } = useQuery(QUERY_POSTS);
  // const [loadPosts, { called, loading, data: postsData }] = useLazyQuery(QUERY_POSTS);
  // if (called && loading) return <p>Loading posts...</p>;
  // if (!called) {
  //   return;
  // };

  // useEffect(() => {
  //   console.log('huh?');
  //   setState(postsData) // postsData is stored inside state
  // }, []);
  // console.log('what da heo');
  // console.log('>>> logging state: ', state);
  // console.log('>>> logging postsData: ', postsData);

  // Get posts from query:
  if (loadingPosts) {
    <p>Loading...</p>
  } else {

  }
  var posts = postsData ? postsData.posts : [];
  console.log('posts: ', posts);
  
  return (
    <Router>
      <div className="main">
        <nav>
          <Sidebar>
            <Nav></Nav>
          </Sidebar>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/profiles" element={<Profile posts={posts} />} />
            <Route path="/add-pet" element={<AddPetForm />} />
            <Route path="/create" element={<Create />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/playdates" element={<PlayDate />} />
            <Route path="/search" element={<Search />} />
            <Route path="/marketplace" element={<Market />} />
            <Route path="/marketplace/buy" element={<MarketBuy />} />
            <Route path="/marketplace/sell" element={<MarketSell />} />
            <Route path="/posts/:postId" element={<SinglePost posts={posts} />} />
            <Route path="/profiles/user/edit" element={<EditUser />}/> 
          </Route>
        </Routes>
      </div>
    </Router>
  )
}
