const JobCard = ({ job }) => {
  const { name, number, email, machineType, serviceType, notes } = job;

  return (
    <div className="job-card">
      <p>{name}</p>
      <p>{number}</p>
      <p>{email}</p>
      <p>{machineType}</p>
      <p>
        {serviceType.repair ? "Repair" : ""}
        {serviceType.cleaning ? "Cleaning" : ""}
      </p>
      <p>{notes}</p>
    </div>
  );
};
export default JobCard;