import Form from "./Form";

const FormSection = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <section className="form-section">
      <Form
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};
export default FormSection;