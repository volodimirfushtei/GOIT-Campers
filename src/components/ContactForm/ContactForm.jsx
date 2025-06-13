import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().min(10, "At least 10 characters").required("Required"),
});

const ContactForm = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await fetch("http://localhost:5001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Error submitting form");

      setStatus("✅ Message sent successfully!");
      resetForm();
    } catch (error) {
      console.log(error);
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col p-1 g-2">
          <div className="mb-2">
            <Field
              name="name"
              placeholder="Your Name"
              className="w-80 mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div className="mb-2">
            <Field
              name="email"
              type="email"
              placeholder="Your Email"
              className="w-80 mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div className="mb-3">
            <Field
              name="message"
              as="textarea"
              placeholder="Your Message"
              className="w-80 mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="message"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 w-80 text-white px-6  py-2 rounded hover:bg-red-700 transition cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>

          {status && <p>{status}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
