import { useState } from "react";
import axios from "axios";
import "./Submitrequest.css";

export default function SubmitRequestDrop() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("transcript");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("description", description);

    if (selectedFiles.length > 0) {
      // backend expects single file param "document"
      formData.append("document", selectedFiles[0]); 
    }

    try {
      const token = localStorage.getItem("token"); // get your JWT from storage

      const res = await axios.post("http://localhost:8080/api/requests", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Request submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit request");
    }
  };

  return (
    <div className="req">
      <form onSubmit={handleSubmit}>
        <div className="header-row">
          <h2>Submit a New Request</h2>

          <label className="doc">
            Attach Documents
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <ul style={{ marginLeft: "70px", color: "#555" }}>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}

        <h2 className="type">Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="requestType"
          placeholder="Enter request title"
        />

        <h2 className="type">Request Type</h2>
        <select
          id="requestType"
          name="requestType"
          className="requestType"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Transcript">Transcript</option>
          <option value="ID Renewal">ID Renewal</option>
          <option value="Leave Request">Leave Request</option>
        </select>

        <h2 className="t">Description</h2>
        <textarea
          className="desType"
          placeholder="Enter Details About Your Request..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="sub">
          Submit
        </button>
      </form>
    </div>
  );
}
