import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const Topic = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [topics, setTopics] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    loadCategories();
    loadSubcategories();
    loadTopics();
  }, []);

  const loadCategories = () =>
    axios.get(`${API}/categories/`)
      .then(res => setCategories(res.data))
      .catch(console.error);

  const loadSubcategories = () =>
    axios.get(`${API}/subcategories/`)
      .then(res => setSubcategories(res.data))
      .catch(console.error);

  const loadTopics = () =>
    axios.get(`${API}/topics/`)
      .then(res => setTopics(res.data))
      .catch(console.error);

  /* ---------- ADD / UPDATE ---------- */
  const handleSave = () => {
    if (!name || !subcategoryId) return;

    const payload = {
      topic_name: name,
      subcategory_id: subcategoryId,
    };

    // UPDATE
    if (editId) {
      axios
        .put(`${API}/topics/${editId}/`, payload)
        .then(() => {
          resetForm();
          loadTopics();
        })
        .catch(console.error);
    }
    // CREATE
    else {
      axios
        .post(`${API}/topics/`, payload)
        .then(() => {
          resetForm();
          loadTopics();
        })
        .catch(console.error);
    }
  };

  /* ---------- EDIT ---------- */
  const startEdit = (t) => {
    setEditId(t.id);
    setName(t.topic_name);
    setSubcategoryId(t.subcategory_id);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setSubcategoryId("");
    setCategoryId("");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this topic?")) return;

    axios
      .delete(`${API}/topics/${id}/`)
      .then(loadTopics)
      .catch(console.error);
  };

  /* ---------- FILTER SUBCATEGORIES BY CATEGORY ---------- */
  const filteredSubcategories = categoryId
    ? subcategories.filter(s => s.category_id === Number(categoryId))
    : subcategories;

  /* ---------- RENDER ---------- */
  return (
    <div>
      <h2>Topic</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Topic</th>
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
                <option value="">-- Category --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.category_name}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
              >
                <option value="">-- Subcategory --</option>
                {filteredSubcategories.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.subcategory_name}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <input
                placeholder="Topic name"
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
          {topics.map(t => (
            <tr key={t.id}>
              <td>
                {
                  categories.find(c =>
                    c.id ===
                    subcategories.find(s => s.id === t.subcategory_id)?.category_id
                  )?.category_name || "-"
                }
              </td>

              <td>
                {
                  subcategories.find(s => s.id === t.subcategory_id)
                    ?.subcategory_name || "-"
                }
              </td>

              <td>{t.topic_name}</td>

              <td>
                <button onClick={() => startEdit(t)}>Edit</button>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{ marginLeft: 6 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {topics.length === 0 && (
            <tr>
              <td colSpan="4">No topics found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Topic;
