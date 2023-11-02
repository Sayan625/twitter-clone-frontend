import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import TweetDetails from './pages/TweetDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from './components/PageLayout';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice';
import PrivateRoutes from './components/PrivateRoutes';
import UserList from './pages/UserList';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user')))
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<PageLayout element={<Home />} />} />
            <Route path="/profile/:id" element={<PageLayout element={<Profile />} />} />
            <Route path="/profile" element={<PageLayout element={<Profile />} />} />
            <Route path="/tweets/:id" element={<PageLayout element={<TweetDetails />} />} />
            <Route path="/followers" element={<PageLayout element={<UserList type='followers' />} />} />
            <Route path="/following" element={<PageLayout element={<UserList type='following' />} />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<PageLayout element={<UserList />} />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
