import React, { useEffect } from "react";
import Modal from "react-modal";
import '../../styles/sass/components/_modal.scss'

/**
 * ModalApp component for displaying a modal.
 *
 * @component
 *
 * @param {{modalIsOpen:boolean, setModalIsOpen:Function}} props The properties of component
 * @returns {JSX.Element} - The ModalApp component.
 */
export default function ModalApp({ modalIsOpen, setModalIsOpen }) {

  useEffect(() => { }, [modalIsOpen]);
  
 /**
   * Custom styles for the modal.
   *
   * @type {Object}
   */
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
    textAlign: "center",
    border: "5px solid #C4D680",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "50px",
  },
};
  return (
    <Modal
      data-testid="modal-id"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
      contentLabel="Modal"
      className="modal-content"
    >
      <button
        className="btn custom-btn close-modal-btn d-flex"
        onClick={() => setModalIsOpen(false)}
      >
        {" "}
        X{" "}
      </button>
      <h2 className="title-modal" ref={(_subtitle) => _subtitle}>Employee Created !</h2>
    </Modal>
  );
}
