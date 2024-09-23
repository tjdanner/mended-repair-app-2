const JobCard = ({ job, updateJobStatus, deleteJob }) => {
  const serviceTypes = [];
  if (job.serviceType.repair) serviceTypes.push("Repair");
  if (job.serviceType.cleaning) serviceTypes.push("Cleaning");

  return (
    <div className="job-card">
      <p>{job.name || "No name provided"}</p>
      <p>{job.number || "No phone number provided"}</p>
      <p>{job.email || "No email provided"}</p>
      <p>{job.machineType || "No machine type specified"}</p>
      <p>{serviceTypes.length > 0 ? serviceTypes.join(", ") : "No service type specified"}</p>
      <p>{job.notes || "No additional notes."}</p>
      <button onClick={() => updateJobStatus(job.id, job.completed)}>
        {job.completed ? "Reopen Job" : "Mark as Complete"}
      </button>
      <button onClick={() => deleteJob(job.id)}>Delete</button>
    </div>
  );
};

export default JobCard;
