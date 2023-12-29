import './Navbar.css'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios, { Axios } from 'axios';


const Navbar = (props) => {

    const handleLogout = (e) => {
        e.preventDefault();

        axios
        .post('https://akademia108.pl/api/social-app/user/logout')
        .then((res) => {
            if(res.data.message) {
                props.setUser(null);
                localStorage.setItem('user', null);
            }
        })
        .catch((error) => {
            console.error(error);
            props.setUser(null);
            localStorage.setItem('user', null);
        });
    }

    return (
        <nav className="mainNav">
            <ul>
                <li className='navLink'>
                    <Link to='/Home' >
                        <FontAwesomeIcon icon={faHouse} className='navIcon' /> Home
                    </Link>
                </li>
                {!props.user && <li className='navLink'>
                    <Link to='/Login'>
                        <FontAwesomeIcon icon={faRightToBracket} className='navIcon'/> Login
                    </Link>
                </li>}
                {!props.user && <li className='navLink'>
                    <Link to='/SignUp'>
                        <FontAwesomeIcon icon={faUserPlus} className='navIcon'/> Sign up
                    </Link>
                </li>}
                {props.user && <li className='navLink'>
                    <Link to='/' onClick={handleLogout} >
                        <FontAwesomeIcon icon={faRightFromBracket} className='navIcon'/> Logout
                    </Link>
                </li>}
            </ul>
        </nav>
    );
};

export default Navbar;