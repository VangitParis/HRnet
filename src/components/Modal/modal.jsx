import React, { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ModalApp({ modalIsOpen, setModalIsOpen }) {
  useEffect(() => {}, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
      contentLabel="Modal"
    >
      <button
        className="btn custom-btn close-modal-btn d-flex"
        onClick={() => setModalIsOpen(false)}
      >
        {" "}
        X{" "}
      </button>
      <h2 ref={(_subtitle) => _subtitle}>Employee Created !</h2>
    </Modal>
  );
}
