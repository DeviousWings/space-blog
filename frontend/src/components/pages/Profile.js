import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/user/${id}`).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [id]);

  return (
    <div className="profile">
      <h1>This is the profile</h1>
      <h2>{userInfo.username}'s Profile</h2>
      {/* <p>Email: {userInfo.email}</p> */}
      {/* Render other user information here */}
    </div>
  );
}
