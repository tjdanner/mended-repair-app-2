import Form from "./Form";

const FormSection = ({ onAddJob }) => {
  return (
    <section className="form-section">
      <Form onAddJob={onAddJob} />
    </section>
  );
};
export default FormSection;