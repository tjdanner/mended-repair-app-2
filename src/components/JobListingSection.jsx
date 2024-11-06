import React, { useState, useRef } from "react";
import JobList from "./JobList";
// FullWidthJobList is not used yet, so keep it commented out for now
// import FullWidthJobList from "./FullWidthJobList"; 

const JobListingSection = ({ jobs, updateJobStatus, editJob, deleteJob }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  const [showInProgress, setShowInProgress] = useState(false); // State for in-progress jobs
  const [showCompleted, setShowCompleted] = useState(false); // State for completed jobs
  const [allJobs, setAllJobs] = useState([]); // State to store all jobs to show in full-width view
  const fullWidthRef = useRef(null); // Reference for the full-width section
  const topRef = useRef(null); // Reference for scrolling back to top

  const handleViewAll = (jobsToShow, type) => {
    setAllJobs(jobsToShow); // Update the jobs to show

    // Expand the selected section and collapse the other
    if (type === "inProgress") {
      setShowInProgress(true);
      setShowCompleted(false);
    } else if (type === "completed") {
      setShowInProgress(false);
      setShowCompleted(true);
    }

    setTimeout(() => {
      fullWidthRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the full-width section
    }, 100);
  };

  const handleCloseViewAll = () => {
    setShowInProgress(false);
    setShowCompleted(false);
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
          onViewAll={() => handleViewAll(inProgressJobs, "inProgress")} // Handle expanding in-progress jobs
          showAll={showInProgress} // Control visibility for in-progress jobs
        />
        <JobList
          heading={"Completed Jobs"}
          jobs={completedJobs}
          updateJobStatus={updateJobStatus}
          editJob={editJob}
          deleteJob={deleteJob}
          onViewAll={() => handleViewAll(completedJobs, "completed")} // Handle expanding completed jobs
          showAll={showCompleted} // Control visibility for completed jobs
        />
      </section>

      {/* Skip FullWidthJobList rendering */}
    </>
  );
};

export default JobListingSection;