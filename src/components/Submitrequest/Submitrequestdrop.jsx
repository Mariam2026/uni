import { useState } from "react";
import "./Submitrequest.css";

export default function SubmitRequestDrop() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 
    setSelectedFiles(files);
  };

  return (
    <div className="req">
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

      <h2 className="type">Request Type</h2>
      <select id="requestType" name="requestType" className="requestType">
        <option value="transcript">Transcript</option>
        <option value="id">ID Renewal</option>
        <option value="leave">Leave Request</option>
      </select>

      <h2 className="t">Description</h2>
      <textarea
        className="desType"
        placeholder="Enter Details About Your Request..."
      ></textarea>

      <button type="submit" className="sub">Submit</button>
    </div>
  );
}
