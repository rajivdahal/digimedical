import "./Viewappointment.component.css";
import { TimeandDate } from "../../../services/timeanddate";
import { Upcomingappointment } from "./upcomingappointment/upcomingappointment.component";
import { useState } from "react";
import { Cancelledappointment } from "./cancelledappointment/Cancelledappointment.component";
import { Completedappointment } from "./completedappointment/completedappointment.component";
export const Viewappointment = (props) => {
  console.log("props in viewappointment is", props);
  const fromdoctorcomponent = props.fromdoctorcomponent
    ? props.fromdoctorcomponent
    : null;
  const fromcorporatecomponent = props.fromcorporatecomponent
    ? props.fromcorporatecomponent
    : null;
  console.log("from corporate component", fromcorporatecomponent);
  const [pendingappointment, setpendingappointment] = useState(false);
  const [cancelledappointment, setcancelledappointment] = useState(false);
  const [upcomingappointment, setupcomingappointment] = useState(true);
  const [isdynamicbookedclass, setisdynamicbookedclass] = useState(false);
  const [isdynamicCancelledclass, setisdynamicCancelledclass] = useState(false);
  const [isdynamicupcomingclass, setisdynamicupcomingclass] = useState(true);
  const handleupcomingclass = (e) => {
    setisdynamicupcomingclass(true);
    setupcomingappointment(true);
    setisdynamicCancelledclass(false);
    setcancelledappointment(false);
    setisdynamicbookedclass(false);
    setpendingappointment(false);
  };
  const handlebookedclass = (e) => {
    setisdynamicupcomingclass(false);
    setupcomingappointment(false);
    setisdynamicCancelledclass(false);
    setcancelledappointment(false);
    setisdynamicbookedclass(true);
    setpendingappointment(true);
  };
  const handleCancelledclass = (e) => {
    setisdynamicupcomingclass(false);
    setupcomingappointment(false);
    setisdynamicCancelledclass(true);
    setcancelledappointment(true);
    setisdynamicbookedclass(false);
    setpendingappointment(false);
  };
  return (
    <>
      <div className="container-fluid page--wrapper ">
        <div className="main-panel newdash_content">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="row">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h6 className="font-weight-normal mb-0">
                      All systems are running smoothly!
                    </h6>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div className="justify-content-end d-flex">
                      <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                        <button
                          className="btn btn-sm btn-light bg-white dropdown-toggle"
                          type="button"
                          id="dropdownMenuDate2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <i className="mdi mdi-calendar"></i>Today-{" "}
                          {TimeandDate.today()}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row"></div>

            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body card_viewapp">
                    <div className="title-header">
                      <p
                        className={`card-title1 ${
                          isdynamicupcomingclass ? "title-focus" : null
                        }`}
                        onClick={handleupcomingclass}
                      >
                        Upcoming Appointment
                      </p>
                      {props.fromcorporatecomponent ? null : (
                        <p
                          className={`card-title1 ${
                            isdynamicbookedclass ? "title-focus" : null
                          }`}
                          onClick={handlebookedclass}
                        >
                          Completed Appointment
                        </p>
                      )}
                      <p
                        className={`card-title1 ${
                          isdynamicCancelledclass ? "title-focus" : null
                        }`}
                        onClick={handleCancelledclass}
                      >
                        Cancelled Appointment
                      </p>
                    </div>
                    {upcomingappointment ? (
                      <Upcomingappointment
                        props={props.history ? props.history : props.props}
                        fromdoctorcomponent={fromdoctorcomponent}
                        fromcorporatecomponent={fromcorporatecomponent}
                      ></Upcomingappointment>
                    ) : pendingappointment ? (
                      <Completedappointment
                        fromdoctorcomponent={fromdoctorcomponent}
                      ></Completedappointment>
                    ) : cancelledappointment ? (
                      <Cancelledappointment
                        fromdoctorcomponent={fromdoctorcomponent}
                        fromcorporatecomponent={fromcorporatecomponent}
                      ></Cancelledappointment>
                    ) : (
                      <h1>You don't have any appointments</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
