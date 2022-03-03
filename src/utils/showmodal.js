import { Modal, Button } from 'react-bootstrap';
import "./showmodal.css"
export const Showmodal = (props) => {
    return (
        <>
            <Modal show={props.showModal} onHide={props.handlecancel}>
                <Modal.Header >
                    <Modal.Title><b>Upcomming Appointment</b></Modal.Title>
                </Modal.Header>
                <Modal.Body >Do you really want to delete the appointment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={props.handlecancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={props.deleteindeed}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


