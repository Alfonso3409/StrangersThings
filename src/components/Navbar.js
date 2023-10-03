import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logIn } from "./Login";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
} from "react-bootstrap";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-B";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function CustomNavbar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const tokenFromStorage = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [loggedOut]);

  const handleLogin = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    if (tokenFromStorage) {
      headers["Authorization"] = `Bearer ${tokenFromStorage}`;
    }

    fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          logIn(data.data.token);
          localStorage.setItem("token", data.data.token);
          setMessage(data.data.message);
          setUsername("");
          setPassword("");
          window.location.reload();
        } else {
          console.error("Login failed:", data.error.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    if (tokenFromStorage) {
      headers["Authorization"] = `Bearer ${tokenFromStorage}`;
    }

    fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          logIn(data.data.token);
          localStorage.setItem("token", data.data.token);
          setMessage(data.data.message);
          setUsername("");
          setPassword("");
          window.location.reload();
        } else {
          console.error("Registration failed:", data.error.message);
          setMessage(data.error.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage(error.message);
      });
  };

  function handleLogout() {
    console.log("Logging out...");
    console.log("Token before logout:", localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log("Token after logout:", localStorage.getItem("token"));
    setUsername("");
    setPassword("");
    setMessage("Logged out successfully!");
    setLoggedOut(!loggedOut);
    window.location.reload();
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/action">
          Strangers Things
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/action">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/action">
              Link
            </Nav.Link>
          </Nav>
          {message && <div className="alert alert-success">{message}</div>}

          {isLoggedIn ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Form inline="true" className="mr-sm-2">
              <FormControl
                type="text"
                placeholder="Username"
                className="mr-sm-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormControl
                type="password"
                placeholder="Password"
                className="mr-sm-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleLogin}>
                Login
              </Button>
              <Button
                variant="outline-primary"
                className="ml-2"
                onClick={handleRegister}
              >
                Register
              </Button>
            </Form>
          )}

          <Form inline="true" className="ml-sm-2">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
