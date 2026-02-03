import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const API = "http://127.0.0.1:8000";

const AddMaterials = () => {
    const { sectionId } = useParams();

    const [materials, setMaterials] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    /* ---------- LOAD ---------- */
    useEffect(() => {
        loadMaterials();
    }, [sectionId]);

    const loadMaterials = () =>
        axios
            .get(`${API}/materials/?section_id=${sectionId}`)
            .then(res => setMaterials(res.data))
            .catch(console.error);

    /* ---------- ADD ---------- */
    const handleAdd = () => {
        if (!title || !file) return;

        const data = new FormData();
        data.append("material_title", title);
        data.append("material_desc", desc);
        data.append("material_file", file);
        data.append("section_id", sectionId);

        axios
            .post(`${API}/materials/`, data)
            .then(() => {
                setTitle("");
                setDesc("");
                setFile(null);
                loadMaterials();
            })
            .catch(console.error);
    };

    /* ---------- DELETE ---------- */
    const handleDelete = (id) => {
        if (!window.confirm("Delete material?")) return;

        axios
            .delete(`${API}/materials/${id}/`)
            .then(loadMaterials)
            .catch(console.error);
    };

    /* ---------- RENDER ---------- */
    return (
        <div>
            <h2>Add Materials (Section ID: {sectionId})</h2>

            {/* ADD MATERIAL */}
            <table border="1" cellPadding="6">
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Material title"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Description</td>
                        <td>
                            <input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Material description"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>File</td>
                        <td>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <button onClick={handleAdd}>Add Material</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br />

            {/* MATERIAL LIST */}
            <table border="1" cellPadding="6">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>File</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((m, index) => (
                        <tr key={m.id}>
                            <td>{index + 1}</td>
                            <td>{m.material_title}</td>
                            <td>{m.material_file}</td>
                            <td>
                                <button onClick={() => handleDelete(m.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {materials.length === 0 && (
                        <tr>
                            <td colSpan="4">No materials found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AddMaterials;
