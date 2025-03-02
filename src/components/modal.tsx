import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createUser,
  fetchUserById,
  IUserPayload,
  resetCreateSuccess
} from "../redux/user/user.slice";
import { Bounce, toast } from "react-toastify";


const ModalComponent = ({ option, isShow, onClose, id }: any) => {
  const { register, handleSubmit, reset, getValues, control, setValue } =
    useForm();
  const disabledEdit = option === "delete" ? true : false;
  const [userById, setUserById] = useState<IUserPayload>({})

  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess)
  const isLoading = useAppSelector((state) => state.user.isLoading)

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
      if (user) {
        setUserById(user)
      }
    }
  }, [id]);

  useEffect(() => {
    if (userById) {
      reset({
        ...userById
      })
    }
  }, [userById])

  const handleClose = () => {
    onClose()
    reset()
  }

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
    if (option === 'create') {
      dispatch(createUser(data))
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      handleClose()
      dispatch(resetCreateSuccess())
      toast.success('Create successfully');
    }
  },[isCreateSuccess])

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
