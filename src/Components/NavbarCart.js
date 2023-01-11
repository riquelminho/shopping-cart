import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Table } from "react-bootstrap";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { addToCart, removeOne, deleteProduct } from "../actions/action";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


/*****************/

const NavbarCart = () => {
  const dispatch = useDispatch();
// update of product's number in the cart
  const { cart } = useSelector((state) => state.updateCart);

  //price total
  const [total, setTotal] = useState(0);
  const getTotal = () => {
    let price = 0;
    cart.map((product) => (price = product.price * product.rating.count + price)
    );
    setTotal(price);
  };
  useEffect(() => {
    getTotal();
  });

  // cart icon ============//
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //======================//
  return (
    <main>
      {/* checkout window */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="MenuItem">
          {cart.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
            <div style={{ width: "40rem" }}>
              <div>
                <Table className="table-cart">
                  <thead>
                    <tr>
                    </tr>
                  </thead>
                  {cart.map((product, key) => {
      
                    return ( 
                      <tbody key={key}>
                        <tr>
                          <td>
                            <img
                              style={{ width: "5rem", height: "5rem" }}
                              src={product.image}
                              alt=""
                            />
                          </td>
                          <td>
                            <div>
                            <p>{product.title.slice(0, 50)}</p>
                            </div>
                            <div className="cart-content d-flex justify-content-between w-50">
                            <p>${product.price}</p>
                              <p
                                onClick={
                                  product.rating.count === 1
                                    ? () => dispatch(deleteProduct(product))
                                    : () => dispatch(removeOne(product))
                                }
                              >
                              <IndeterminateCheckBoxIcon />
                              </p>
                              <p>x{product.rating.count}</p>
                              <p onClick={() => dispatch(addToCart(product))}><AddBoxIcon/></p>
                            </div>
                          </td>
                          <td>
                            <DeleteIcon  className="text-center text-danger mt-4"
                              onClick={() => dispatch(deleteProduct(product))}
                              style={{
                                fontSize: "3rem",
                                cursor: "pointer",
                                color: "red",
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}

                  <tfoot>
                    <tr>
                    
                      <td>
                      <div className="text-center text-danger mt-2">
                        Total : ${total.toFixed(2)}
                        </div>
                      </td>
                      <td>
                    <div className="btn-total">
                      <button > Checkout</button>
                      </div>
                      </td>
                  
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </div>
          )}
        </MenuItem>
      </Menu>

      {/* navbar */}
      
      <section>
        <Navbar expand="lg">
          <Container fluid className=" nav-container ms-5 me-5 justify-content-between">
            <Link to="/home">My Shop</Link>
              <Nav
                className=" nav-links ms-5 me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px"}} 
                navbarScroll>

              </Nav>
              <div className=" bag-icon me-5">
                <Link>
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartIcon onClick={handleClick} />
                  </Badge>
                </Link>
              </div>

              <Form className="search-form d-flex  ">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
        
          </Container>
        </Navbar>
      </section>
    </main>
  );
};

export default NavbarCart;
