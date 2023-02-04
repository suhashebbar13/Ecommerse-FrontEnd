import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo (2).png";
import name from "../../images/Name_Final1.png";
import "./headers.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions/category.action";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useState } from "react";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";
import "./style.css"

function Headers() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  console.log(category);

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllCategory());
  });

  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="row mx-md-n5"
    >
      <Container className="m-2">
        {/* {category.categories.length > 0 ? renderCategories(category.categories) : null} */}
        <Navbar.Brand href="#home" className="col px-md-5">
          <img
            src={logo}
            alt="Rouge Gears"
            width="90"
            height="70"
            className="d-inline-block align-top"
          ></img>
          <img
            src={name}
            alt="Rouge Gears"
            width="190"
            height="70"
            className="d-inline-block align-top"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto col px-md-5">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <NavDropdown
              title="Bikes"
              id="collasible-nav-dropdown"
              data-bs-offset="3"
              className="scrollspy-example"
              bg="dark"
            >
              <Nav className="drop-after">
                {category.categories.map((cat) => (
                  <NavDropdown.Item
                    className="drop-after-inside"
                    key={cat.name}
                  >
                    <NavDropdown
                      title={
                        <img
                          src={`http://localhost:5000${cat.categoryImage}`}
                          alt={cat.name}
                        ></img>
                      }
                      id="collasible-nav-dropdown"
                      data-bs-offset="0"
                      tabindex="7"
                      className="sub-dropdown"
                    >
                      {cat.children.map((child) => (
                        <NavDropdown.Item key={child.name}>
                          <Link to={`/${child.slug}?cid=${child._id}`}>
                            <ul>
                              <li>
                                <img
                                  src={`http://localhost:5000${child.categoryImage}`}
                                  alt={child.name}
                                ></img>
                              </li>
                              <li>{child.name}</li>
                            </ul>
                          </Link>
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </NavDropdown.Item>
                ))}
              </Nav>
            </NavDropdown>
          </Nav>
          {/* <Nav className="w-25"> */}
          <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
                {/* <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <div>
            <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
