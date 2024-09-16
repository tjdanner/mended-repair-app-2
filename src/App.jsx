const App = () => {
  return (
    <>
      <section className="banner-section">
        <img className="mended-logo" src="src\assets\Mended-Hearts-LOGO-full®.png" alt="Mended Hearts Logo." />
        <div className="title-container">
          <h1>Repair Tracking App</h1>
          <p>Enter in customer credentials to create a service ticket.</p>
        </div>
      </section>

      <section className="form-section">
        <form className="repair-form">
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className="form-group">
            <label for="number">Phone Number</label>
            <input type="tel" id="number" name="number" />
          </div>

          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>

          <div className="form-group">
            <label for="machineType">Machine Type</label>
            <select id="machineType" name="machineType">
              <option value=""></option>
              <option value="Machine 1">M7</option>
              <option value="Machine 2">Skyline</option>
            </select>
          </div>

          <div className="form-group">
            <label>Service Type:</label>
            <div className="checkbox-container">
              <input type="checkbox" id="repair" name="serviceType" value="repair" />
              <label for="repair">Repair</label>
            </div>
            <div className="checkbox-container">
              <input type="checkbox" id="cleaning" name="serviceType" value="cleaning" />
              <label for="cleaning">Cleaning</label>
            </div>
          </div>

          <div className="form-group">
            <label for="notes">Notes:</label>
            <textarea id="notes" name="notes"></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="job-listing-section">
        <div id="jobsInProgress" className="job-list">
          <h2>Jobs In Progress</h2>
          <div className="job-card">
            <p>Name</p>
            <p>Number</p>
            <p>Email</p>
            <p>Machine Type</p>
            <p>Service Type</p>
            <p>Notes</p>
          </div>
        </div>
        <div id="completedJobs" className="job-list">
          <h2>Completed Jobs</h2>
          <div className="job-card">
            <p>Name</p>
            <p>Number</p>
            <p>Email</p>
            <p>Machine Type</p>
            <p>Service Type</p>
            <p>Notes</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default App;