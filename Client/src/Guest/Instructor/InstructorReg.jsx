import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const InstructorReg = () => {

  const [form, setForm] = useState({
    instructor_name: "",
    instructor_email: "",
    instructor_password: "",
    instructor_contact: "",
    instructor_headline: "",
    instructor_biography: "",
    instructor_Qualification: "",
    instructor_field: "",
    instructor_Question: "",
    instructor_securityAnswer: "",
    instructor_gender: "",
  });

  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);

  /* ---------- INPUT ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    data.append("instructor_photo", photo);
    data.append("instructor_proof", proof);

    axios
      .post(`${API}/instructors/`, data)
      .then(() => {
        resetForm();
      })
      .catch(console.error);
  };

  const resetForm = () => {
    setForm({
      instructor_name: "",
      instructor_email: "",
      instructor_password: "",
      instructor_contact: "",
      instructor_headline: "",
      instructor_biography: "",
      instructor_Qualification: "",
      instructor_field: "",
      instructor_Question: "",
      instructor_securityAnswer: "",
      instructor_gender: "",
    });
    setPhoto(null);
    setProof(null);
  };

  

  /* ---------- RENDER ---------- */
  return (
    <div>
      <h2>Instructor Registration</h2>

      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="6">
          <tbody>
            <tr>
              <td>Name</td>
              <td><input name="instructor_name" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input name="instructor_email" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" name="instructor_password" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Contact</td>
              <td><input name="instructor_contact" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Headline</td>
              <td><input name="instructor_headline" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Biography</td>
              <td><textarea name="instructor_biography" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Qualification</td>
              <td><textarea name="instructor_Qualification" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Field</td>
              <td><input name="instructor_field" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Security Question</td>
              <td><input name="instructor_Question" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Security Answer</td>
              <td><input name="instructor_securityAnswer" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
                <input type="radio" name="instructor_gender" value="Male" onChange={handleChange} /> Male
                <input type="radio" name="instructor_gender" value="Female" onChange={handleChange} /> Female
              </td>
            </tr>
            <tr>
              <td>Photo</td>
              <td><input type="file" onChange={e => setPhoto(e.target.files[0])} /></td>
            </tr>
            <tr>
              <td>Proof</td>
              <td><input type="file" onChange={e => setProof(e.target.files[0])} /></td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Save</button>
                <button type="button" onClick={resetForm} style={{ marginLeft: 6 }}>
                  Reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <br />

    </div>
  );
};

export default InstructorReg;
