// src/components/RepairForm.jsx
const RepairForm = ({ formData, handleInputChange, handleSubmit, handleImageUpload }) => {
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
        <label htmlFor="machine_type">Machine Type</label>
        <input
          type="text"
          id="machine_type"
          name="machine_type"
          value={formData.machine_type}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="serial_num">Serial Number</label>
        <input
          type="text"
          id="serial_num"
          name="serial_num"
          value={formData.serial_num}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Service Type:</label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="repair"
            name="service_type"
            value="repair"
            checked={formData.service_type.repair}
            onChange={handleInputChange}
          />
          <label htmlFor="repair">Repair</label>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="cleaning"
            name="service_type"
            value="cleaning"
            checked={formData.service_type.cleaning}
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

      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageUpload} // Call handleImageUpload
        />
      </div>

      <button className="btn" id="submit-btn" type="submit">Submit</button>
    </form>
  );
};
export default RepairForm;