import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Banner from "./components/Banner";
import FormSection from "./components/FormSection";
import JobListingSection from "./components/JobListingSection";

const App = () => {

  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    machine_type: "",
    service_type: {
      repair: false,
      cleaning: false
    },
    notes: ""
  });
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select('*');
      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "service_type") {
      setFormData((prevState) => ({
        ...prevState,
        service_type: {
          ...prevState.service_type,
          [value]: checked,
        },
      }));

    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      service_type: formData.service_type,
      completed: editingJob ? editingJob.completed : false,
      last_modified: new Date().toISOString(),
    };

    try {
      if (editingJob) {
        const { error } = await supabase
          .from("jobs")
          .update(jobData)
          .eq('id', editingJob.id);

        if (error) throw error;

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === editingJob.id ? { ...job, ...jobData } : job
          )
        );
        setEditingJob(null);
      } else {
        const { data, error } = await supabase
          .from("jobs")
          .insert([jobData])
          .select(); // Retrieves the inserted job with the auto-generated ID

        if (error) throw error;

        // Use the actual ID returned by Supabase (int8 auto-increment)
        setJobs((prevJobs) => [...prevJobs, data[0]]);
      }

      setFormData({
        name: "",
        number: "",
        email: "",
        machine_type: "",
        service_type: {
          repair: false,
          cleaning: false
        },
        notes: ""
      });
    } catch (error) {
      console.error("Failed to save job:", error);
    }
  };


  const updateJobStatus = async (jobId, currentStatus) => {
    const updatedStatus = !currentStatus;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({ completed: updatedStatus })
        .eq('id', jobId);

      if (error) {
        throw new Error("Failed to update job status: " + error.message);
      }

      console.log(`Job ${jobId} marked as ${updatedStatus ? "completed" : "in progress"} in Supabase.`);

      // Update local state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, completed: updatedStatus } : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const editJob = (job) => {
    const { name, number, email, machine_type, service_type, notes } = job;

    const formTop = document.querySelector(".form-section");

    setFormData({
      name: name || "",
      number: number || "",
      email: email || "",
      machine_type: machine_type || "",
      service_type: {
        repair: service_type?.repair || false,
        cleaning: service_type?.cleaning || false,
      },
      notes: notes || "",
    });

    setEditingJob(job);

    formTop.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteJob = async (id) => {
    try {
      console.log("Deleting job with ID:", id);  // Log the ID you're trying to delete

      const { data, error } = await supabase
        .from("jobs")
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error("Failed to delete job: " + error.message);
      }

      // Check if data is null or the job was not found
      if (!data || data.length === 0) {
        throw new Error("No rows deleted. Please check the job ID.");
      }

      console.log(`Job ${id} deleted from Supabase.`);

      // Remove from the local state
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