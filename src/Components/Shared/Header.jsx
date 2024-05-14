
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "../../Utility/Container";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";


const Header = () => {
  const location = useLocation()
  const {user, logoutUser} = useAuth()
  // console.log(location.pathname);

  // const handleLogout = () =>{
  //   logoutUser()
      
  // }
 

 

  const nav = <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/allFoods'>All Foods</NavLink></li>
            <li><NavLink to='/blogs'>Blogs</NavLink></li>
           
        </>
    return (
      <Container>
      <div className={`navbar `}>
    <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
             {nav}
            </ul>
    </div>

      
       <div className="navbar-start ">
          <a className="btn btn-ghost text-2xl text-white">Foodie</a>
        </div>

        <div className="navbar-center">
  
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {nav}
          </ul>
        </div>
        </div>
  
     <div className="navbar-end">
      
     
     {
      user ? <div className="dropdown dropdown-end flex items-center">
        <div className="text-white"> {user.displayName} </div>
      <div>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
        <li>
          <Link to='user' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li> <NavLink to='/user/settings'>Settings</NavLink> </li>
        <li><NavLink to='/addfood'>Add Food</NavLink></li>
        <li> <NavLink to='/user/orders'>Orders</NavLink> </li>
        <li><button onClick={logoutUser}>Logout</button></li>
      </ul>
      </div>
    </div> :  <Link className="text-white" to='/login'>Login</Link>
     }
     
    
     </div>
      
  
  </div>
      </Container>
    );
};

export default Header;