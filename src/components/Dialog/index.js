import React, { useEffect, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";

const Dialog = ({
  children,
  size,
  showModal,
  onSubmit,
  setShowModal,
  nameBtnSuccess = "Update",
}) => {
  return (
    <Modal
      size={size}
      className="modal-primary"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      {/* <Modal.Header className="justify-content-center">
        <div className="modal-profile">
          <i className="nc-icon nc-bulb-63"></i>
        </div>
      </Modal.Header> */}
      <Modal.Body className="text-center">{children}</Modal.Body>
      <div className="modal-footer">
        <Button
          className="btn-simple"
          type="button"
          variant="link"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
        <Button
          className="btn-simple btn-primary"
          type="button"
          variant="link"
          onClick={() => {
            setShowModal(false);
            onSubmit();
          }}
        >
          {nameBtnSuccess}
        </Button>
      </div>
    </Modal>
  );
};
export default Dialog;
