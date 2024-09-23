import Form from "./Form";

const FormSection = ({ addJob }) => {
  return (
    <section className="form-section">
      <Form addJob={addJob} />
    </section>
  );
};
export default FormSection;