import React, { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import addToCart from "../actions/action";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";


const ProductPages = () => {
  const dispatch = useDispatch();


    // fetching data from API
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
       .then((res) => res.json());
        setData(response);
        console.log(response)
  };
    const sendToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container >
      
      <div className="mt-4 mb-4 row d-flex gap-5 justify-content-center ">
        {data && data.map((product) => (
            <Card className="   justify-content-center pt-1"
              key={product.id}
              style={{ width: "15rem", height: "fit-content" }}
            >
              <div className=" justify-content-center ms-4">
              <Card.Img 
                style={{ width: "10rem", height: "12rem" }}
                variant="top"
                src={product.image}
              />
              </div>
              <div >     
              <ListGroup className="listgroup"  variant="flush">
                <ListGroup.Item className="list-content title" > 
                <Link  style={{textDecoration: 'none'}} to="/"> {product.title.slice(0, 30)}</Link>
                </ListGroup.Item>
                <ListGroup.Item  className="list-content price" > ${product.price} <span>
                   <Button  onClick={() => sendToCart(product)}><ShoppingBasketIcon/></Button></span>
                    </ListGroup.Item>
  
              </ListGroup>
              </div>
            </Card>
          ))}
      </div>
      <footer>

      </footer>
    </Container>
  );
};

export default ProductPages;


