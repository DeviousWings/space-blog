import { Link, NavLink } from "react-router-dom";
import React from "react";

const NavigationComponent = (props) => {
  return (
    <header>
      <div className='nav-wrapper'>
        <div className='nav-link-wrapper'>
          <Link exact='true' to='/' className='logo'>
            Space Blog
          </Link>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink exact='true' to='/' activeClassName='nav-link-active'>
            Home
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink
            exact='true'
            to='/about-me'
            activeClassName='nav-link-active'>
            About
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink exact='true' to='/contact' activeClassName='nav-link-active'>
            Contact
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink exact='true' to='/blog' activeClassName='nav-link-active'>
            Blog
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <div className='login'>
            <NavLink exact='true' to='/login'>
              Login |{" "}
            </NavLink>
          </div>
          <div className='reg'>
            <Link exact='true' to='/register'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationComponent;
