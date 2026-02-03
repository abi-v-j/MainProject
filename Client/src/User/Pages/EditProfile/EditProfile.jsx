import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    headline: "",
    biography: "",
    securityquestion: "",
    securityanswer: "",
    gender: "",
  });

  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // LOAD CURRENT PROFILE
  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API}/users/${uid}/`)
      .then((res) =>
        setForm({
          name: res.data.user_name,
          email: res.data.user_email,
          contact: res.data.user_contact,
          headline: res.data.user_headline,
          biography: res.data.user_biography,
          securityquestion: res.data.user_securityQuestion,
          securityanswer: res.data.user_securityAnswer,
          gender: res.data.user_gender,
        })
      )
      .catch(console.error);
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
const handleUpdate = () => {
  const uid = sessionStorage.getItem("uid");
  if (!uid) return;

  const data = new FormData();
  Object.keys(form).forEach(k => data.append(k, form[k]));
  if (photo) data.append("photo", photo);

  axios
    .post(`http://127.0.0.1:8000/users/${uid}/edit-profile/`, data)
    .then(res => {
      alert(res.data.message);
      navigate("/user/profile");
    })
    .catch(() => alert("Update failed"));
};


  return (
    <div>
      <h2>Edit Profile</h2>

      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input name="name" value={form.name} onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Contact</td>
            <td>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Headline</td>
            <td>
              <input
                name="headline"
                value={form.headline}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Biography</td>
            <td>
              <textarea
                name="biography"
                value={form.biography}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Security Question</td>
            <td>
              <input
                name="securityquestion"
                value={form.securityquestion}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Security Answer</td>
            <td>
              <input
                name="securityanswer"
                value={form.securityanswer}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleChange}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleChange}
                style={{ marginLeft: 10 }}
              />{" "}
              Female
            </td>
          </tr>

          <tr>
            <td>Photo</td>
            <td>
              <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button onClick={handleUpdate}>Update Profile</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditProfile;
