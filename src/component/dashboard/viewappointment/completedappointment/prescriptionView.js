import { Image } from "react-bootstrap"
import DigiMedicalLogo from "../../../../assets/logo.png"
const PrescriptionView = (props) => {
    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                    <div>
                        <Image src={DigiMedicalLogo}/>
                    </div>
                <Modal.Body >Do you really want to deactivate this labtest ?</Modal.Body>
                
            </Modal>
        </div>
    )
}

export default PrescriptionView