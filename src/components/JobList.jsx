import JobCard from "./JobCard";

const JobList = ({ heading }) => {
  return (
    <div className="job-list">
      <h2>{heading}</h2>
      <JobCard
        name={"test"}
        number={"test"}
        email={"test"}
        machineType={"test"}
        serviceType={"test"}
        notes={"test"}
      />
    </div>
  );
};
export default JobList;