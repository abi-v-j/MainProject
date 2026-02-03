import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    headline: "",
    biography: "",
    securityquestion: "",
    securityanswer: "",
    gender: "",
  });

  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    data.append("photo", photo);

    axios
      .post(`${API}/users/`, data)
      .then(res => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch(() => alert("Registration failed"));
  };

  return (
    <div>
      <h2>User Registration</h2>

      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input name="name" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Email</td>
            <td>
              <input type="email" name="email" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input type="password" name="password" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Contact</td>
            <td>
              <input name="contact" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Headline</td>
            <td>
              <input name="headline" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Biography</td>
            <td>
              <textarea name="biography" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Photo</td>
            <td>
              <input type="file" onChange={e => setPhoto(e.target.files[0])} />
            </td>
          </tr>

          <tr>
            <td>Security Question</td>
            <td>
              <input name="securityquestion" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Security Answer</td>
            <td>
              <input name="securityanswer" onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              /> Male
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                style={{ marginLeft: 10 }}
              /> Female
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button onClick={handleRegister}>Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Registration;
