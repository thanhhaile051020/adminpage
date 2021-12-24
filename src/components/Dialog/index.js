import React, { useEffect, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";

const Dialog = (props) => {
  return (
    <Modal
      size={props.size}
      className="modal-primary"
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
    >
      {/* <Modal.Header className="justify-content-center">
        <div className="modal-profile">
          <i className="nc-icon nc-bulb-63"></i>
        </div>
      </Modal.Header> */}
      <Modal.Body className="text-center">{props.children}</Modal.Body>
      <div className="modal-footer">
        <Button
          className="btn-simple"
          type="button"
          variant="link"
          onClick={() => props.setShowModal(false)}
        >
          Close
        </Button>
        <Button
          className="btn-simple btn-primary"
          type="button"
          variant="link"
          onClick={() => {
            props.setShowModal(false);
            props.onSubmit();
          }}
        >
          Update
        </Button>
      </div>
    </Modal>
  );
};
export default Dialog;
