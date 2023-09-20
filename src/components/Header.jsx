import React from "react";
import styled from "styled-components";
import useAuth from "../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Redirect to the login page
    navigate("/login");
  };
  return (
    <HeaderContainer>
      <div className="container flex">
        <h2>Gallery</h2>
        <nav>
          <ul>
            <li>Home</li>

            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </span>
          </ul>
        </nav>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  padding: 10px 15px;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    li:not(:last-child) {
      margin-right: 15px;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

export default Header;
