import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../redux/theme/theme.slice';
import { useEffect } from 'react';

const NavbarHeader = () => {

    const theme = useAppSelector((state) => state.theme.theme)
    const dispatch = useDispatch()

    const handleChangeTheme = () => {
        dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            body.setAttribute('data-bs-theme', theme)
        }
    }, [theme])

    return (
        <Navbar className="bg-body-tertiary" data-bs-theme={theme} >
            <Container>
                <Navbar.Brand href="#home">Redux Project</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Form>
                        <Form.Check
                            defaultChecked={theme === 'light' ? false : true}
                            onClick={handleChangeTheme}
                            type="switch"
                            id="custom-switch"
                            label={theme === 'light' ? (<Navbar.Text data-bs-theme={theme}>
                                Dark Mode
                            </Navbar.Text>) : (<Navbar.Text data-bs-theme={theme}>
                                Light Mode
                            </Navbar.Text>)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader
