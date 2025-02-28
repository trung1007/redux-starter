import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser, getUserById, IUserPayload } from "../redux/user/user.slice";

interface User {
  name: string,
  age: number,
  email: string
}

const ModalComponent = ({ option, isShow, onClose, id }: any) => {
  const { register, handleSubmit, reset, getValues, control, setValue } = useForm();
  const disabledEdit = option === 'delete'? true : false

  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");

  const dispatch = useAppDispatch()
  const user = useAppSelector((state)=>{state.user.listUsers})

  const getUserById = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`)
      return res.json()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      getUserById(id).then((user: User) => {
        setValue('name', user?.name)
        setValue('age', user?.age)
        setValue('email', user?.email)
      })

      // dispatch(getUserById(id))
    }
  }, [id])



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
    dispatch(createUser(data))
  };

  return (
    <Modal show={isShow} onHide={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name" >
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
