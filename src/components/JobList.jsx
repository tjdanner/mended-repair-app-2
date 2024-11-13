import React, { useState } from 'react';
import JobCard from "./JobCard";

const JobList = ({ heading, jobs, updateJobStatus, editJob, deleteJob, jobRefs }) => {
  const [showAllState, setShowAllState] = useState(false); // State to track showing all jobs
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search input
  const [sortOption, setSortOption] = useState(''); // State to track the selected sort option

  const toggleShowAll = () => {
    setShowAllState(!showAllState); // Toggle the state
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Update search query state
  };

  // Filter jobs based on search input (job name, email, or number)
  const filteredJobs = jobs.filter((job) => {
    return (
      (job.name && job.name.toLowerCase().includes(searchQuery)) ||
      (job.email && job.email.toLowerCase().includes(searchQuery)) ||
      (job.number && String(job.number).includes(searchQuery))
    );
  });

  // Sorting function for jobs based on the selected sortOption
  const sortJobs = (jobs) => {
    return jobs.sort((a, b) => {
      if (sortOption === "creation-asc") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortOption === "creation-desc") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOption === "modified-asc") {
        return new Date(a.last_modified) - new Date(b.last_modified);
      } else if (sortOption === "modified-desc") {
        return new Date(b.last_modified) - new Date(a.last_modified);
      }
      return 0; // Default no sorting
    });
  };

  // Handle change in sorting option
  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update the sortOption state
  };

  // Only show the first 3 jobs initially, if not showing all
  const displayedJobs = sortJobs(showAllState ? filteredJobs : filteredJobs.slice(0, 3));

  return (
    <div className="job-list">
      <div className="heading-btn-container">
        <h2>{heading} ({jobs.length})</h2>
        <button className="btn" onClick={toggleShowAll}>
          {showAllState ? "Show Less" : "View All"}
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          className="search-bar"
          id="searchInput"
          type="text"
          placeholder="Search by name, email, or number..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="sort-container">
          <select id="sortSelect" value={sortOption} onChange={handleSortChange} placeholder="SORT">
            <option value="">Sort by</option>
            <option value="creation-asc">Creation Date (Ascending)</option>
            <option value="creation-desc">Creation Date (Descending)</option>
            <option value="modified-asc">Last Modified (Ascending)</option>
            <option value="modified-desc">Last Modified (Descending)</option>
          </select>
        </div>
      </div>

      {/* Display the appropriate jobs based on the search and sort options */}
      {displayedJobs.length > 0 ? (
        displayedJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            updateJobStatus={updateJobStatus}
            editJob={editJob}
            deleteJob={deleteJob}
            ref={(el) => (jobRefs.current[job.id] = el)}
          />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;