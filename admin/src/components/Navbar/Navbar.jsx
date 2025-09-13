import React, {useContext} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const {setToken, setAdmin} = useContext(StoreContext);
  const navigate = useNavigate(); 

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    setAdmin(false);
    toast.success("Logout successfully.");
    navigate("/");
}

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
           <div className="profile-container">
        <img className="profile" src={assets.profile_image} alt="profile" />
        <ul className="profile-dropdown">
          <li onClick={logout}>
            <img src={assets.logout_icon} alt="" />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
