import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import { Route, Routes } from "react-router-dom";


const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Home user={props.user}/>} />
            <Route path='/Home' element={<Home user={props.user}/>} />
            <Route path='/Login' element={<Login user={props.user} setUser={props.setUser} />} />
            <Route path='/SignUp' element={<SignUp user={props.user} />} />
        </Routes>
    );
}

export default AppRoutes;