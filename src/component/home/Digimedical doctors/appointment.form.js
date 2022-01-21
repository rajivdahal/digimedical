const AppointmentForm=(props)=>{
    return (
        <div className="form_digi_doc">
                  <div className="form_digidoc">
                    <div className="digidoc_appoin_form1">
                      <p>First Name</p>
                      <input
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        id="firstName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Middle Name</p>
                      <input
                        type="text"
                        placeholder="Enter Middle Name"
                        name="middleName"
                        id="middleName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Last Name</p>
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        id="lastName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Email Address</p>
                      <input
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                        id="email"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Phone No.</p>
                      <input
                        type="text"
                        placeholder="Enter Phone no."
                        name="mobileNumber"
                        id="mobileNumber"
                      />
                    </div>

                    <div class="digidoc_appoin_form1">
                      <p>Appointment Date</p>

                      <input
                        type="date"
                        name="appointmentDate"
                        id="appointmentDate"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Appointment Time</p>
                      <input
                        type="time"
                        name="appointmentTime"
                        id="appointmentTime"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Select Service Type</p>
                      <select name="cars" id="cars">
                        <optgroup label="Swedish Cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                        </optgroup>
                        <optgroup label="German Cars">
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </optgroup>
                      </select>
                    </div>
                    <div class="digidoc_appoin_form1">
                      <button type="submit" className="submit-buttons">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
    )
}

export default AppointmentForm;