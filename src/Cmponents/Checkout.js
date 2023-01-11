import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Table } from "react-bootstrap";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

import { add,removeOne, deleteProduct } from "../actions/action";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
//import handleClick from "./NavbarCart";


/*****************/

const Checkout = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const { cart } = useSelector((state) => state.updateCart);

  const getTotal = () => {
    let price = 0;
    cart.map((product) => (price = product.price * product.rating.count + price)
    );
    setTotal(price);
  };
  useEffect(() => {
    getTotal();
  });

  // cart icon
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <main>

<div className=" bag-icon2 bag-icon me-5">
                <Link>
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartIcon onClick={handleClick} />
                  </Badge>
                </Link>
              </div>  
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
                            
                            {/*<p>rating : {product.rating.rate}</p>*/}
                            {/*<p>No of products</p>*/}
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
                              <p onClick={() => dispatch(add(product))}><AddBoxIcon/></p>
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
      
    </main>
  );
};

export default Checkout;
