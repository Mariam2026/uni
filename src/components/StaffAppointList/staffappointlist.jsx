import "./staffappointlist.css";
import { FiCalendar, FiClock, FiSearch } from "react-icons/fi";

export default function StaffAppointList() {
  return (
    <div className="req">
      <div className="header-row">
        <h2>All Appointments</h2>
        <div className="search-place">
          <input type="search" className="searchh" />{" "}
          <FiSearch size={19} className="search-icon" />
        </div>
      </div>

      <div className="requests-list">
        <div className="request-card">
          <div className="request-info">
            <FiCalendar className="request-icon" size={30} />
            <div className="request-text">
              <span className="title">Something Important</span>
              <span className="time">
                15/4/2025 <FiClock /> 5:32 PM
              </span>
            </div>
          </div>

          <span className="status">status</span>
        </div>
      </div>

      <div className="requests-list">
        <div className="request-card">
          <div className="request-info">
            <FiCalendar className="request-icon" size={30} />
            <div className="request-text">
              <span className="title">Something Important</span>
              <span className="time">
                15/4/2025 <FiClock /> 5:32 PM
              </span>
            </div>
          </div>

          <span className="status">status</span>
        </div>
      </div>

      <div className="requests-list">
        <div className="request-card">
          <div className="request-info">
            <FiCalendar className="request-icon" size={30} />
            <div className="request-text">
              <span className="title">Something Important</span>
              <span className="time">
                15/4/2025 <FiClock /> 5:32 PM
              </span>
            </div>
          </div>

          <span className="status">status</span>
        </div>
      </div>

      <div className="requests-list">
        <div className="request-card">
          <div className="request-info">
            <FiCalendar className="request-icon" size={30} />
            <div className="request-text">
              <span className="title">Something Important</span>
              <span className="time">
                15/4/2025 <FiClock /> 5:32 PM
              </span>
            </div>
          </div>

          <span className="status">status</span>
        </div>
      </div>
    </div>
  );
}
