import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';

const ButtonOption = ({ option }: any) => {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [isShow, setIsShow] = useState(false);

    const { register, handleSubmit, reset, getValues } = useForm();

    const handleOnClick = () => {
        if (option === 'create') {
            setIsShow(true);
        }
    };

    const handleOnCreate = () => {
        const formData = getValues(); // Lấy toàn bộ dữ liệu từ form
        console.log('User Data:', formData);
        handleClose();
    };

    const handleClose = () => {
        setIsShow(false);
        reset(); // Reset form khi đóng modal
    };

    useEffect(() => {
        switch (option) {
            case 'create':
                setTitle('Add New');
                setTheme('primary');
                break;
            case 'edit':
                setTitle('Edit');
                setTheme('warning');
                break;
            case 'delete':
                setTitle('Delete');
                setTheme('danger');
                break;
            default:
                break;
        }
    }, [option]);

    return (
        <>
            <Button style={{ height: 40 }} variant={theme} onClick={handleOnClick}>
                {title}
            </Button>
            <Modal show={isShow} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add A New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="User Name" {...register('name')} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>User Age</Form.Label>
                            <Form.Control type="number" placeholder="Age" {...register('age')} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" {...register('email')} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="button" onClick={handleOnCreate}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ButtonOption;
