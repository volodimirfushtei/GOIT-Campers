import ContactForm from "../../components/ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className="px-4 py-10 max-w-2xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h1>
      <p className="w-80 text-gray-600 text-base mb-6">
        Have questions, feedback, or need support? Fill out the form below and
        we’ll get back to you shortly.
      </p>
      <ContactForm />
    </div>
  );
};

export default Contact;
