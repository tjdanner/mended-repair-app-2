// src/components/FormSection.jsx
import RepairForm from "./RepairForm";

const FormSection = ({ formData, handleInputChange, handleSubmit, handleImageUpload }) => {
  return (
    <section className="form-section">
      <RepairForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload} // Pass handleImageUpload
      />
    </section>
  );
};
export default FormSection;