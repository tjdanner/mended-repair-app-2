const JobCard = ({ job, updateJobStatus, editJob, deleteJob }) => {
  // Helper function to format the date
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate} at ${formattedTime}`;
  };

  const serviceTypes = [];

  // Check if service_type exists before accessing its properties
  if (job.service_type) {
    if (job.service_type.repair) serviceTypes.push("Repair");
    if (job.service_type.cleaning) serviceTypes.push("Cleaning");
  }

  return (
    <div className="job-card">
      <p>Date Opened: {formatDateString(job.created_at)}</p>
      <p>Last Modified: {formatDateString(job.last_modified)}</p>
      <p>{job.name || "No name provided"}</p>
      <p>{job.number || "No phone number provided"}</p>
      <p>{job.email || "No email provided"}</p>
      <p>{job.machine_type || "No machine type specified"}</p>
      <p>
        {serviceTypes.length > 0
          ? serviceTypes.join(", ")
          : "No service type specified"}
      </p>
      <p>{job.notes || "No additional notes."}</p>
      <button onClick={() => updateJobStatus(job.id, job.completed)}>
        {job.completed ? "Reopen Job" : "Mark as Complete"}
      </button>
      <button onClick={() => editJob(job)}>Edit</button>
      <button onClick={() => deleteJob(job.id)}>Delete</button>
    </div>
  );
};

export default JobCard;
