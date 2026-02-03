import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const EditProfile = () => {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const iid = sessionStorage.getItem("iid");
    if (!iid) return navigate("/login");

    axios
      .get(`${API}/instructors/${iid}/`)
      .then(res => setForm(res.data))
      .catch(console.error);
  }, [navigate]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateProfile = () => {
    const iid = sessionStorage.getItem("iid");
    const data = new FormData();

    data.append("name", form.instructor_name || "");
    data.append("email", form.instructor_email || "");
    data.append("contact", form.instructor_contact || "");
    data.append("headline", form.instructor_headline || "");
    data.append("biography", form.instructor_biography || "");
    data.append("qualification", form.instructor_Qualification || "");
    data.append("field", form.instructor_field || "");
    data.append("securityquestion", form.instructor_securityQuestion || "");
    data.append("securityanswer", form.instructor_securityAnswer || "");
    data.append("gender", form.instructor_gender || "");
    if (photo) data.append("photo", photo);

    axios
      .post(`${API}/instructors/${iid}/edit-profile/`, data)
      .then(() => navigate("/instructor/profile"))
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
              <input
                name="instructor_name"
                value={form.instructor_name || ""}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Headline</td>
            <td>
              <input
                name="instructor_headline"
                value={form.instructor_headline || ""}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Photo</td>
            <td>
              <input type="file" onChange={e => setPhoto(e.target.files[0])} />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button onClick={updateProfile}>Update</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditProfile;
