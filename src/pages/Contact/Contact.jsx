import ContactForm from "../../components/ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-pink-200 py-12">
      <div className="px-4 py-6 max-w-xl mx-auto flex flex-col items-center text-center bg-gray-100 rounded-lg shadow-lg mt-20">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact Us</h1>
        <p className="w-80 text-gray-600 text-base mb-6">
          Have questions, feedback, or need support? Fill out the form below and
          we’ll get back to you shortly.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
