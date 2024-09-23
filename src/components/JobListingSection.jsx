import JobCard from "./JobCard";
import JobList from "./JobList";

const JobListingSection = ({ jobs }) => {
  const inProgressJobs = jobs.filter(job => !job.completed);
  const completedJobs = jobs.filter(job => job.completed);

  return (
    <section className="job-listing-section">
      <JobList heading={"Jobs in Progress"} jobs={inProgressJobs} />
      <JobList heading={"Completed Jobs"} jobs={completedJobs} />
    </section>
  );
};

export default JobListingSection;
