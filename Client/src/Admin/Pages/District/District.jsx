import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const District = () => {
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    loadDistricts();
  }, []);

  const loadDistricts = () => {
    axios
      .get(`${API}/districts/`)
      .then(res => setDistricts(res.data))
      .catch(console.error);
  };

  /* ---------- ADD / UPDATE ---------- */
  const handleSave = () => {
    if (!name.trim()) return;

    // UPDATE
    if (editId) {
      axios
        .put(`${API}/districts/${editId}/`, {
          district_name: name,
        })
        .then(() => {
          resetForm();
          loadDistricts();
        })
        .catch(console.error);
    }
    // CREATE
    else {
      axios
        .post(`${API}/districts/`, {
          district_name: name,
        })
        .then(() => {
          setName("");
          loadDistricts();
        })
        .catch(console.error);
    }
  };

  /* ---------- EDIT ---------- */
  const startEdit = (d) => {
    setEditId(d.id);
    setName(d.district_name);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this district?")) return;

    axios
      .delete(`${API}/districts/${id}/`)
      .then(loadDistricts)
      .catch(console.error);
  };

  /* ---------- RENDER ---------- */
  return (
    <div>
      <h2>District</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>District Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* INPUT ROW */}
          <tr>
            <td>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter district"
              />
            </td>
            <td>
              <button onClick={handleSave}>
                {editId ? "Update" : "Save"}
              </button>
              {editId && (
                <button onClick={resetForm} style={{ marginLeft: 6 }}>
                  Cancel
                </button>
              )}
            </td>
          </tr>

          {/* DATA ROWS */}
          {districts.map((d) => (
            <tr key={d.id}>
              <td>{d.district_name}</td>
              <td>
                <button onClick={() => startEdit(d)}>Edit</button>
                <button
                  onClick={() => handleDelete(d.id)}
                  style={{ marginLeft: 6 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {districts.length === 0 && (
            <tr>
              <td colSpan="2">No districts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default District;
