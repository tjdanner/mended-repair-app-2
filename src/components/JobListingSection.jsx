import JobList from "./JobList";

const JobListingSection = ({ jobs, updateJobStatus, editJob, editingJobId, deleteJob }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  return (
    <section className="job-listing-section">
      <JobList
        heading={"Jobs in Progress"}
        jobs={inProgressJobs}
        updateJobStatus={updateJobStatus}
        editJob={editJob}
        editingJobId={editingJobId}
        deleteJob={deleteJob}
      />
      <JobList
        heading={"Completed Jobs"}
        jobs={completedJobs}
        updateJobStatus={updateJobStatus}
        editJob={editJob}
        editingJobId={editingJobId}
        deleteJob={deleteJob}
      />
    </section>
  );
};

export default JobListingSection;
