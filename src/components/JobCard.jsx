import React, { useState, useEffect, forwardRef } from "react";
import userIcon from "/assets/user-svgrepo-com.svg";
import phoneIcon from "/assets/phone-svgrepo-com.svg";
import emailIcon from "/assets/envelope-svgrepo-com.svg";

const JobCard = forwardRef(({ job, updateJobStatus, editJob, deleteJob, expandAll }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync local isExpanded state with the expandAll prop from the parent
  useEffect(() => {
    setIsExpanded(expandAll);
  }, [expandAll]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate} at ${formattedTime}`;
  };

  const formatPhoneNumber = (number) => {
    const numberStr = String(number);
    const cleaned = numberStr.replace(/\D/g, "");

    if (cleaned.length !== 10) {
      console.error("Phone number must be 10 digits.");
      return numberStr;
    }

    const areaCode = cleaned.slice(0, 3);
    const centralOfficeCode = cleaned.slice(3, 6);
    const lineNumber = cleaned.slice(6);
    return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  };

  const serviceTypes = [];
  if (job.service_type) {
    if (job.service_type.repair) serviceTypes.push("Repair");
    if (job.service_type.cleaning) serviceTypes.push("Cleaning");
  }

  return (
    <div ref={ref} className={`job-card ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="job-card-header">
        <h3>{job.name || "Unknown"}</h3>
        <button className="toggle-btn btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {!isExpanded && (
        <div id="collapsed-view">
          <div className="job-card-group">
            <p>Service: {serviceTypes.length > 0 ? serviceTypes.join(" & ") : "No service type specified"}</p>
            <p>Date Created: {new Date(job.created_at).toLocaleString()}</p>
          </div>
          <div className="btn-container">
            <button id="update-btn" className="btn" onClick={() => updateJobStatus(job.id, job.completed)}>
              {job.completed ? "Reopen Job" : "Mark as Complete"}
            </button>
            <button id="edit-btn" className="btn" onClick={() => editJob(job)}>Edit</button>
            <button id="delete-btn" className="btn" onClick={() => deleteJob(job.id)}>Delete</button>
          </div>
        </div>
      )}

      {isExpanded && (
        <>
          <div id="dates" className="job-card-group">
            <div className="job-card-line">
              <span className="job-card-label">Date Created:</span>
              <p id="job-card-date-opened" className="job-card-date">
                {formatDateString(job.created_at)} by {job.created_by}
              </p>
            </div>
            <div className="job-card-line">
              <span className="job-card-label">Last Modified:</span>
              <p id="job-card-last-modified" className="job-card-date">
                {formatDateString(job.last_modified)} by {job.modified_by}
              </p>
            </div>
          </div>

          <div id="contact-details" className="job-card-group">
            <h3>Contact Details:</h3>
            <div className="job-card-line">
              <img className="job-card-icon" src={userIcon} alt="user-icon" />
              <p id="job-card-name">{job.name || "Unknown"}</p>
            </div>
            <div className="job-card-line">
              <img className="job-card-icon" src={phoneIcon} alt="user-icon" />
              <p id="job-card-number">{formatPhoneNumber(job.number) || "No phone number provided"}</p>
            </div>
            <div className="job-card-line">
              <img className="job-card-icon" src={emailIcon} alt="user-icon" />
              <p id="job-card-email">{job.email || "No email provided"}</p>
            </div>
          </div>

          <div id="service-details" className="job-card-group">
            <h3>Service Details:</h3>
            <div className="job-card-line">
              <span className="job-card-label">Machine Type:</span>
              <p id="job-card-machine-type">{job.machine_type || "No machine type specified"}</p>
            </div>
            <div className="job-card-line">
              <span className="job-card-label">Serial Number:</span>
              <p id="job-card-serial_num">{job.serial_num || "No serial number provided"}</p>
            </div>
            <div className="job-card-line">
              <span className="job-card-label">Service Type:</span>
              <p id="job-card-service-type">
                {serviceTypes.length > 0
                  ? serviceTypes.join(" & ")
                  : "No service type specified"}
              </p>
            </div>
          </div>

          {job.image_url && (
            <div className="job-card-group">
              <h3>Image:</h3>
              <img src={job.image_url} alt="Job" style={{ maxWidth: "100%" }} />
            </div>
          )}

          <div id="service-notes" className="job-card-group">
            <h3>Notes:</h3>
            <p id="job-card-notes">{job.notes || "No additional notes."}</p>
          </div>

          <div className="btn-container">
            <button id="update-btn" className="btn" onClick={() => updateJobStatus(job.id, job.completed)}>
              {job.completed ? "Reopen Job" : "Mark as Complete"}
            </button>
            <button id="edit-btn" className="btn" onClick={() => editJob(job)}>Edit</button>
            <button id="delete-btn" className="btn" onClick={() => deleteJob(job.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
});

export default JobCard;