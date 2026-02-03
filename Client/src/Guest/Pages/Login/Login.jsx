import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(`${API}/auth/login/`, { email, password })
      .then((res) => {
        const { role, id, name, message } = res.data;
        alert(message);

        // ---------- ROLE BASED SESSION ----------
        if (role === "admin") {
          sessionStorage.setItem("aid", id);
          navigate("/admin/home");
        }

        if (role === "instructor") {
          sessionStorage.setItem("iid", id);
          navigate("/instructor/home");
        }

        if (role === "user") {
          sessionStorage.setItem("uid", id);
          navigate("/user/home");
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div>
      <h2>Login</h2>

      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button onClick={handleLogin}>Login</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;
