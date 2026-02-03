import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const Category = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    axios
      .get(`${API}/categories/`)
      .then(res => setCategories(res.data))
      .catch(console.error);
  };

  /* ---------- ADD / UPDATE ---------- */
  const handleSave = () => {
    if (!name.trim()) return;

    // UPDATE
    if (editId) {
      axios
        .put(`${API}/categories/${editId}/`, {
          category_name: name,
        })
        .then(() => {
          resetForm();
          loadCategories();
        })
        .catch(console.error);
    }
    // CREATE
    else {
      axios
        .post(`${API}/categories/`, {
          category_name: name,
        })
        .then(() => {
          setName("");
          loadCategories();
        })
        .catch(console.error);
    }
  };

  /* ---------- EDIT ---------- */
  const startEdit = (c) => {
    setEditId(c.id);
    setName(c.category_name);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;

    axios
      .delete(`${API}/categories/${id}/`)
      .then(loadCategories)
      .catch(console.error);
  };

  /* ---------- RENDER ---------- */
  return (
    <div>
      <h2>Category</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* INPUT ROW */}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Enter category"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.category_name}</td>
              <td>
                <button onClick={() => startEdit(c)}>Edit</button>
                <button
                  onClick={() => handleDelete(c.id)}
                  style={{ marginLeft: 6 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="2">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
