import React from "react";
import { Link } from "react-router-dom";

export const NavMenu = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Landing Page</Link>
      </li>
      <li>
        <Link to="/main">Dashboard</Link>
      </li>
    </ul>
  </nav>
);
