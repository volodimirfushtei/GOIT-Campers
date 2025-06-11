import s from "./ModalBookingSuccess.module.css";
import Modal from "react-modal";

const ModalBookingSuccess = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      isLoading={false} // Optional: if you want to show a loading state
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true} // Optional: close modal on overlay click
      contentLabel="Booking Success"
      closeTimeoutMS={200} // Optional: for smoother closing animation
    >
      <div className={s.modal_wrapper}>
        <div className={s.modal_content}>
          <h2 className={s.modal_title}>Booking Successful!</h2>
          <p className={s.modal_message}>
            Your booking has been successfully created.
          </p>
          <button className={s.modal_button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBookingSuccess;
