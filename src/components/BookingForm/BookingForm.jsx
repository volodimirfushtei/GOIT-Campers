import s from "./BookingForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import ModalBookingSuccess from "../ModalBookingSuccess/ModalBookingSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

// Українська локаль
registerLocale("uk", uk);

const valSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date().required("Booking date is required"),
  comment: Yup.string(),
});

const BookingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: null, // null для DatePicker
    comment: "",
  };

  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await fetch("http://localhost:5001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setIsSubmitted(true);
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    mutation.mutate(values);
    resetForm();
  };

  return (
    <div className={s.booking_form}>
      <h2 className={s.title}>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you</p>
      <Formik
        initialValues={initialValues}
        validationSchema={valSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <Field
                type="text"
                name="name"
                className={s.input}
                placeholder="Name*"
              />
              <ErrorMessage name="name" component="div" className={s.error} />

              <Field
                type="email"
                name="email"
                className={s.input}
                placeholder="Email*"
              />
              <ErrorMessage name="email" component="div" className={s.error} />
              <div className={s.datepicker_wrapper}>
                <DatePicker
                  selected={values.bookingDate}
                  onChange={(date) => setFieldValue("bookingDate", date)}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Дата бронювання*"
                  className={s.input}
                  minDate={new Date()}
                  locale="uk"
                />
                <FaCalendarAlt className={s.icon} />
              </div>
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={s.error}
              />
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={s.textarea}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={s.error}
              />
            </label>
            <button
              type="submit"
              className={s.button}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className={s.loading_text}>
                  <ClipLoader size={16} color="#fff" />
                  Sending...
                </span>
              ) : (
                "Send"
              )}
            </button>
          </Form>
        )}
      </Formik>
      <ModalBookingSuccess
        isOpen={isSubmitted}
        onClose={() => setIsSubmitted(false)}
        contentLabel="Booking Success"
        shouldCloseOnOverlayClick={true}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default BookingForm;
