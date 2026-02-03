import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = () => {
    const uid = sessionStorage.getItem("uid");

    if (!uid) {
      navigate("/login");
      return;
    }

    if (!oldPassword || !newPassword) {
      alert("All fields required");
      return;
    }

    axios
      .put(`${API}/users/${uid}/change-password/`, {
        old_password: oldPassword,
        new_password: newPassword,
      })
      .then((res) => {
        alert(res.data.message);
        
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Password change failed");
      });
  };

  return (
    <div>
      <h2>Change Password</h2>

      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <td>Old Password</td>
            <td>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>New Password</td>
            <td>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button onClick={handleChangePassword}>
                Change Password
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChangePassword;
