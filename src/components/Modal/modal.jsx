import React, { useEffect } from "react";
import Modal from "react-modal";
import '../../styles/sass/components/_modal.scss'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    zIndex: "10",
    textAlign : "center",
    border: "5px solid #C4D680",
    backgroundColor: "white",
    borderRadius: "5px",
    padding:"50px"
  },
};

export default function ModalApp({ modalIsOpen, setModalIsOpen }) {
  useEffect(() => {}, [modalIsOpen]);

  return (
    <Modal
      data-testid="modal-id"
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
