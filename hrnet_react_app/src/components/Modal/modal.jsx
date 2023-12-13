import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
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
  function closeModal() {
    setModalIsOpen(false);
  }
  useEffect(() => {}, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <button className="btn custom-btn close-modal-btn d-flex" onClick={closeModal}>
        {" "}
        X{" "}
      </button>
      <h2 ref={(_subtitle) => (_subtitle)}>Employee Created !</h2>
    </Modal>
  );
}
