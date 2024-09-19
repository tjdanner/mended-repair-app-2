import { useState } from "react";

const Form = ({ onAddJob }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    machineType: "",
    serviceType: {
      repair: false,
      cleaning: false
    },
    notes: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        serviceType: {
          ...prevState.serviceType,
          [value]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form submission was successful:", data);

    } catch (error) {
      console.error("You done goofed:", error);
    }

    setFormData({
      name: "",
      number: "",
      email: "",
      machineType: "",
      serviceType: {
        repair: false,
        cleaning: false
      },
      notes: ""
    });

  };

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