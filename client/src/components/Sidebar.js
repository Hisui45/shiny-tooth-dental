import React from "react";
import toothImg from "../assets/tooth_3501613.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <aside className="sidebar">
        <div className="logo">
          <h1>Shiny Tooth Dental</h1>
          <img src={toothImg} />
        </div>
        <div className="menu">
          <ul>
            <Link to="/api/dashboard">
              <li>
                <box-icon type="solid" name="dashboard"></box-icon>
                <p>Dashboard</p>
              </li>
            </Link>

            <Link to="/api/calendar">
              <li>
                <box-icon name="calendar" type="solid"></box-icon>
                <p>Calendar</p>
              </li>
            </Link>

            <Link to="/api/patients">
              <li>
                <box-icon name="user" type="solid"></box-icon>
                <p>Patients</p>
              </li>
            </Link>

            <Link to="/api/appointments">
              <li>
                <box-icon name="calendar-event" type="solid"></box-icon>
                <p>Appointments</p>
              </li>
            </Link>

            <Link to = "/api/billing">
              <li>
                <box-icon name="dollar-circle" type="solid"></box-icon>
                <p>Billing & Payment</p>
              </li>
            </Link>
            
            <Link to="/api/procedures">
            <li>
              <box-icon name="book-alt" type="solid"></box-icon>
              <p>Procedures</p>
            </li>
            </Link>
            
            {/* <li>
              <box-icon name="calendar-week" type="solid"></box-icon>
              <a href="/">Schedule</a>
            </li> */}
          </ul>
        </div>
        <div className="user">
          <h4>Logged In:</h4>
          <div className="row-item">
            <img src="https://placehold.co/50" />
            <p className="user-name">Samantha, Richard</p>
          </div>
          <div className="row-item">
            <h5>Employee ID:</h5>
            <p>****567</p>
          </div>
          <Link className="navigate-button log-out" to="/">
            <box-icon name="log-out"></box-icon>
            <p>Log Out</p>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
