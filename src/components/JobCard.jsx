const JobCard = ({ job }) => {

  return (
    <div className="job-card">
      <p>{job.name}</p>
      <p>{job.number}</p>
      <p>{job.email}</p>
      <p>{job.machineType}</p>
      <p>
        {job.serviceType.repair ? "Repair" : ""}
        {job.serviceType.cleaning ? "Cleaning" : ""}
      </p>
      <p>{job.notes}</p>
    </div>
  );
};
export default JobCard;