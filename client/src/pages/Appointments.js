import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar.js";

const SearchBar = () => {
  return (
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
  );
};

const AppointmentCard = ({ appointment }) => {
  // Format date
  const formattedDate = new Date(appointment.APT_DATE).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

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

  const formattedPatientID = appointment.PAT_ID.toString().padStart(8, "0");

  return (
    <div className="appointment-card">
      {/* Display patient ID and name */}
      <div className="patient-info">
        <span className="patient-id">ID: {formattedPatientID}</span>
        <h3>
          {appointment.PAT_FNAME} {appointment.PAT_LNAME}
        </h3>
      </div>
      {/* Display appointment details */}
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Time:</strong> {formattedTime}
      </p>
      <p>
        <strong>Provider:</strong> {appointment.EMP_FNAME}{" "}
        {appointment.EMP_LNAME}
      </p>
      <p>
        <strong>Procedure:</strong> {appointment.PRO_NAME}
      </p>
      {/* Display appointment status */}
      <p>
        <strong>Status:</strong> {appointment.STA_DESC}
      </p>
      {/* Control buttons */}
      {appointment.STA_CODE === "S" && (
        <div className="button-group">
          <button className="primary-button">Cancel</button>
          <button className="secondary-button">Check-In</button>
          <button className="edit-button">Edit</button>
        </div>
      )}
      {(appointment.STA_CODE === "F" || appointment.STA_CODE === "C") && (
        <div className="button-group">
          <button className="edit-button">Edit</button>
        </div>
      )}
      {appointment.STA_CODE === "I" && (
        <div className="button-group">
          <button className="secondary-button">Check-Out</button>
          <button className="edit-button">Edit</button>
        </div>
      )}
    </div>
  );
};

const AppointmentHeader = ({ filterDate, setFilterDate, activeStatusCodes, toggleStatusCode, handleClearButtonClick }) => {
    const handleDateChange = (event) => {
      setFilterDate(event.target.value);
    };
  
    const handleStatusToggle = (statusCode) => {
      toggleStatusCode(statusCode);
    };

  return (
    <div className="appointment-header">
      <div className="filter-by-date">
        {/* Date picker control */}
        <label htmlFor="datePicker">Date:</label>
        <input
          type="date"
          id="datePicker"
          value={filterDate}
        //   defaultValue={filterDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="filter-by-status">
        {/* Toggle buttons for status codes */}
        <label>Status:</label>
        <button className={`status-toggle ${activeStatusCodes.includes('S') ? 'active' : ''}`} onClick={() => handleStatusToggle('S')}>Scheduled</button>
        <button className={`status-toggle ${activeStatusCodes.includes('I') ? 'active' : ''}`} onClick={() => handleStatusToggle('I')}>In-Progress</button>
        <button className={`status-toggle ${activeStatusCodes.includes('C') ? 'active' : ''}`} onClick={() => handleStatusToggle('C')}>Cancelled</button>
        <button className={`status-toggle ${activeStatusCodes.includes('F') ? 'active' : ''}`} onClick={() => handleStatusToggle('F')}>Finished</button>
      </div>

      <button className="status-toggle status-all" onClick={() => handleClearButtonClick()}>Clear</button>
    </div>
  );
};

const displayCheckIn = () => {};

const Appointments = () => {
  const [appointmentsData, setAppointmentData] = useState([{}]);
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeStatusCodes, setActiveStatusCodes] = useState([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentData(data);
        console.log(data.appointments);
      });
  }, []);


  const filteredAppointments = appointmentsData.appointments
    ? appointmentsData.appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.APT_DATE)
          .toISOString()
          .split("T")[0];
        const isDateMatch = !filterDate || appointmentDate === filterDate;
        const isStatusMatch =
          activeStatusCodes.length === 0 ||
          activeStatusCodes.includes(appointment.STA_CODE);
        return isDateMatch && isStatusMatch;
      })
    : null;

  // Toggle active status code
  const toggleStatusCode = (statusCode) => {
    setActiveStatusCodes((prevStatusCodes) => {
      if (prevStatusCodes.includes(statusCode)) {
        return prevStatusCodes.filter((code) => code !== statusCode);
      } else {
        return [...prevStatusCodes, statusCode];
      }
    });
  };

  const handleClearButtonClick = () => {
    setActiveStatusCodes([]);
    setFilterDate('');
  };

  return (
    <div className="container">
      <Sidebar />
      <main>
        <Topbar section="Appointments"
          displayCheckIn={displayCheckIn}/>
        <div className="appointment-content">
          <SearchBar />
          <AppointmentHeader
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            activeStatusCodes={activeStatusCodes}
            toggleStatusCode={toggleStatusCode}
            handleClearButtonClick={handleClearButtonClick}
          />
          <div className="appointment-container">
            {!filteredAppointments ? (
              <div className="message">Loading...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="message">
                There are no appointments that match those requirements.
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.APT_NUM}
                  appointment={appointment}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
