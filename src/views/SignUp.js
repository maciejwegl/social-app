import { useState } from 'react';
import './SignUp.css';
import { Navigate, Link } from 'react-router-dom';
import axios from "axios";


const SignUp = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [signUpMessage, setSignUpMessage] = useState('');

    const [signedUp, setSignedUp] = useState(false);

    const validate = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        };

        // Username validation

        if (formData.username.trim().length < 4) {
            validationErrors.username = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: 'Username must be at least 4 characters'
                };
            });
        } else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: 'Username cannot contain whitespace'
                };
            });
        } else {
            validationErrors.username = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: ''
                };
            });
        }

        // Email validation

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: 'Use correct email address'
                }
            });
        } else {
            validationErrors.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: ''
                }
            });
        }

        // Password validation

        if (formData.password.trim().length < 6) {
            validationErrors.password  = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'Your password must be at least 6 characters'
                }
            });
        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'Password cannot contain whitespace'
                }
            });
        }  else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'Password must contain one of the special characters: @ # $ %'
                }
            });
        } else if (!/(?=.*\d)/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'Password must contain at least one digit'
                }
            });
        }
        
        else {
            validationErrors.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: ''
                }
            });
        }


        // Confirm password validation

        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: 'Passwords do not match'
                };
            });
        } else {
            validationErrors.confirmPassword = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: ''
                };
            });
        }

        return (
            !validationErrors.username &&
            !validationErrors.email &&
            !validationErrors.password &&
            !validationErrors.confirmPassword
        );


    };

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name

        setFormData({
            ...formData,
            [name]: target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return
        }

        axios
        .post('https://akademia108.pl/api/social-app/user/signup', {
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
        .then((res) => {
            
            console.log(res.data);

            let resData = res.data;

            if(resData.signedup) {
                setSignUpMessage('Account succesfully created')
                setSignedUp(true);
            }
            else {
                if(resData.message.username) {
                    setSignUpMessage(resData.message.username[0])
                } else if (resData.message.email) {
                    setSignUpMessage(resData.message.email[0])
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });


        console.log('wysyłanie');
    }

    


    return (
        <div className="signup">
            <div hidden={signedUp} className='beforeSignedUp'>
                {props.user && <Navigate to='/' />}
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    {signUpMessage && <h3>{signUpMessage}</h3>}
                    <div className='signupErrors'>
                        {errors.username && <p>{errors.username}</p>}
                        {errors.email && <p>{errors.email}</p>}
                        {errors.password && <p>{errors.password}</p>}
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                
                    </div>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="User name" 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="email"
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm password"
                        onChange={handleInputChange}
                    />
                    <button className="btn signupBtn">Sign up</button>
                </form>

                <div className='linkToLogin'>
                    <h4>Already have an account?</h4>
                    <Link to='/Login'>
                        <button className="btn signupBtn">Login</button>
                    </Link>
                </div>

            </div>
                    
            {signedUp && 
            <div className='signedUpWindow'>
                <h2>Account has been created</h2>
                <h3>Click below to login:</h3>
                <Link to='/Login'>
                    <button className="btn signupBtn">Login</button>
                </Link>
            </div>}

        </div>
    )
};

export default SignUp;