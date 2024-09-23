import JobCard from "./JobCard";

const JobList = ({ heading, jobs, deleteJob }) => {
  return (
    <div className="job-list">
      <h2>{heading}</h2>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <JobCard key={job.id} job={job} deleteJob={deleteJob} />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;