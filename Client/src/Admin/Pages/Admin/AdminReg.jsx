import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const AdminReg = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = () => {
    axios
      .get(`${API}/admins/`)
      .then(res => setAdmins(res.data))
      .catch(console.error);
  };

  /* ---------- ADD / UPDATE ---------- */
  const handleSave = () => {
    if (!name || !email || !password) return;

    const payload = {
      admin_name: name,
      admin_email: email,
      admin_password: password,
    };

    // UPDATE
    if (editId) {
      axios
        .put(`${API}/admins/${editId}/`, payload)
        .then(() => {
          resetForm();
          loadAdmins();
        })
        .catch(console.error);
    }
    // CREATE
    else {
      axios
        .post(`${API}/admins/`, payload)
        .then(() => {
          resetForm();
          loadAdmins();
        })
        .catch(console.error);
    }
  };

  /* ---------- EDIT ---------- */
  const startEdit = (a) => {
    setEditId(a.id);
    setName(a.admin_name);
    setEmail(a.admin_email);
    setPassword(a.admin_password);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this admin?")) return;

    axios
      .delete(`${API}/admins/${id}/`)
      .then(loadAdmins)
      .catch(console.error);
  };

  /* ---------- RENDER ---------- */
  return (
    <div>
      <h2>Admin Registration</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
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
                placeholder="Admin name"
              />
            </td>
            <td>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
              />
            </td>
            <td>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
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
          {admins.map((a) => (
            <tr key={a.id}>
              <td>{a.admin_name}</td>
              <td>{a.admin_email}</td>
              <td>{a.admin_password}</td>
              <td>
                <button onClick={() => startEdit(a)}>Edit</button>
                <button
                  onClick={() => handleDelete(a.id)}
                  style={{ marginLeft: 6 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {admins.length === 0 && (
            <tr>
              <td colSpan="4">No admins found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReg;
