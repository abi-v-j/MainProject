import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const API = "http://127.0.0.1:8000";

const ViewCourse = () => {
  const uid = sessionStorage.getItem("uid");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/courses/`)
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  const handlePurchase = (courseId) => {
    if (!uid) {
      alert("Login required");
      return;
    }

    axios
      .post(`${API}/purchase-course/`, {
        course_id: courseId,
        user_id: uid,
      })
      .then(res => alert(res.data.message))
      .catch(err =>
        alert(err.response?.data?.message || "Purchase failed")
      );
  };

  return (
    <div>
      <h2>Available Courses</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Price</th>
            <th>Sections</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.course_title}</td>
              <td>{c.course_price}</td>
              <td>
                <Link to={`/user/courses/${c.id}`}>
                  <button>View</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handlePurchase(c.id)}>
                  Purchase
                </button>
              </td>
            </tr>
          ))}

          {courses.length === 0 && (
            <tr>
              <td colSpan="5">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourse;
