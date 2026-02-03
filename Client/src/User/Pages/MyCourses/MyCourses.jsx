import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const API = "http://127.0.0.1:8000";

const MyCourses = () => {
  const uid = sessionStorage.getItem("uid");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/my-courses/?user_id=${uid}`)
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Purchased On</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.course__course_title}</td>
              <td>{c.purchase_date}</td>
              <td>
                <Link to={`/user/courses/${c.course_id}`}>
                  <button>Open</button>
                </Link>
              </td>
            </tr>
          ))}

          {courses.length === 0 && (
            <tr>
              <td colSpan="4">No purchases found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyCourses;
