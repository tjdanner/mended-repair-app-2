import React from 'react';
import JobCard from "./JobCard";

const FullWidthJobList = ({ jobs, updateJobStatus, editJob, deleteJob, closeViewAll }) => {
  return (
    <>
      <div className="job-card-header">
        <h2>All Jobs </h2>
        <button className="btn close-btn" onClick={closeViewAll}>
          Close
        </button>
      </div>
      <div className="all-jobs-section">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            updateJobStatus={updateJobStatus}
            editJob={editJob}
            deleteJob={deleteJob} />
        ))}
      </div>
    </>
  );
};

export default FullWidthJobList;
