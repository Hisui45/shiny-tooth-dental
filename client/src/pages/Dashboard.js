import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar.js";

const AppointmentCard = ({ appointment }) => {
  // Format time
  const timeParts = appointment.APT_TIME.split(":");
  let formattedTime;
  if (timeParts.length === 3) {
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${meridiem}`;
  } else {
    formattedTime = "Invalid Time";
  }

  const employeeName = `${appointment.EMP_FNAME} ${appointment.EMP_LNAME}`;

  return (
    <div className="appointment-card">
      <div className="header">
        <h3>
          {appointment.PAT_FNAME} {appointment.PAT_LNAME}
        </h3>
        <div className="actions">
          <div className="tooltip">
            <box-icon size="md" type="solid" name="calendar"></box-icon>
            <span className="tooltiptext bottom">View on Calendar</span>
          </div>
          <div className="tooltip">
            <box-icon size="md" type="solid" name="edit"></box-icon>
            <span className="tooltiptext bottom">Edit Appointment</span>
          </div>
          <div className="tooltip">
            <box-icon size="md" type="solid" name="user-detail"></box-icon>
            <span className="tooltiptext left">View Patient</span>
          </div>
        </div>
      </div>
      <div className="info">
        <p>
          <strong>Time:</strong> {formattedTime}
        </p>

        <p>
          <strong>Provider: </strong>
          {appointment.POS_CODE === "D" ? `Dr. ${employeeName}` : employeeName}
        </p>
        <p>
          <strong>Reason for Appointment:</strong> {appointment.PRO_NAME}
        </p>
      </div>
      <button className="secondary-button" type="button">
        Check-In
      </button>
    </div>
  );
};

const displayCheckIn = () => {};

function Dashboard() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div class="container">
      <Sidebar />
      <main>
        <Topbar section="Dashboard" displayCheckIn={displayCheckIn} />
        <div class="dashboard-content content">
          <div class="row1">
            <div class="greeting">
              <h2>Good Morning, Samantha</h2>
              <div class="search-header">
                <div class="search">
                  <input
                    type="text"
                    placeholder="Search for patient, doctor, procedures, or insurance info"
                  />
                  <box-icon name="search" type="regular"></box-icon>
                </div>
                <div class="actions">
                  <box-icon name="filter" size="md"></box-icon>
                  <box-icon name="sort-a-z" size="md"></box-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="row2">
            <h3>On-Duty</h3>
            <h3>Upcoming Appointments</h3>
          </div>
          <div class="row3">
            <section class="duty-section">
              <section class="dentist">
                <h4>Dentists</h4>
                <div class="doctor-wrapper">
                  <div class="doctors">
                    {!backendData.employees ? (
                      <p>Loading</p>
                    ) : (
                      <>
                        {backendData.employees
                          .filter((item) => item.POS_CODE === "D")
                          .map((item, i) => (
                            <div key={i} className="doctor-card">
                              <div className="header">
                                <box-icon name="face" type="solid"></box-icon>
                                <h5>
                                  Dr. {item.EMP_FNAME} {item.EMP_LNAME}
                                </h5>
                              </div>
                              <div className="details-1">
                                <p>10:00AM-5:00PM</p>
                              </div>
                              <div className="doctor-footer">
                                <box-icon
                                  name="envelope"
                                  type="solid"
                                  size="md"
                                ></box-icon>
                                <box-icon
                                  name="phone"
                                  type="solid"
                                  size="md"
                                ></box-icon>
                                <box-icon
                                  name="user-detail"
                                  type="solid"
                                  size="md"
                                ></box-icon>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              </section>
              <section class="hygienist">
                <h4>Hygienists</h4>
                <div class="doctor-wrapper">
                  <div class="doctors">
                    {!backendData.employees ? (
                      <p>Loading</p>
                    ) : (
                      <>
                        {backendData.employees
                          .filter((item) => item.POS_CODE === "H")
                          .map((item, i) => (
                            <div key={i} className="doctor-card">
                              <div className="header">
                                <box-icon name="face" type="solid"></box-icon>
                                <h5>
                                  {item.EMP_FNAME} {item.EMP_LNAME}
                                </h5>
                              </div>
                              <div className="details-1">
                                <p>10:00AM-5:00PM</p>
                              </div>
                              <div className="doctor-footer">
                                <box-icon
                                  name="envelope"
                                  type="solid"
                                  size="md"
                                ></box-icon>
                                <box-icon
                                  name="phone"
                                  type="solid"
                                  size="md"
                                ></box-icon>
                                <box-icon
                                  name="user-detail"
                                  type="solid"
                                  size="md"
                                ></box-icon>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              </section>
              <h3>Checked-In Patients</h3>
              <section class="patients-section">
                <div class="patients-wrapper">
                  <div class="patients">
                    {!backendData.patients ? (
                      <p>Loading</p>
                    ) : (
                      <>
                        {backendData.patients
                          .filter((item) => item.STA_CODE === "A")
                          .map((item, i) => {
                            // Find the patient corresponding to the appointment
                            const patient = backendData.patients.find(
                              (patient) => patient.PAT_ID === item.PAT_ID
                            );
                            // Extract patient name if found
                            const patientName = patient
                              ? `${patient.PAT_FNAME} ${patient.PAT_LNAME}`
                              : "Unknown";
                            return (
                              <div key={i} class="patient-card">
                                <div class="actions">
                                  <div className="tooltip">
                                    <box-icon
                                      type="solid"
                                      name="calendar-event"
                                      class="tooltip"
                                      size="md"
                                    ></box-icon>
                                    <span class="tooltiptext top">
                                      Make Appointment
                                    </span>
                                  </div>
                                  <div className="tooltip">
                                    <box-icon
                                      type="solid"
                                      name="user-detail"
                                      class="tooltip"
                                      size="md"
                                    ></box-icon>
                                    <span class="tooltiptext top">
                                      View Patient
                                    </span>
                                  </div>
                                </div>
                                <box-icon
                                  type="solid"
                                  size="md"
                                  name="user"
                                ></box-icon>
                                <h5>
                                  {item.PAT_FNAME} {item.PAT_LNAME}
                                </h5>
                                <button class="secondary-button" type="button">
                                  Check-Out
                                </button>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </section>
            </section>
            <section class="appt-section">
              <div class="appt-wrapper">
                <div class="appts">
                  {!backendData.appointments ? (
                    <p>Loading</p>
                  ) : (
                    <>
                      {backendData.appointments
                        .filter((item) => item.STA_CODE === "S")
                        .map((item, i) => (
                          <AppointmentCard appointment={item} />
                        ))}
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
