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
  DropdownMenuforlogin,
} from "../MaterialUI";
import { useState } from "react";

function Headers() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  console.log(category);

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getAllCategory());
  });
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
              tabindex="0"
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
            <div className="rightMenu">
              <DropdownMenuforlogin
                menu={
                  <a
                    className="loginButton"
                    onClick={() => setLoginModal(true)}
                  >
                    Login
                  </a>
                }
                menus={[
                  { label: "My Profile", href: "", icon: null },
                  { label: "Flipkart Plus Zone", href: "", icon: null },
                  { label: "Orders", href: "", icon: null },
                  { label: "Wishlist", href: "", icon: null },
                  { label: "Rewards", href: "", icon: null },
                  { label: "Gift Cards", href: "", icon: null },
                ]}
                firstMenu={
                  <div className="firstmenu">
                    <span>New Customer?</span>
                    <a style={{ color: "#2874f0" }}>Sign Up</a>
                  </div>
                }
              />
              {/* <DropdownMenuforlogin
                menu={
                  <a className="more">
                    <span>More</span>
                    <IoIosArrowDown />
                  </a>
                }
                menus={[
                  { label: "Notification Preference", href: "", icon: null },
                  { label: "Sell on flipkart", href: "", icon: null },
                  { label: "24x7 Customer Care", href: "", icon: null },
                  { label: "Advertise", href: "", icon: null },
                  { label: "Download App", href: "", icon: null },
                ]}
              /> */}
              <div>
                <a className="cart">
                  <IoIosCart />
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
