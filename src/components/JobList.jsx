import { useState, useEffect } from "react";
import JobCard from "./JobCard";

const JobList = ({ heading }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("You done goofed fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="job-list">
      <h2>{heading}</h2>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
export default JobList;