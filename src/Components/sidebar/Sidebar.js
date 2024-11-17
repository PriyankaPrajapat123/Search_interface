import React, { useState } from "react";
import logo from "../../images/home_logo.png";
import "./sidebar.css"; // Importing the CSS file

function Sidebar({ searchHistory }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for sidebar visibility
  console.log(searchHistory?.length || 0); 
  const storeLenght = searchHistory?.length || 0

  
  const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
      };
  return (
    <div className="content">
      
<button className="toggle-button" onClick={toggleSidebar}>
  {isSidebarVisible ? (
    <i className="fa-solid fa-xmark xmark-icon"></i>
  ) : (
    <i className="fa-solid fa-bars bars-icon"></i>
  )}
</button>


        <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
      <div className="logo">
          {/* <img src={logo} alt="Perplexity Logo" className="logo" width={40} /> */}
          <h1>Your app Name</h1>
          
        </div>
        <a href="#" className="threadLink" >
          New Thread
          <p>
            <span>Ctrl</span>&nbsp;<span>I</span>
          </p>
        </a>
        
        <ul>
          <li>
            <i className="fas fa-home"></i> Home
          </li>
          <li> <h5>History</h5>
          {storeLenght > 0 ? (
          <ul className="scrollBar">
            {searchHistory.map((query, index) => (
              <li key={index}>{query}</li>
            ))}
          </ul>
        ) : (
          <p>No searches yet</p>
        )}
          </li>
         
        </ul>

             </div>
    </div>
  );
}

export default Sidebar;
