import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { isAuth, signOut } from "../services/authHelpers";
import { Navigate } from "react-router-dom";

export const NavComp: React.FC = () => {
  const { pathname } = useLocation();
  const onSignOut = () => {
    signOut();
    window.location.reload();
  };
  const activeLink = (path: string) => {
    if (pathname === path) {
      return { color: "#0d6efd" };
    } else {
      return { color: "#000000" };
    }
  };
  //pathname !== "/" && pathname !== "/profile"
  if (!isAuth()) {
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

        <Nav.Link onClick={onSignOut}>
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </Nav.Link>
      </Nav>
    );
  }
};
