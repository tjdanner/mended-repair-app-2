import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import FormSection from "./components/FormSection";
import JobListingSection from "./components/JobListingSection";

const App = () => {
  const jobApiUrl = "http://localhost:5000/jobs";

  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    machineType: "",
    serviceType: {
      repair: false,
      cleaning: false
    },
    notes: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        serviceType: {
          ...prevState.serviceType,
          [value]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      completed: false,
    };

    try {
      await addJob(newJob);

      setFormData({
        name: "",
        number: "",
        email: "",
        machineType: "",
        serviceType: {
          repair: false,
          cleaning: false,
        },
        notes: "",
      });
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  const updateJobStatus = async (jobId, currentStatus) => {
    const updatedStatus = !currentStatus;

    try {
      const response = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      const updatedJob = await response.json();

      console.log(`Job ${jobId} marked as ${updatedStatus ? "completed" : "in progress"} on the server.`);

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



  return (
    <>
      <Banner />
      <FormSection
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <JobListingSection
        jobs={jobs}
        updateJobStatus={updateJobStatus}
        deleteJob={deleteJob}
      />
    </>
  );
};
export default App;