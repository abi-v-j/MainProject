import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  const changePassword = () => {
    const iid = sessionStorage.getItem("iid");
    if (!iid) return navigate("/login");

    axios
      .put(`${API}/instructors/${iid}/change-password/`, {
        old_password: oldPass,
        new_password: newPass,
      })
      .then(() => {
        sessionStorage.clear();
        navigate("/login");
      })
      .catch(err =>
        alert(err.response?.data?.message || "Change failed")
      );
  };

  return (
    <div>
      <h2>Change Password</h2>

      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <td>Old Password</td>
            <td>
              <input type="password" onChange={e => setOldPass(e.target.value)} />
            </td>
          </tr>

          <tr>
            <td>New Password</td>
            <td>
              <input type="password" onChange={e => setNewPass(e.target.value)} />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button onClick={changePassword}>Change</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChangePassword;
