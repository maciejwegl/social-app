import { useState, useSyncExternalStore } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';


const Login = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [loginMessage, setLoginMessage] = useState('');

    const handleInputChange = (e) => {
        console.log(e.target.value);
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value,
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post('https://akademia108.pl/api/social-app/user/login', {
            username: formData.username,
            password: formData.password
        })
        .then((res) => {

            if(Array.isArray(res.data.username)) {
                setLoginMessage(res.data.username[0])
            } else if (Array.isArray(res.data.password)) {
                setLoginMessage(res.data.password[0])
            }
            else if (res.data.error) {
                setLoginMessage('Incorrect username or password');
            } else {
                setLoginMessage('');
                props.setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            }

            props.setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error);
        });

        
    }

    

    return (
        <div className="login">
            {props.user && <Navigate to='/' />}
            <h2>Log in to Social App</h2>
            <form onSubmit={handleSubmit}>
                {loginMessage && <h3>{loginMessage}</h3>}
                <input 
                    type="text" 
                    name="username" 
                    placeholder="User name" 
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={formData.password}
                />
                <button className="btn loginBtn">Login</button>
            </form>
        </div>
    )
};

export default Login;