import { useState } from "react";
import axios from "axios";

export default function AddUpdatesList() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("transcript");
  const [description, setDescription] = useState("");
  return (
    <div className="req">
      <form>
        <div className="header-row">
          <h2>Add Updates</h2>
        </div>

        <h2 className="t">Announcement Details</h2>
        <textarea
          className="desType"
          placeholder="Enter Announcement"
          value={description}
        ></textarea>

        <button type="submit" className="sub">
          Submit
        </button>
      </form>
    </div>
  );
}
