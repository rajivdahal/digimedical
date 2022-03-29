import { useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import { httpClient } from "../../../../utils/httpClient";
import { validateCorporateUser } from "./validateUser";
import AddMember from "./addmember";
import SearchMember from "./searchmember";
const CorporateUser = (props) => {
  const [userDetails, setUserDetails] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const activateProfile = (edit) => {
    setIsEdit(edit);
  };

  const getUserDetails = () => {
    httpClient
      .GET("get-user-details", false, true)
      .then((resp) => {
        if (resp.data.status) {
          let details = resp.data.data;
          setUserDetails(details);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          notify.error(err.response.data.message || "Something went wrong");
        }
      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    if (!isEdit) {
      getUserDetails();
    }
  }, [isEdit]);
  const gotoView = () => activateProfile(false);

  //   const formik = useFormik({
  //     enableReinitialize: true,
  //     initialValues: userData,
  //     onSubmit: (values) => {
  //       console.log(values);
  //       createCorporateUSer(values);
  //     },
  //     validate: (values) => {
  //       return validateCorporateUser(values);
  //     },
  //   });

  //   const createCorporateUSer = async (values) => {
  //     try {
  //       setLoading(true);
  //       let resp = await httpClient.POST(
  //         "corporate/members/create",
  //         values,
  //         false,
  //         true
  //       );
  //       if (resp.data.status) {
  //         console.log(resp.data.data);
  //         notify.success(resp.data.message);
  //         props.history.push("/dashboard/corporate/add-members");
  //       }
  //     } catch (err) {
  //       if (err && err.response && err.response.data) {
  //         notify.error(err.response.data.message || "Something went wrong");
  //       }
  //     }
  //     setLoading(false);

  return (
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel newdash_content">
        <div className="content-wrapper">
          <div className="profile-block">
            <div className="profile-selection">
              <div
                className={
                  isEdit == false ? " profile-tab selected-tab" : "profile-tab"
                }
              >
                <span>Search</span>{" "}
              </div>
              <div
                className={
                  isEdit == true ? "profile-tab selected-tab" : "profile-tab"
                }
                onClick={() => activateProfile(true)}
              >
                <span>Add</span>
              </div>
            </div>

            {isEdit == true ? (
              <AddMember></AddMember>
            ) : (
              <SearchMember></SearchMember>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateUser;
