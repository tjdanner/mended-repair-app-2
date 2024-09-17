const Form = () => {
  return (
    <form className="repair-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>

      <div className="form-group">
        <label htmlFor="number">Phone Number</label>
        <input type="tel" id="number" name="number" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>

      <div className="form-group">
        <label htmlFor="machineType">Machine Type</label>
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
          <label htmlFor="repair">Repair</label>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="cleaning" name="serviceType" value="cleaning" />
          <label htmlFor="cleaning">Cleaning</label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes"></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
export default Form;