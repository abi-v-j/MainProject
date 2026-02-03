import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Course.module.css";

const Course = () => {

  // Form state
  const [course_title, setCourseTitle] = useState("");
  const [course_desc, setCourseDesc] = useState("");
  const [course_date, setCourseDate] = useState("");
  const [course_price, setCoursePrice] = useState("");
  const [course_image, setCourseImage] = useState(null);
  const [course_average, setCourseAverage] = useState("");
  const [course_requerements, setCourseRequerements] = useState("");
  const [topic_id, setTopicId] = useState("");
  const [instructor_id, setInstructorId] = useState("");

  // Dropdown data
  const [topics, setTopics] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/topics/")
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));

    axios.get("http://127.0.0.1:8000/instructors/")
      .then(res => setInstructors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_title", course_title);
    formData.append("course_desc", course_desc);
    formData.append("course_date", course_date);
    formData.append("course_price", course_price);
    formData.append("course_image", course_image);
    formData.append("course_average", course_average);
    formData.append("course_requerements", course_requerements);
    formData.append("topic_id", topic_id);
    formData.append("instructor_id", instructor_id);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/course/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(res.data.msg);
    } catch (err) {
      console.error(err);
      alert("Insert failed");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1 className={style.heading}>Course Registration</h1>

        <form className={style.formGrid} onSubmit={handleSubmit}>

          <div className={style.label}>Course Title</div>
          <input
            type="text"
            className={style.input}
            value={course_title}
            onChange={(e) => setCourseTitle(e.target.value)}
          />

          <div className={style.label}>Description</div>
          <input
            type="text"
            className={style.input}
            value={course_desc}
            onChange={(e) => setCourseDesc(e.target.value)}
          />

          <div className={style.label}>Date</div>
          <input
            type="date"
            className={style.input}
            value={course_date}
            onChange={(e) => setCourseDate(e.target.value)}
          />

          <div className={style.label}>Price</div>
          <input
            type="text"
            className={style.input}
            value={course_price}
            onChange={(e) => setCoursePrice(e.target.value)}
          />

          <div className={style.label}>Image</div>
          <input
            type="file"
            className={style.input}
            onChange={(e) => setCourseImage(e.target.files[0])}
          />

          <div className={style.label}>Average</div>
          <input
            type="text"
            className={style.input}
            value={course_average}
            onChange={(e) => setCourseAverage(e.target.value)}
          />

          <div className={style.label}>Requirements</div>
          <input
            type="text"
            className={style.input}
            value={course_requerements}
            onChange={(e) => setCourseRequerements(e.target.value)}
          />

          <div className={style.label}>Topic</div>
          <select
            className={style.input}
            value={topic_id}
            onChange={(e) => setTopicId(e.target.value)}
          >
            <option value="">--- Select Topic ---</option>
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>

          <div className={style.label}>Instructor</div>
          <select
            className={style.input}
            value={instructor_id}
            onChange={(e) => setInstructorId(e.target.value)}
          >
            <option value="">--- Select Instructor ---</option>
            {instructors.map(inst => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>

          <div className={style.buttonContainer}>
            <button type="submit" className={style.submit}>Submit</button>
            <button type="reset" className={style.cancel}>Cancel</button>
          </div>

        </form>

      </div>
      <div className={style.listWrapper}>
              <div className={style.listHeader}>
                <div>Sl No</div>
                <div>Course title</div>
                <div>Describition</div>
                <div>Date</div>
                <div>Price</div>
                <div>Image</div>
                <div>Average</div>
                <div>Requirements</div>
                <div>Topic</div>
                <div>Instructors</div>


                <div className={style.actionHeader}>Action</div>
            
              </div>
      
              {courseData.length === 0 && (
                <div className={style.emptyState}>No course found</div>
              )}
      
              {coursetData.map((item, index) => (
                <div className={style.listRow} key={item.id}>
                  <div className={style.cellIndex}>{index + 1}</div>
      
                  <div className={style.cellName}>{item.course_title}</div>
      
                  <div className={style.cellAction}>
                    <button
                      className={style.editLink}
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
      
                    <button
                      className={style.deleteBtn}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
};

export default Course;
