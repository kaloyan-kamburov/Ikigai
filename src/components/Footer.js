/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return location.pathname !== "/chart" ? (
    <>
      {/* {location.pathname === "/" ?  "": <div className="backHome">Back to home</div>} */}
      <footer
        className={`footer${location.pathname !== "/" ? " foot-yellow" : ""}`}
      >
        <div className="shell">
          <div className="foot-wrap">
            <p className="foot-text">Made with love by people that care.</p>
            <ul className="foot-nav">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  ) : null;
}

export default Footer;
