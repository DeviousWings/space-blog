import { NavLink } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

const NavigationComponent = (props) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
      <div className="nav-wrapper">
        <div className="web-title">
          <NavLink exact="true" to="/" className="logo">
            Space Blog
          </NavLink>
        </div>
        {username && (
          <>
            <span>Hello, {username}</span>
            <div className="nav-link-wrapper">
              <NavLink to="/create">Create New Post</NavLink>
            </div>
          </>
        )}

        <div className="nav-link-wrapper">
          <NavLink exact="true" to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            exact="true"
            to="/about-me"
            activeClassName="nav-link-active">
            About
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink exact="true" to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>

        {username && (
          <>
            <div className="nav-link-wrapper">
              {/* <NavLink exact="true" to="/profile" activeClassName="nav-link-active">
            Profile
          </NavLink>
          <div>-------</div> */}
              <a onClick={logout}>Logout ({username})</a>
            </div>
          </>
        )}
        {!username && (
          <div className="nav-link-wrapper">
            <>
              <div className="login">
                <NavLink exact="true" to="/login">
                  Login |
                </NavLink>
              </div>

              <div className="reg">
                <NavLink exact="true" to="/register">
                  Register
                </NavLink>
              </div>
            </>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationComponent;
