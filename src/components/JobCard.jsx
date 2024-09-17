const JobCard = ({ name, number, email, machineType, serviceType, notes }) => {
  return (
    <div className="job-card">
      <p>{name}</p>
      <p>{number}</p>
      <p>{email}</p>
      <p>{machineType}</p>
      <p>{serviceType}</p>
      <p>{notes}</p>
    </div>
  );
};
export default JobCard;