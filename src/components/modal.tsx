import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ModalComponent = ({ option, isShow, onClose, id }: any) => {
  const { register, handleSubmit, reset, getValues } = useForm();



  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");



  useEffect(() => {
    switch (option) {
      case "create":
        setTitle("Add A New User");
        setAction("Create");
        break;
      case "edit":
        setTitle("Update A User");
        setAction("Edit");
        break;
      case "delete":
        setTitle("Delete a User");
        setAction("Delete");
        break;
      default:
        break;
    }
  }, [option]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data); // Log dữ liệu form ra console
  };

  return (
    <Modal show={isShow} onHide={onClose}>
       <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Name"
              {...register("name")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="age">
            <Form.Label>User Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              {...register("age")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {action}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
