import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createUser,
  fetchUserById,
  IUserPayload,
  resetCreateSuccess,
  IUser,
  updateUser,
  resetFetchUser,
  resetDeleteSuccess,
  deleteUser,
} from "../redux/user/user.slice";
import { Bounce, toast } from "react-toastify";

const ModalComponent = ({ option, isShow, onClose, id }: any) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const disabledEdit = option === "delete";
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user?.data);
  const isFetchingUser = useAppSelector((state) => state.user?.user?.isLoading);

  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setFetchError(null);
      dispatch(fetchUserById(id))
        .unwrap()
        .catch((error) => {
          setFetchError("Failed to fetch user data. Please try again.");
        });
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  const closeModal =()=>{
    onClose();
    reset();
  }

  const handleClose = () => {
    onClose();
    reset();
    if (option === "create") {
      dispatch(resetCreateSuccess());
      toast.success("Create successfully");
    }
    if (option === "edit") {
      dispatch(resetFetchUser());
      toast.success("Update successfully");
    }
    if (option === "delete") {
      dispatch(resetDeleteSuccess());
      toast.success("Delete successfully");
    }
  };

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
    if (option === "create") {
      dispatch(createUser(data));
    }
    if (option === "edit") {
      dispatch(updateUser(data));
    }
    if (option === "delete") {
      dispatch(deleteUser(data));
    }
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isFetchingUser ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : fetchError ? (
          <Alert variant="danger">{fetchError}</Alert>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                disabled={disabledEdit}
                {...register("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>User Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Age"
                disabled={disabledEdit}
                {...register("age")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                disabled={disabledEdit}
                {...register("email")}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isFetchingUser}>
                {isFetchingUser ? <Spinner size="sm" /> : action}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
