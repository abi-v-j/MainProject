import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const SubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = () => {
    axios
      .get(`${API}/categories/`)
      .then(res => setCategories(res.data))
      .catch(console.error);
  };

  const loadSubcategories = () => {
    axios
      .get(`${API}/subcategories/`)
      .then(res => setSubcategories(res.data))
      .catch(console.error);
  };

  /* ---------- ADD / UPDATE ---------- */
  const handleSave = () => {
    if (!name.trim() || !categoryId) return;

    // UPDATE
    if (editId) {
      axios
        .put(`${API}/subcategories/${editId}/`, {
          subcategory_name: name,
          category_id: categoryId,
        })
        .then(() => {
          resetForm();
          loadSubcategories();
        })
        .catch(console.error);
    }
    // CREATE
    else {
      axios
        .post(`${API}/subcategories/`, {
          subcategory_name: name,
          category_id: categoryId,
        })
        .then(() => {
          resetForm();
          loadSubcategories();
        })
        .catch(console.error);
    }
  };

  /* ---------- EDIT ---------- */
  const startEdit = (s) => {
    setEditId(s.id);
    setName(s.subcategory_name);
    setCategoryId(s.category_id);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setCategoryId("");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this subcategory?")) return;

    axios
      .delete(`${API}/subcategories/${id}/`)
      .then(loadSubcategories)
      .catch(console.error);
  };

  /* ---------- RENDER ---------- */
  return (
    <div>
      <h2>Sub Category</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* INPUT ROW */}
          <tr>
            <td>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.category_name}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <input
                placeholder="Enter subcategory"
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
          {subcategories.map((s) => (
            <tr key={s.id}>
              <td>
                {
                  categories.find(c => c.id === s.category_id)
                    ?.category_name || "-"
                }
              </td>
              <td>{s.subcategory_name}</td>
              <td>
                <button onClick={() => startEdit(s)}>Edit</button>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={{ marginLeft: 6 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {subcategories.length === 0 && (
            <tr>
              <td colSpan="3">No subcategories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategory;
