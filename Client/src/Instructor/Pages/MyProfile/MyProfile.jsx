import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://127.0.0.1:8000";

const MyProfile = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const iid = sessionStorage.getItem("iid");
    if (!iid) return navigate("/login");

    axios
      .get(`${API}/instructors/${iid}/`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, [navigate]);

  if (!data) return null;

  return (
    <div>
      <h2>My Profile</h2>

      {data.instructor_photo && (
        <img src={`${API}${data.instructor_photo}`} width="120" alt="" />
      )}

      <table border="1" cellPadding="6">
        <tbody>
          <tr><td>Name</td><td>{data.instructor_name}</td></tr>
          <tr><td>Email</td><td>{data.instructor_email}</td></tr>
          <tr><td>Contact</td><td>{data.instructor_contact}</td></tr>
          <tr><td>Headline</td><td>{data.instructor_headline}</td></tr>
          <tr><td>Field</td><td>{data.instructor_field}</td></tr>
        </tbody>
      </table>

      <br />

      <button onClick={() => navigate("/instructor/edit-profile")}>
        Edit Profile
      </button>

      <button
        onClick={() => navigate("/instructor/change-password")}
        style={{ marginLeft: 10 }}
      >
        Change Password
      </button>
    </div>
  );
};

export default MyProfile;
