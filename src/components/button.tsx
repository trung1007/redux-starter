import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ButtonOption = ({ option }: any) => {
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState('')
    const [isShow, setIsShow] = useState(false)

    const handleOnClick = () => {
        if (option === 'create') {
            setIsShow(true)
        }
    }
    const handleOnCreate = ()=>{
        handleClose()
    }
    const handleClose = () => {
        setIsShow(false)
    }

    useEffect(() => {
        switch (option) {
            case 'create':
                setTitle('Add New')
                setTheme('primary')
                break;
            case 'edit':
                setTitle('Edit')
                setTheme('warning')
                break;
            case 'delete':
                setTitle('Delete')
                setTheme('danger')
                break;
            default:
                break;
        }
    })

    return (
        <>
            <Button style={{ height: 40 }} variant={theme} onClick={handleOnClick}>{title}</Button>
            <Modal show={isShow} onHide={handleClose}>
                <Form onSubmit={handleOnCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add A New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="User Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>User Age</Form.Label>
                            <Form.Control type="number" placeholder="Age" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleOnCreate}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ButtonOption