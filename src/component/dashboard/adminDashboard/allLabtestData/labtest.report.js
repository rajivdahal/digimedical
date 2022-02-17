import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import "./labreport.css"
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const LabtestReport = (props) => {
    const imageSelectRef = useRef();
    const [uploadedImg, setUploadImg] = useState("");
    const [selectedImage, setImage] = useState("");
    const [allImageId, setAllImageId] = useState([]);
    const [selectedImgName, setImgName] = useState("");
    const [labReportImg, setLabReportImg] = useState([]);
    // const [imageArr,setImgArr] = useState([]);

    const handleAddImage = () => {
        imageSelectRef.current.click();
    };

    const getAllImgID = async () => {
        let id = props.location.state.labtestbookingid;
        try {

            let resp = await httpClient.GET("lab-report/get-all/" + id, false, true);
            if (resp.data.status) {
                let imgId = resp.data.data;
                setAllImageId(imgId)
            }

        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    }

    useEffect(() => {
        getAllImgID();
    }, [])

    const handleChangeImage = (e) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        setLabReportImg(files)
        reader.onloadend = () => {
            setImage(reader.result.toString());
            setImgName(files.name);
        };
        reader.readAsDataURL(files);
    };

    const removeImage = () => {
        setImage(null);
        setImgName(null);
        setLabReportImg(null);
    };

    const uploadImage = async () => {
        try {
            let id = props.location.state.labtestbookingid;
            let formData = new FormData();

            if (labReportImg) {
                formData.append("image", labReportImg);
            }
            formData.append("labTestBookingId", id);


            let resp = await httpClient.POST("lab-report/create", formData, false, true, "formdata");
            if (resp.data.status) {
                notify.success(resp.data.message)
                setImage(null);
                setImgName(null);
                getAllImgID();
            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }

    }

    return (
        <div>
            <Container>
                {props.location && props.location.state ?
                    <>
                        <div> Patient Name : {props.location.state.patientname} - {props.location.state.age}  </div>
                        <div>Gender : {props.location.state.gender === 0 ? "Male" : "Female"} </div>
                        <div>Email : {props.location.state.email} </div>
                        <div>Contact Number :{props.location.state.mobilenumber} </div>
                        <div>Labtest Name : {props.location.state.labtestname} </div>
                        <div>Labtest Category : {props.location.state.labtestcategoryname} </div>
                        <div>Category Description : {props.location.state.labcategorydiscription} </div>
                        <div>Price : {props.location.state.priceString} </div>

                        <Row>
                            <Col md={5}>
                                <div>Upload Lab Report</div>
                                <br></br>
                                <button className="browse-btn" onClick={handleAddImage}>
                                    Browse
                                </button>
                                <input
                                    onChange={(e) => handleChangeImage(e)}
                                    type="file" multiple="multiple"
                                    name="labReportImg"
                                    style={{ display: "none" }}
                                    ref={imageSelectRef}
                                    accept="image/png, image/jpg, image/jpeg"
                                ></input>
                            </Col>

                            <Col md={5}>
                                <Image
                                    src={selectedImage}
                                    fluid
                                    className="image ml-3"
                                ></Image>
                                {/* <div>{selectedImgName}</div> */}
                            </Col>
                            {selectedImage ?
                                <Col md={2}>
                                    <span style={{ color: "red",cursor : "pointer " }} onClick={removeImage}>
                                        x
                                    </span>
                                </Col>
                                :
                                <></>
                            }

                        </Row>
                        <div className="textAlign-right">
                            <button className="upload-btn" onClick={uploadImage}>Upload</button>
                        </div>
                    </>
                    :
                    <></>
                }

                <Row>
                    {allImageId.map((item, index) => {
                        return <Col md={2} sm={4}>
                            <Image src={REACT_APP_BASE_URL + "lab-report/download/" + item.labtestreportid}
                                key={index} fluid className="image "
                                onClick={() => window.open(REACT_APP_BASE_URL + "lab-report/download/" + item.labtestreportid)}>
                            </Image>
                        </Col>
                    })}

                </Row>
            </Container>
        </div>
    )
}

export default LabtestReport;