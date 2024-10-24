import React, { useState } from 'react';
import JobCard from "./JobCard";

const JobList = ({ heading, jobs, updateJobStatus, editJob, deleteJob, onViewAll, showAll }) => {
  const [showAllState, setShowAllState] = useState(showAll || false); // State to track showing all jobs

  const toggleShowAll = () => {
    setShowAllState(!showAllState); // Toggle the state
    onViewAll(); // Call the function passed from the parent
  };

  // Only show the first 3 jobs initially, if not showing all
  const displayedJobs = showAllState ? jobs : jobs.slice(0, 3);

  return (
    <div className="job-list">
      <div className="heading-btn-container">
        <h2>{heading} ({jobs.length})</h2>
        <button className="btn" onClick={toggleShowAll}>
          {showAllState ? "Show Less" : "View All"}
        </button>
      </div>

      {/* Display the appropriate jobs based on the state */}
      {displayedJobs.length > 0 ? (
        displayedJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            updateJobStatus={updateJobStatus}
            editJob={editJob}
            deleteJob={deleteJob} />
        ))
      ) : (
        <p>No jobs available.</p>
      )}

      {/* Remove the previous all jobs section rendering logic as it's handled in FullWidthJobList */}
    </div>
  );
};

export default JobList;
