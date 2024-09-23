import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import FormSection from "./components/FormSection";
import JobListingSection from "./components/JobListingSection";

const App = () => {
  const jobApiUrl = "http://localhost:5000/jobs";

  const [jobs, setJobs] = useState([]);

  const addJob = async (newJob) => {
    try {
      const response = await fetch(jobApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newJob),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobs((prevJobs) => [...prevJobs, data]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const updateJobStatus = async (jobId, completedStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      console.log(`Job ${jobId} marked as completed on the server.`);

      const updatedJob = await response.json();

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === updatedJob.id ? updatedJob : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`${jobApiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(jobApiUrl);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Banner />
      <FormSection addJob={addJob} />
      <JobListingSection jobs={jobs} updateJobStatus={updateJobStatus} deleteJob={deleteJob} />
    </>
  );
};
export default App;