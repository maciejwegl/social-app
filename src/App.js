
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { useState } from 'react';
import axios, { Axios } from 'axios';


function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common['Authorization'] = 'Bearer' + (user ? user.jwt_token : '');

  return (
    <div className="App">
      <Header />
      <Navbar user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
