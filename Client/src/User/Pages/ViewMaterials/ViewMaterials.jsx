import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const API = "http://127.0.0.1:8000";

const ViewMaterials = () => {
  const { sectionId } = useParams();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/materials/?section_id=${sectionId}`)
      .then(res => setMaterials(res.data))
      .catch(console.error);
  }, [sectionId]);

  return (
    <div>
      <h2>Materials</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m, index) => (
            <tr key={m.id}>
              <td>{index + 1}</td>
              <td>{m.material_title}</td>
              <td>
                <a
                  href={`http://127.0.0.1:8000${m.material_file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </td>
            </tr>
          ))}

          {materials.length === 0 && (
            <tr>
              <td colSpan="3">No materials found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMaterials;
