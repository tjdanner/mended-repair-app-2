import JobCard from "./JobCard";
import JobList from "./JobList";

const JobListingSection = () => {
  return (
    <section className="job-listing-section">
      <JobList heading={"Jobs in Progress"}>
        <JobCard />
      </JobList>
      <JobList heading={"Completed Jobs"}>
        <JobCard />
      </JobList>
    </section>
  );
};
export default JobListingSection;