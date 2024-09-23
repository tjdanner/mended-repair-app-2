import JobList from "./JobList";

const JobListingSection = ({ jobs, deleteJob }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  return (
    <section className="job-listing-section">
      <JobList heading={"Jobs in Progress"} jobs={inProgressJobs} deleteJob={deleteJob} />
      <JobList heading={"Completed Jobs"} jobs={completedJobs} deleteJob={deleteJob} />
    </section>
  );
};

export default JobListingSection;
