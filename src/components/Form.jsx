const Form = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="repair-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="number">Phone Number</label>
        <input
          type="tel"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="machineType">Machine Type</label>
        <select
          id="machineType"
          name="machineType"
          value={formData.machineType}
          onChange={handleInputChange}
        >
          <option value=""></option>
          <option value="M7">M7</option>
          <option value="Skyline">Skyline</option>
        </select>
      </div>

      <div className="form-group">
        <label>Service Type:</label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="repair"
            name="serviceType"
            value="repair"
            checked={formData.serviceType.repair}
            onChange={handleInputChange}
          />
          <label htmlFor="repair">Repair</label>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="cleaning"
            name="serviceType"
            value="cleaning"
            checked={formData.serviceType.cleaning}
            onChange={handleInputChange}
          />
          <label htmlFor="cleaning">Cleaning</label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
export default Form;