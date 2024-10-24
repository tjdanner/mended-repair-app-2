import React, { useState, useRef } from "react";
import JobList from "./JobList";
import FullWidthJobList from "./FullWidthJobList"; // Import the new component

const JobListingSection = ({ jobs, updateJobStatus, editJob, deleteJob }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  const [showAllJobs, setShowAllJobs] = useState(false); // Control showing the full-width component
  const [allJobs, setAllJobs] = useState([]); // State to store all jobs to show
  const fullWidthRef = useRef(null); // Reference for the full-width section
  const topRef = useRef(null); // Reference for scrolling back to top

  const handleViewAll = (jobsToShow) => {
    setAllJobs(jobsToShow); // Update the jobs to show
    setShowAllJobs(true);
    setTimeout(() => {
      fullWidthRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the full-width section
    }, 100);
  };

  const handleCloseViewAll = () => {
    setShowAllJobs(false);
    topRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll back to top
  };

  return (
    <>
      <section className="job-listing-section" ref={topRef}>
        <JobList
          heading={"Jobs in Progress"}
          jobs={inProgressJobs}
          updateJobStatus={updateJobStatus}
          editJob={editJob}
          deleteJob={deleteJob}
          onViewAll={() => handleViewAll(inProgressJobs)} // Pass in-progress jobs
          showAll={showAllJobs} // Pass showAll state to control the display
        />
        <JobList
          heading={"Completed Jobs"}
          jobs={completedJobs}
          updateJobStatus={updateJobStatus}
          editJob={editJob}
          deleteJob={deleteJob}
          onViewAll={() => handleViewAll(completedJobs)} // Pass completed jobs
          showAll={showAllJobs} // Pass showAll state to control the display
        />
      </section>

      {/* Render the FullWidthJobList outside of the job-listing-section */}
      {showAllJobs && (
        <div ref={fullWidthRef} className="full-width-job-list">
          <FullWidthJobList
            jobs={allJobs} // Pass the selected jobs to show
            updateJobStatus={updateJobStatus}
            editJob={editJob}
            deleteJob={deleteJob}
            closeViewAll={handleCloseViewAll} // Close button handler
          />
        </div>
      )}
    </>
  );
};

export default JobListingSection;
