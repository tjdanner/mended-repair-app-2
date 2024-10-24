import RepairForm from "./RepairForm";

const FormSection = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <section className="form-section">
      <RepairForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};
export default FormSection;