import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

const API = "http://127.0.0.1:8000";

const AddSection = () => {
    const { courseId } = useParams();

    const [sectionName, setSectionName] = useState("");
    const [sections, setSections] = useState([]);

    /* ---------- LOAD ---------- */
    useEffect(() => {
        loadSections();
    }, [courseId]);

    const loadSections = () =>
        axios
            .get(`${API}/sections/?course_id=${courseId}`)
            .then(res => setSections(res.data))
            .catch(console.error);

    /* ---------- ADD ---------- */
    const handleAdd = () => {
        if (!sectionName.trim()) return;

        axios
            .post(`${API}/sections/`, {
                section_name: sectionName,
                course_id: courseId,
            })
            .then(() => {
                setSectionName("");
                loadSections();
            })
            .catch(console.error);
    };

    /* ---------- DELETE ---------- */
    const handleDelete = (id) => {
        if (!window.confirm("Delete section?")) return;

        axios
            .delete(`${API}/sections/${id}/`)
            .then(loadSections)
            .catch(console.error);
    };

    /* ---------- RENDER ---------- */
    return (
        <div>
            <h2>Add Section (Course ID: {courseId})</h2>

            <table border="1" cellPadding="6">
                <tbody>
                    <tr>
                        <td>Section Name</td>
                        <td>
                            <input
                                value={sectionName}
                                onChange={(e) => setSectionName(e.target.value)}
                                placeholder="Enter section name"
                            />
                        </td>
                        <td>
                            <button onClick={handleAdd}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br />

            <table border="1" cellPadding="6">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Section Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((s, index) => (
                        <tr key={s.id}>
                            <td>{index + 1}</td>
                            <td>{s.section_name}</td>
                            <td>
                                <button onClick={() => handleDelete(s.id)}>
                                    Delete
                                </button>
                                <Link to={`/instructor/add-materials/${s.id}`}>
                                    <button>Materials</button>
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

export default AddSection;
