import { Link, NavLink } from "react-router-dom";
import React from "react";

const NavigationComponent = (props) => {
  return (
    <header>
      <div className='nav-wrapper'>
        <div className='nav-link-wrapper'>
          <Link to='/' className='logo'>
            Space Blog
          </Link>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink exact to='/' activeClassName='nav-link-active'>
            Home
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink to='/about-me' activeClassName='nav-link-active'>
            About
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink to='/contact' activeClassName='nav-link-active'>
            Contact
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink to='/blog' activeClassName='nav-link-active'>
            Blog
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default NavigationComponent;

// <header>
//   {/* <img src={logo} alt=''></img> */}
// <Link to='/' className='logo'>
//   Space Blog
// </Link>
//   <nav>
//     <Link to='/login'>Login</Link>
//     <Link to='/register'>Register</Link>
//   </nav>
// </header>
