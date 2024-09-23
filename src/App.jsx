import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import FormSection from "./components/FormSection";
import JobListingSection from "./components/JobListingSection";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = async (newJob) => {
    try {
      const response = await fetch("http://localhost:5000/jobs", {
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
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
      <JobListingSection jobs={jobs} />
    </>
  );
};
export default App;