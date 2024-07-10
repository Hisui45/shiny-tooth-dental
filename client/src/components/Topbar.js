import React from "react";

function Topbar({section, displayCheckIn}) {
  return (
    <div>
      <header>
        <h3>{section}</h3>
        <div className="nav">
          <ul>
            <li onClick={displayCheckIn}>Patient Check-In/Out</li>
            <li>Resources</li>
            <li>Insurance Information</li>
          </ul>
          <box-icon type="solid" size="md" name="inbox"></box-icon>
        </div>
      </header>
    </div>
  );
}

export default Topbar;
