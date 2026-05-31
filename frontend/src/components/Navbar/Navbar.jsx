import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-box">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-240h72v-150l57 57 51-51-144-144-144 144 51 51 57-57v150ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z"/></svg>
        </div>

        <h2 className="logo-text">SWS AI Document Hub</h2>

        <span className="demo-badge">LIVE DEMO</span>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v53q85 16 138.5 82T720-528v240h48v72H192Zm288-276Zm-.21 396Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM312-288h336v-240q0-70-49-119t-119-49q-70 0-119 49t-49 119v240Z"/></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;