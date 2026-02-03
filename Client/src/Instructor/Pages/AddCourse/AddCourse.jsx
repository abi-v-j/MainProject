import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const API = "http://127.0.0.1:8000";

const AddCourse = () => {
    const instructorId = sessionStorage.getItem("iid");

    const [topics, setTopics] = useState([]);
    const [courses, setCourses] = useState([]);

    const [form, setForm] = useState({
        course_title: "",
        course_desc: "",
        course_price: "",
        course_requerements: "",
        topic_id: "",
    });

    const [image, setImage] = useState(null);

    /* ---------- LOAD ---------- */
    useEffect(() => {
        if (!instructorId) {
            alert("Instructor not logged in");
            return;
        }
        loadTopics();
        loadCourses();
    }, []);

    const loadTopics = () =>
        axios
            .get(`${API}/topics/`)
            .then(res => setTopics(res.data))
            .catch(console.error);

    const loadCourses = () =>
        axios
            .get(`${API}/instructor/courses/?instructor_id=${instructorId}`)
            .then(res => setCourses(res.data))
            .catch(console.error);

    /* ---------- INPUT ---------- */
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    /* ---------- SUBMIT ---------- */
    const handleSubmit = () => {
        if (!form.course_title || !form.topic_id || !image) return;

        const data = new FormData();
        Object.keys(form).forEach(k => data.append(k, form[k]));
        data.append("course_image", image);
        data.append("instructor_id", instructorId);

        axios
            .post(`${API}/courses/`, data)
            .then(() => {
                resetForm();
                loadCourses();
            })
            .catch(console.error);
    };

    const resetForm = () => {
        setForm({
            course_title: "",
            course_desc: "",
            course_date: "",
            course_price: "",
            course_requerements: "",
            topic_id: "",
        });
        setImage(null);
    };

    /* ---------- DELETE ---------- */
    const handleDelete = (id) => {
        if (!window.confirm("Delete course?")) return;

        axios
            .delete(`${API}/courses/${id}/`)
            .then(loadCourses)
            .catch(console.error);
    };

    /* ---------- RENDER ---------- */
    return (
        <div>
            <h2>Add Course</h2>

            {/* ADD COURSE */}
            <table border="1" cellPadding="6">
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input
                                name="course_title"
                                value={form.course_title}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Description</td>
                        <td>
                            <input
                                name="course_desc"
                                value={form.course_desc}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>



                    <tr>
                        <td>Price</td>
                        <td>
                            <input
                                name="course_price"
                                value={form.course_price}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Requirements</td>
                        <td>
                            <input
                                name="course_requerements"
                                value={form.course_requerements}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Topic</td>
                        <td>
                            <select
                                name="topic_id"
                                value={form.topic_id}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Topic --</option>
                                {topics.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.topic_name}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Image</td>
                        <td>
                            <input
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <button onClick={handleSubmit}>Add Course</button>

                        </td>
                    </tr>
                </tbody>
            </table>

            <br />

            {/* COURSE LIST */}
            <h3>My Courses</h3>

            <table border="1" cellPadding="6">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(c => (
                        <tr key={c.id}>
                            <td>{c.course_title}</td>
                            <td>{c.course_price}</td>
                            <td>
                                <button onClick={() => handleDelete(c.id)}>
                                    Delete
                                </button>
                                <Link to={`/instructor/add-section/${c.id}`}>
                                    <button>Sections</button>
                                </Link>

                            </td>
                        </tr>
                    ))}
                    {courses.length === 0 && (
                        <tr>
                            <td colSpan="3">No courses found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AddCourse;
