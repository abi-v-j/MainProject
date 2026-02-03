import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router";

const API = "http://127.0.0.1:8000";

const ViewSections = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/sections/?course_id=${courseId}`)
      .then(res => setSections(res.data))
      .catch(console.error);
  }, [courseId]);

  return (
    <div>
      <h2>Sections</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>#</th>
            <th>Section</th>
            <th>Materials</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.section_name}</td>
              <td>
                <Link to={`/user/sections/${s.id}`}>
                  <button>View Materials</button>
                </Link>
              </td>
            </tr>
          ))}

          {sections.length === 0 && (
            <tr>
              <td colSpan="3">No sections found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSections;
