import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const NavComp: React.FC = () => {
  const { pathname } = useLocation();
  const activeLink = (path: string) => {
    if (pathname === path) {
      return { color: "#0d6efd" };
    } else {
      return { color: "#000000" };
    }
  };
  if (pathname !== "/" && pathname !== "/profile") {
    return null;
  } else {
    return (
      <Nav id="nav">
        <Nav.Link style={activeLink("/")} href="/">
          <i className="fas fa-home"></i> Home Page
        </Nav.Link>

        <Nav.Link style={activeLink("/profile")} href="profile">
          <i className="fas fa-user"></i> Profile
        </Nav.Link>
      </Nav>
    );
  }
};
