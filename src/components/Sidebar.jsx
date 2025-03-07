import React, { useState } from "react";

function Sidebar({
  sections,
  selectedSection,
  setSelectedSection,
  isSidebarExpanded,
  handleLogout,
  logo,
  setIsSidebarExpanded,
}) {
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = async () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
      handleLogout();  
    }, 3000); 
  };

  return (
    <div className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
      <div className="header">
        <img src={logo} alt="" height={100} width={100} />
        <h2 className="app-title" style={{ fontFamily: "Tahoma, sans-serif" }}>
          InnovAyd
        </h2>
      </div>
      <button
        className="toggle-sidebar-btn"
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
      >
        {isSidebarExpanded ? "<<" : ">>"}
      </button>
      <ul className="sidebar-list">
        {sections.map((section) => (
          <li
            key={section.id}
            onClick={() => setSelectedSection(section.name)}
            className={`sidebar-item ${selectedSection === section.name ? "active" : ""}`}
          >
            <span className="sidebar-icon">{section.icon}</span>
            {isSidebarExpanded && <span>{section.name}</span>}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "50px" }}>
        <button className="toggle-sidebar-btn-log-out" onClick={handleLogoutClick}>
          {loading ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
