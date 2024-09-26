import JobList from "./JobList";

const JobListingSection = ({ jobs, updateJobStatus, editJob, handleEditJob, deleteJob }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  return (
    <section className="job-listing-section">
      <JobList
        heading={"Jobs in Progress"}
        jobs={inProgressJobs}
        updateJobStatus={updateJobStatus}
        editJob={editJob}
        deleteJob={deleteJob}
      />
      <JobList
        heading={"Completed Jobs"}
        jobs={completedJobs}
        updateJobStatus={updateJobStatus}
        editJob={editJob}
        deleteJob={deleteJob}
      />
    </section>
  );
};

export default JobListingSection;
