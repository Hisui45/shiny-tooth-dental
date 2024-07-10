import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar.js";




const Patients = () => {
  const [backendData, setBackendData] = useState([{}]);
  const [patient, setPatient] = useState(null);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    fetch("/api/patients")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  useEffect(() => {
    if (patient !== null) {
      fetch(`/api/patients/${patient.PAT_ID}`)
        .then((response) => response.json())
        .then((data) => {
          setPatientData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
  }, [patient]);

  const peekPatient = (id) => {
    if (id === null) {
      setPatient(null);
    } else {
      const patient1 = backendData.patients.filter(
        (patient) => patient.PAT_ID === id
      );
      setPatient(patient1[0]);
    }
  };

  const patientName = patient
    ? `${patient.PAT_FNAME} ${patient.PAT_LNAME}`
    : "Unknown";

  const patientDOB = patient
    ? new Date(patient.PAT_DOB)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
    : "Unknown";

  function formatDate(date) {
    return new Date(date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  }

  const mobile = patient ? `${patient.PAT_MOBILE}` : "Unknown";

  const formatPatientID =
    patient && patient && patient.PAT_ID
      ? `Patient ID: ${patient.PAT_ID.toString().padStart(8, "0")}`
      : "Unknown";

  const email = patient ? `${patient.PAT_EMAIL}` : "Unknown";

  const visitDate =
    patientData && patientData.records.length > 0
      ? new Date(patientData.records[0].REC_DATE)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })
          .replace(/\//g, "-")
      : null;

  function getDaysDifference() {
    // Convert both dates to milliseconds
    const startMilliseconds = new Date(patientData.records[0].REC_DATE);
    const endMilliseconds = new Date().getTime();

    // Calculate the difference in milliseconds
    const differenceMilliseconds = endMilliseconds - startMilliseconds;

    // Convert milliseconds to days
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceDays = Math.floor(
      differenceMilliseconds / millisecondsInDay
    );

    return differenceDays !== 0 ? `(${differenceDays} Days Ago)` : "(Today)";
  }

  function getProviders() {
    const providersSet = new Set(); // Using a Set to avoid duplicates
    patientData.records.forEach(function(record) {
        const name = record.POS_CODE === "D" ? `Dr. ${record.EMP_FNAME} ${record.EMP_LNAME}` : `${record.EMP_FNAME} ${record.EMP_LNAME}`;
        providersSet.add(name); // Adding name to the set
    });

    // Convert the set back to an array
    const providersArray = Array.from(providersSet);

    // Join the array elements with commas
    const providersCSV = providersArray.join(', ');

    return providersCSV;
}

function getProcedures() {
  const providersSet = new Set(); // Using a Set to avoid duplicates
  patientData.records.forEach(function(procedure) {
      
      providersSet.add(procedure.PRO_NAME); // Adding name to the set
  });

  // Convert the set back to an array
  const providersArray = Array.from(providersSet);

  // Join the array elements with commas
  const providersCSV = providersArray.join(', ');

  return providersCSV;
}
  

  const displayCheckIn = () => {};

  const closePatient = () => {};

  const openAppointments = () => {};

  const openPatient = () => {};

  return (
    <div className="container">
      <Sidebar />
      <main>
        <Topbar section="Patients"
        displayCheckIn={displayCheckIn}/>
        <div className="patient-content content">
          <div className="header">
            <i
              onClick={() => closePatient()}
              className="bx bx-arrow-back bx-sm"
            ></i>
          </div>
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-header">
                <h3>Personal Information</h3>
                <button>Edit</button>
              </div>
              <div className="profile-box">
                <div className="header">
                  <h1>Edna Granny Smith</h1>
                  <p>
                    <span>Patient ID: </span>4573434
                  </p>
                </div>
                <div className="grid-col-2">
                  <ul>
                    <li>
                      <span>Date Of Birth:</span>
                      <p>04-22-1965</p>
                    </li>
                    <li>
                      <span>Address:</span>
                      <p>12235 Lane Way, Highland, MI 34635</p>
                    </li>
                    <li>
                      <span>Phone Number:</span>
                      <p>1+(346)-545-2234</p>
                    </li>
                    <li>
                      <span>Email:</span>
                      <p>edna.smith@beanworks.com</p>
                    </li>
                    <li>
                      <span>Language Preference:</span>
                      <p>English</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>Insurance Provider:</span>
                      <p>XYZ Insurance</p>
                    </li>
                    <li>
                      <span>Policy Number:</span>
                      <p>123456789</p>
                    </li>
                    <li>
                      <span>Emergency Contact:</span>
                      <p>John Doe (123) 456-7890</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="profile-history">
              <div className="profile-header">
                <h3>Medical History</h3>
                <button>Edit</button>
              </div>
              <div className="profile-box">
                <div className="grid-col-2">
                  <div>
                    <h4>Allergies</h4>
                    <div id="allergies" className="chip-box"></div>
                  </div>
                  <div>
                    <h4>Medications</h4>
                    <div id="medications" className="chip-box"></div>
                  </div>
                </div>
                <div id="treatments"></div>
              </div>
            </div>
            <div className="profile-appointments">
              <div className="profile-header">
                <h3>Appointments</h3>
                <button>Manage</button>
              </div>
              <div className="profile-box grid-col-2">
                <div>
                  <h4>Last Visit</h4>
                  <div className="profile-card">
                    <div className="header">
                      <h3>June 23, 2023</h3>
                      <p>228 Days Ago</p>
                    </div>
                    <ul>
                      <li>
                        <span>Provider(s):</span>
                        <p>Dr. Leroy, J</p>
                      </li>
                      <li>
                        <p>
                          <span>Reason for Appointment: </span>Tooth Ache,
                          Routine Hygiene
                        </p>
                      </li>
                      <li>
                        <span>Procedures:</span>
                        <p> Teeth Cleaning, Tooth Filling</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4>Upcoming Appointment</h4>
                  <div className="profile-card">
                    <div className="header">
                      <h3>February 15, 2024</h3>
                      <p>5 Days Away</p>
                    </div>
                    <ul>
                      <li>
                        <span>Time:</span>
                        <p>3:30PM</p>
                      </li>
                      <li>
                        <span>Reason for Appointment: </span>
                        <p>Routine Cleaning</p>
                      </li>
                    </ul>
                    <div className="actions">
                      <i className="bx bxs-edit tooltip">
                        <span className="tooltiptext bottom">
                          Edit Appointment
                        </span>
                      </i>
                      <i className="bx bx-calendar-event tooltip">
                        <span className="tooltiptext bottom">
                          View on Calendar
                        </span>
                      </i>
                      <i className="bx bx-calendar-x tooltip">
                        <span className="tooltiptext bottom">
                          Cancel Appointment
                        </span>
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="patients-content content">
          <div className="search-header">
            <div className="search">
              <input
                type="text"
                placeholder="Search for patients by name, id, or date of birth"
              />
              <box-icon name="search" type="regular"></box-icon>
            </div>
            <div className="actions">
              <box-icon name="filter" size="md"></box-icon>
              <box-icon name="sort-a-z" size="md"></box-icon>
            </div>
          </div>
          <h5>Quick View</h5>
          <section className="patients-section">
            <div className="patients">
              {!backendData.patients ? (
                <p>Loading</p>
              ) : (
                <>
                  {backendData.patients.map((patient, i) => {
                    const patientName = patient
                      ? `${patient.PAT_LNAME}, ${patient.PAT_FNAME} `
                      : "Unknown";

                    return (
                      <div
                        key={i}
                        onClick={() => peekPatient(patient.PAT_ID)}
                        className="patient-card"
                      >
                        <div className="header">
                          <box-icon type="solid" name="user"></box-icon>
                          <h4>{patientName}</h4>
                        </div>
                        <div className="actions">
                          <div
                            onClick={() => openAppointments()}
                            className="tooltip"
                          >
                            <box-icon
                              type="solid"
                              name="calendar-event"
                              className="tooltip"
                              size="md"
                            ></box-icon>
                            <span className="tooltiptext bottom">
                              Make Appointment
                            </span>
                          </div>
                          <div
                            onClick={() => openPatient()}
                            className="tooltip"
                          >
                            <box-icon
                              type="solid"
                              name="user-detail"
                              className="tooltip"
                              size="md"
                            ></box-icon>
                            <span className="tooltiptext bottom">
                              View Patient
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {patient !== null && (
              <div className="peek-patient">
                <div className="header">
                  <box-icon
                    onClick={() => peekPatient(null)}
                    type="regular"
                    name="x"
                    size="md"
                  ></box-icon>
                  <box-icon
                    // onClick={openPatient}
                    name="expand"
                    size="md"
                  ></box-icon>
                </div>
                <div className="details">
                  <div className="identification">
                    <h2>{patientName}</h2>
                    <p>{formatPatientID}</p>
                  </div>
                  <div className="info">
                    <ul>
                      <li>
                        <span>Date Of Birth:</span>
                        <p>{patientDOB}</p>
                      </li>
                      <li>
                        <span>Phone Number:</span>
                        <p>{mobile}</p>
                      </li>
                      <li>
                        <span>Email:</span>
                        <p>{email}</p>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div className="appointments-box">
                    <h4>Last Visit:</h4>
                    {visitDate != null ? (
                      <ul>
                        <li>
                          <span>Date: </span>
                          <p>{visitDate}</p>
                          <span className="days">{getDaysDifference(visitDate)}</span>
                        </li>
                        <li>
                          <p><span>Provider(s): </span>{getProviders()}</p>
                        </li>
                        <li>
                          <p><span>Procedures: </span>{getProcedures()}</p>
                        </li>
                      </ul>
                    ) : (
                      <p>No Visit Data</p>
                    )}

                    <button className="navigate-button" type="button">
                      View Appointments
                    </button>
                  </div>
                  <div className="footer">
                    <button className="secondary-button" type="button">
                      Check-In
                    </button>
                    <button className="primary-button" type="button">
                      Make Appointment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Patients;
