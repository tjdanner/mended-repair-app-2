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
  const [editingJob, setEditingJob] = useState(null);

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

    if (editingJob) {
      try {
        const updatedJobData = {
          ...formData,
          completed: editingJob.completed,
        };

        await fetch(`${jobApiUrl}/${editingJob.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedJobData),
        });

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === editingJob.id
              ? { ...job, ...updatedJobData }
              : job
          )
        );

        setEditingJob(null);
      } catch (error) {
        console.error("Failed to update job:", error);
      }
    } else {
      const newJob = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        completed: false,
      };

      try {
        await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newJob),
        });

        setJobs((prevJobs) => [...prevJobs, newJob]);
      } catch (error) {
        console.error("Failed to add job:", error);
      }
    }

    setFormData({
      name: "",
      number: "",
      email: "",
      machineType: "",
      serviceType: { repair: false, cleaning: false },
      notes: "",
    });
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

  const editJob = (job) => {
    const formTop = document.querySelector(".form-section");

    setFormData({
      name: job.name,
      number: job.number,
      email: job.email,
      machineType: job.machineType,
      serviceType: job.serviceType,
      notes: job.notes,
    });

    setEditingJob(job);

    formTop.scrollIntoView({ behavior: 'smooth' });
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
        editJob={editJob}
        deleteJob={deleteJob}
      />
    </>
  );
};
export default App;