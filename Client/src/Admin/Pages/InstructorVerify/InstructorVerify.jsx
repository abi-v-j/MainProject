import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const InstructorVerify = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = () =>
    axios.get(`${API}/instructors/`)
      .then(res => setInstructors(res.data))
      .catch(console.error);

  const accept = (id) =>
    axios.put(`${API}/instructors/${id}/accept/`)
      .then(load)
      .catch(console.error);

  const reject = (id) =>
    axios.put(`${API}/instructors/${id}/reject/`)
      .then(load)
      .catch(console.error);

  const pending = instructors.filter(i => i.instructor_status === 0);
  const accepted = instructors.filter(i => i.instructor_status === 1);
  const rejected = instructors.filter(i => i.instructor_status === 2);

  const renderTable = (data, type) => (
    <table border="1" cellPadding="6" style={{ marginBottom: 30 }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(i => (
          <tr key={i.id}>
            <td>{i.instructor_name}</td>
            <td>{i.instructor_email}</td>
            <td>{i.instructor_contact}</td>
            <td>
              {type === "pending" && (
                <>
                  <button onClick={() => accept(i.id)}>Accept</button>
                  <button onClick={() => reject(i.id)} style={{ marginLeft: 6 }}>
                    Reject
                  </button>
                </>
              )}

              {type === "accepted" && (
                <button onClick={() => reject(i.id)}>Reject</button>
              )}

              {type === "rejected" && "-"}
            </td>
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td colSpan="4">No records</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Pending Instructors</h2>
      {renderTable(pending, "pending")}

      <h2>Accepted Instructors</h2>
      {renderTable(accepted, "accepted")}

      <h2>Rejected Instructors</h2>
      {renderTable(rejected, "rejected")}
    </div>
  );
};

export default InstructorVerify;
