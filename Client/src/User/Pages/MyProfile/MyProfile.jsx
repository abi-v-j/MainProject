import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = sessionStorage.getItem("uid");

    if (!uid) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API}/users/${uid}/`)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Profile</h2>

      {user.user_photo && (
        <img
          src={`${API}/${user.user_photo}`}
          alt="Profile"
          width="120"
        />
      )}

      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.user_name}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{user.user_email}</td>
          </tr>

          <tr>
            <td>Contact</td>
            <td>{user.user_contact}</td>
          </tr>

          <tr>
            <td>Headline</td>
            <td>{user.user_headline}</td>
          </tr>

          <tr>
            <td>Biography</td>
            <td>{user.user_biography}</td>
          </tr>

          <tr>
            <td>Security Question</td>
            <td>{user.user_securityQuestion}</td>
          </tr>

          <tr>
            <td>Security Answer</td>
            <td>{user.user_securityAnswer}</td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>{user.user_gender}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <button onClick={() => navigate("/user/edit-profile")}>
        Edit Profile
      </button>
      <button
        onClick={() => navigate("/user/change-password")}
        style={{ marginLeft: 10 }}
      >
        Change Password
      </button>
    </div>
  );
};

export default MyProfile;
