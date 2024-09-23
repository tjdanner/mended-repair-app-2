import JobList from "./JobList";

const JobListingSection = ({ jobs, updateJobStatus, deleteJob }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  return (
    <section className="job-listing-section">
      <JobList heading={"Jobs in Progress"} jobs={inProgressJobs} updateJobStatus={updateJobStatus} deleteJob={deleteJob} />
      <JobList heading={"Completed Jobs"} jobs={completedJobs} updateJobStatus={updateJobStatus} deleteJob={deleteJob} />
    </section>
  );
};

export default JobListingSection;
