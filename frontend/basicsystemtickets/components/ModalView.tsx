import type { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

export default function ModalView({ show, onClose, title, content }: Props) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
